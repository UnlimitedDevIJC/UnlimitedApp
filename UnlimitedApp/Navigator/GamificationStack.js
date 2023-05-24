import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Gamification from "../Paginas/Gamification/Gamification"

const Stack = createStackNavigator()

function GamificationStack() {
  return (
    <Stack.Navigator initialRouteName="Gamification">
      <Stack.Screen
        name="Gamification"
        component={Gamification}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default GamificationStack
