import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native"
import React from "react"
import styles from "./RegistoStyles"
import { FontAwesome5 } from "@expo/vector-icons"

const Registo = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ height: "100%" }} bounces={false}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss()
          }}
        >
          <>
            <View
              style={{
                backgroundColor: "#16508D",
                width: "100%",
                height: 120,
                transform: "rotateZ(-15deg)",
                left: -28,
                top: -70,
              }}
            />
            <Image
              style={{
                width: 85,
                height: 85,
                position: "absolute",
                left: "10%",
                top: "15%",
              }}
              source={require("../Login/unlimitedLogo.png")}
            />
            <Text
              style={{
                alignSelf: "center",
                justifyContent: "center",
                marginTop: 45,
                color: "#16508D",
                fontSize: 50,
                fontWeight: "800",
                letterSpacing: 1,
              }}
            >
              Registar
            </Text>
            <View>
              <TextInput
                style={{
                  backgroundColor: "#1A9FE0",
                  width: 350,
                  height: 50,
                  marginTop: 50,
                  alignSelf: "center",
                  borderRadius: 10,
                  padding: 10,
                }}
                type="text"
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 24,
                    fontWeight: "500",
                    letterSpacing: 1.5,
                  }}
                >
                  Insira o Nome:
                </Text>
              </TextInput>
            </View>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Registo
