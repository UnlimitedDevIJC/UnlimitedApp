import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import * as React from "react"
import HomePageStack from "../Navigator/HomePageStack"
import { FontAwesome5 } from "@expo/vector-icons"
import GamificationStack from "../Navigator/GamificationStack"

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
              name={focused ? "home" : "home"}
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
