import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import RollingBar from 'react-native-rolling-bar';
import CustomText from '@components/ui/CustomText';

const SearchBar: FC = () => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Icon name='search' color={Colors.text} size={RFValue(20)} />
            <RollingBar interval={3000} defaultStyle={false} customStyle={styles.textContainer}>
                <CustomText variant='h6' fontFamily={Fonts.Medium}>Search "sweets"</CustomText>
                <CustomText variant='h6' fontFamily={Fonts.Medium}>Search "milks"</CustomText>
                <CustomText variant='h6' fontFamily={Fonts.Medium}>Search for ata, dal, coke</CustomText>
                <CustomText variant='h6' fontFamily={Fonts.Medium}>Search "chips"</CustomText>
                <CustomText variant='h6' fontFamily={Fonts.Medium}>Search "pooja thali"</CustomText>
            </RollingBar>
            <View style={styles.divider} />
            <Icon name='mic' color={Colors.text} size={RFValue(20)} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F4F7',
        flexDirection: 'row',
        alignItems: 'center', // Căn giữa theo chiều dọc
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: Colors.border,
        marginTop: 15,
        overflow: 'hidden',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        height: 50, // Đặt chiều cao cố định cho thanh tìm kiếm
    },
    textContainer: {
        width: '70%', // Điều chỉnh để có không gian cho các biểu tượng
        paddingLeft: 10,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: "#ddd",
        marginHorizontal: 10,
    },
});

export default SearchBar;
