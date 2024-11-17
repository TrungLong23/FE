import { AppRegistry } from 'react-native';
import App from './App'; // Đường dẫn tới component gốc của ứng dụng
import { name as appName } from './app.json'; // Tên ứng dụng từ app.json

AppRegistry.registerComponent(appName, () => App);
