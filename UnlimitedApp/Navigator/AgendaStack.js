import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Agenda from "../Paginas/Agenda/Agenda"

const Stack = createStackNavigator()

function AgendaStack() {
  return (
    <Stack.Navigator initialRouteName="Agenda">
      <Stack.Screen
        name="Agenda"
        component={Agenda}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default AgendaStack
