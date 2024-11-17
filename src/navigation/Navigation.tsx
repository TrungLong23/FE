import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import SplashScreen from '@features/auth/SplashScreen';
import { navigationRef } from '@utils/NavigationUtils';

import ProductDashboard from '@features/dashboard/ProductDashboard';
import DeliveryDashboard from '@features/delivery/DeliveryDashboard';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import CustomerLogin from '@features/auth/CustomerLogin';
import ProductCategories from '@features/category/ProductCategories';


const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    // Wrap NavigationContainer with GestureHandlerRootView
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="ProductDashboard" component={ProductDashboard} />
          <Stack.Screen name="ProductCategories" component={ProductCategories} />
          <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard} />

          <Stack.Screen
            options={{
              animation: 'fade',
            }}
            name="DeliveryLogin"
            component={DeliveryLogin}
          />
          <Stack.Screen
            options={{
              animation: 'fade',
            }}
            name="CustomerLogin"
            component={CustomerLogin}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Navigation;
