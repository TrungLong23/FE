import React, { FC, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Image, SafeAreaView, Keyboard, Alert } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import { resetAndNavigate } from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts, lightColors } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { customerLogin } from '@service/authService';

const bottomColors = [...lightColors].reverse();

const CustomerLogin: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if(keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue:0 ,
        duration: 500,
        useNativeDriver: true
      }).start()
    }else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: true
      }).start()
    }
    }, [keyboardOffsetHeight])

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
        // Thực hiện xác thực ở đây, ví dụ: await customerLogin(phoneNumber);
        // Nếu thành công
        await customerLogin(phoneNumber)
        resetAndNavigate('ProductDashboard');
    } catch (e) {
        console.error("Login Failed: ", e);
        Alert.alert("Login Failed", "Please check your credentials and try again."); // Thêm thông báo lỗi
    } finally {
        setLoading(false);
    }
};

  
  // Handle left-to-right swipe gesture only
 const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
        const { translationX, translationY } = nativeEvent;

        // Thay đổi ngưỡng nếu cần
        const threshold = 100; // Độ nhạy của swipe
        if (Math.abs(translationX) > Math.abs(translationY) && translationX > threshold) {
            resetAndNavigate('DeliveryLogin'); 
        }
    }
};

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContainer}
              style={{ transform: [{ translateY: animatedValue }] }}
            >
              <LinearGradient colors={bottomColors} style={styles.gradient} />
              <View style={styles.content}>
                <Image source={require('@assets/images/logo.png')} style={styles.logo} />
                <CustomText variant="h2" fontFamily={Fonts.Bold}>
                  Vietnam's last minute app
                </CustomText>

                <CustomText variant="h5" fontFamily={Fonts.SemiBold} style={styles.text}>
                  Log in or sign up
                </CustomText>

                <CustomInput
                  onChangeText={(text) => setPhoneNumber(text.slice(0, 10))}
                  onClear={() => setPhoneNumber('')}
                  value={phoneNumber}
                  left={
                    <CustomText style={styles.phoneText} variant="h6" fontFamily={Fonts.SemiBold}>
                      +84
                    </CustomText>
                  }
                  placeholder="Enter mobile number"
                  inputMode="numeric"
                />
                <CustomButton
                  disabled={phoneNumber?.length != 9}
                  onPress={handleAuth}
                  loading={loading}
                  title="Continue"
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>

        <View style={styles.footer}>
          <SafeAreaView>
            <CustomText fontSize={RFValue(8)}>
              By Continuing, you agree to our Terms of Service & Privacy Policy
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 2,
    marginBottom: 2,
    opacity: 0.8,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  phoneText: {
    marginLeft: 10,
  },
  footer: {
    borderTopWidth: 0.6,
    borderColor: Colors.border,
    paddingBottom: 25,
    zIndex: 20,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fc',
    width: '100%',
  },
  gradient: {
    paddingTop: 60,
    width: '100%',
  },
});

export default CustomerLogin;
