import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAuthStore } from '@state/authStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header: FC<{ showNotice: () => void }> = ({ showNotice }) => {
    const { setUser, user } = useAuthStore(); // Di chuyển vào trong component
    return (
        <View style={styles.subcontainer}>
            <TouchableOpacity activeOpacity={0.8}>
                <CustomText fontFamily={Fonts.Bold} variant='h8' style={styles.text}>
                    Delivery in 
                </CustomText>
                <View style={styles.flowRowGap}>
                    <CustomText fontFamily={Fonts.SemiBold} variant='h2' style={styles.text}>
                        10 minutes
                    </CustomText>
                    <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
                        <CustomText
                            fontSize={RFValue(8)}
                            fontFamily={Fonts.SemiBold}
                            style={{ color: '#3B4886' }} // Màu chữ
                        >
                            ⛈ Rain
                        </CustomText>
                    </TouchableOpacity>
                </View>

                <View style={styles.flexRow}>
                    <CustomText
                        variant='h8'
                        numberOfLines={1}
                        fontFamily={Fonts.Medium}
                        style={styles.text2}
                    >
                        {user?.address || 'Knowhere, Somewhere 😅'}
                    </CustomText>
                    <Icon name='menu-down' color='#fff' size={RFValue(20)} style={styles.iconStyle} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <Icon name='account-circle-outline'  size={RFValue(36)} color='#fff'  />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#fff',
    },
    subcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: Platform.OS === 'android' ? 10 : 5,
        justifyContent: 'space-between',
    },
    flowRowGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    noticeBtn: {
        backgroundColor: "#E8EAF5",
        borderRadius: 100,
        paddingHorizontal: 8,
        paddingVertical: 2,
        bottom: -2,
    },
    flexRow: {
        justifyContent: 'flex-start', // Căn trái để các phần tử nằm gần nhau hơn
        alignItems: 'center', // Căn giữa theo chiều dọc
        flexDirection: 'row',
        width: '70%',
        gap: 2,
    },
    text2: {
        color: '#fff',
        width: 'auto', // Đặt width thành auto để cho phép tùy chỉnh kích thước
        textAlign: 'left', // Căn trái để đảm bảo vị trí chính xác
    },
    iconStyle: {
        marginLeft: 5, // Khoảng cách giữa CustomText và Icon
        marginBottom: -2, // Điều chỉnh vị trí xuống một chút nếu cần
    },
});

export default Header;
