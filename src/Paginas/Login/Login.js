import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ImageBackground,
  Touchable,
} from "react-native"
import React, { useState } from "react"

const Login = ({navigation}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <>
        <ImageBackground
          source={require("../Login/ULTeam.png")}
          resizeMode="cover"
          style={{ flex: 1, opacity: 0.65 }}
        ></ImageBackground>
        <Image
          style={{
            width: 200,
            height: 200,
            position: "absolute",
            left: "25%",
            top: "15%",
          }}
          source={require("../Login/unlimitedLogo.png")}
        />
        <TextInput
          keyboardType="email-address"
          style={{
            width: 300,
            height: 50,
            position: "absolute",
            top: "45%",
            alignSelf: "center",
            // backgroundColor: "blue",
            padding: 5,
            borderBottomColor: "white",
            borderBottomWidth: 1.5,
            fontSize: 22,
            textAlign: "left",
          }}
          type="text"
          onChangeText={(email) => setEmail(email)}
          value={email}
        >
          <Text style={{color:'white', fontWeight:'600'}}>Introduzir Email</Text>
        </TextInput>
        <TextInput
          keyboardType="email-address"
          style={{
            width: 300,
            height: 50,
            position: "absolute",
            top: "54%",
            alignSelf: "center",
            // backgroundColor: "blue",
            padding: 5,
            borderBottomColor: "white",
            borderBottomWidth: 1.5,
            fontSize: 22,
            textAlign: "left",
          }}
          type="text"
          onChangeText={(password) => setPassword(password)}
          value={password}
        >
          <Text style={{color: 'white', fontWeight: '600'}}>Introduzir Password</Text>
        </TextInput>
        <View
          style={{
            width: "100%",
            height: 35,
            position: "absolute",
            top: "62%",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                textDecorationLine: "underline",
                letterSpacing: 0.5,
                color:'white'
              }}
            >
              Recuperar Password
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            height: 50,
            position: "absolute",
            top: "70%",
            // backgroundColor: "blue",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "50%",
              height: "100%",
              backgroundColor: "orange",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1A9FE0",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                color: "white",
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            height: 50,
            position: "absolute",
            top: "78%",
            // backgroundColor: "blue",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "50%",
              height: "100%",
              backgroundColor: "orange",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1A9FE0",
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate("Registo")}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                color: "white",
                textAlign: "center",
              }}
            >
              Registar
            </Text>
          </TouchableOpacity>
        </View>
      </>
    </TouchableWithoutFeedback>
  )
}

export default Login
