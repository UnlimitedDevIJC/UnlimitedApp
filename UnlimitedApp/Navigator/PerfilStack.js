import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Perfil from "../Paginas/Perfil/Perfil"

const Stack = createStackNavigator()

function PerfilStack() {
  return (
    <Stack.Navigator initialRouteName="Perfil">
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default PerfilStack
