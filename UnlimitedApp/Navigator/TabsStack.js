import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import * as React from "react"
import { FontAwesome5 } from "@expo/vector-icons"
import HomePageStack from "../Navigator/HomePageStack"
import GamificationStack from "../Navigator/GamificationStack"
import PerfilStack from "./PerfilStack"
import AgendaStack from "./AgendaStack"

const Tab = createBottomTabNavigator()

const TabsStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomePageTab"
        component={HomePageStack}
        options={{
          headerShown: false,
          tabBarLabel: "HomePage",
          gestureEnabled: false,
          tabBarInactiveTintColor: "#82265B",
          tabBarActiveTintColor: "#82265B",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          title: "HomePage",

          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
              name={focused ? "home" : "home"}
              color={focused ? "blue" : "black"}
              size={focused ? 30 : 26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AgendaTab"
        component={AgendaStack}
        options={{
          headerShown: false,
          tabBarLabel: "Agenda",
          gestureEnabled: false,
          tabBarInactiveTintColor: "#82265B",
          tabBarActiveTintColor: "#82265B",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          title: "HomePage",

          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
              name={focused ? "calendar" : "calendar"}
              color={focused ? "blue" : "black"}
              size={focused ? 30 : 26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="GamificationTab"
        component={GamificationStack}
        options={{
          headerShown: false,
          tabBarLabel: "Gamification",
          gestureEnabled: false,
          tabBarInactiveTintColor: "#82265B",
          tabBarActiveTintColor: "#82265B",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          title: "HomePage",

          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
              name={focused ? "trophy" : "trophy"}
              color={focused ? "blue" : "black"}
              size={focused ? 30 : 26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="PerfilTab"
        component={PerfilStack}
        options={{
          headerShown: false,
          tabBarLabel: "Perfil",
          gestureEnabled: false,
          tabBarInactiveTintColor: "#82265B",
          tabBarActiveTintColor: "#82265B",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          title: "HomePage",

          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
              name={focused ? "user" : "user"}
              color={focused ? "blue" : "black"}
              size={focused ? 30 : 26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabsStack
