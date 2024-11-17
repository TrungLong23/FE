import { View, Text } from 'react-native'
import React from 'react'
import { useAuthStore } from '@state/authStore'

const DeliveryDashBoard = () => {
   const { user } = useAuthStore()
  console.log(user)
  return (
    <View>
      <Text>DeliveryDashBoard</Text>
    </View>
  )
}

export default DeliveryDashBoard