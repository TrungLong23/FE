import React, { FC, useEffect } from 'react';
import { View, Image, StyleSheet, Alert, PermissionsAndroid, ActivityIndicator } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Logo from '@assets/images/splash_logo.jpeg';
import { Colors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';
import { useAuthStore } from '@state/authStore'; 
import { tokenStorage } from '@state/storage';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { jwtDecode } from 'jwt-decode';
import { refetchUser, refresh_tokens } from '@service/authService';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Cấp quyền truy cập vị trí",
        message: "Ứng dụng cần quyền truy cập vị trí của bạn để cung cấp trải nghiệm mua sắm tốt hơn.",
        buttonNeutral: "Hỏi tôi sau",
        buttonNegative: "Hủy",
        buttonPositive: "Đồng ý",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  
  const {user, setUser} = useAuthStore()
  
  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;
  
    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
      
      const currentTime = Date.now() / 1000;
      
      // Kiểm tra refresh token
      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert("Session Expired", "Please login again");
        return false;
      }
  
      // Kiểm tra access token và làm mới nếu cần
      if (decodedAccessToken?.exp < currentTime) {
        try {
          refresh_tokens()
          await refetchUser(setUser)
        } catch (error) {
          console.log(error);
          Alert.alert("There was an error refreshing token!");
          return false;
        }
      }
  
      // Điều hướng dựa trên vai trò của người dùng
      if (user?.role === 'Customer') {
        resetAndNavigate("ProductDashboard");
      } else {
        resetAndNavigate("DeliveryDashboard");
      }
      return true;
    }
  
    // Nếu không có token, yêu cầu đăng nhập lại
    resetAndNavigate("CustomerLogin");
    return false;
  };
  
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const hasPermission = await requestLocationPermission();
        if (hasPermission) {
          Geolocation.getCurrentPosition(
            async (position) => {
              console.log(position);
              // Sau khi lấy vị trí, gọi hàm tokenCheck
              await tokenCheck();
            },
            (error) => {
              console.error('Location Error:', error);
              Alert.alert('Lỗi', 'Không thể lấy vị trí của bạn: ' + error.message);
            },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 5000 } // Cấu hình để giảm độ chính xác và tăng thời gian lấy vị trí cũ
          );
        } else {
          throw new Error("Quyền truy cập vị trí không được cấp.");
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert("Lỗi", String(error));
      }
    };

    fetchUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
