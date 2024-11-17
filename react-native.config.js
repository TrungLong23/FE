module.exports = {
    project: {
      ios: {},
      android: {},
    },
    assets: ['./src/assets/fonts/'], // Khai báo thư mục chứa fonts
    dependencies: {
      'react-native-vector-icons': {
        platforms: {
          ios: null, // Bỏ qua cài đặt cho iOS nếu không cần
        },
      },
    },
  };
  