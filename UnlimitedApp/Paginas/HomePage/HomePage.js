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
  Alert,
  ImageBackground,
} from "react-native"
import React from "react"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"

const HomePage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#1A649F", flex: 1 }}>
      <ScrollView
        style={{ flex: 1, marginBottom: 45, backgroundColor: "#F2F3F5" }}
      >
        <View
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 20,
            height: 125,
          }}
        >
          <View
            style={{
              width: "120%",
              transform: [{ rotateZ: "-15deg" }],
              height: "120%",
              left: "-10%",
              top: "-70%",
              backgroundColor: "#1A649F",
              shadowColor: "#000",
              shadowOffset: {
                width: 5,
                height: 8,
              },
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
              elevation: 40,
            }}
          ></View>
          <View
            style={{
              width: "100%",
              position: "absolute",
              top: "24%",
            }}
          >
            <Image
              style={{
                width: 85,
                height: 85,
                alignSelf: "center",
              }}
              source={require("../Login/unlimitedLogo.png")}
            />
          </View>
          <TouchableOpacity
            style={{
              width: "15%",
              position: "absolute",
              top: "60%",
              right: "3%",
              alignSelf: "flex-end",
            }}
          >
            <FontAwesome5
              style={{
                fontSize: "35%",
                color: "#174162",
              }}
              name="bell"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            padding: 10,
            height: 90,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#174162",
                fontSize: 34,
                fontWeight: "600",
              }}
            >
              {`Bem-Vindo à Academia!`}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            padding: 5,
            height: 300,
          }}
        >
          <View
            style={{
              width: "120%",
              transform: [{ rotateZ: "-12deg" }],
              left: "-10%",
              height: "60%",
              top: "15%",
              backgroundColor: "#DADBDB",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 5,
                height: 8,
              },
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
              elevation: 40,
            }}
          >
            <Image
              style={{
                width: "65%",
                height: "55%",
                transform: [{ rotateZ: "12deg" }],
              }}
              source={require("../HomePage/UnlimitedVision.png")}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            padding: 5,
            height: 400,
          }}
        >
          <View
            style={{
              width: "140%",
              transform: [{ rotateZ: "-12deg" }],
              height: "75%",
              left: "-15%",
              top: "-5%",
              backgroundColor: "#174162",
              shadowColor: "#000",
              shadowOffset: {
                width: 5,
                height: 8,
              },
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
              elevation: 40,
            }}
          >
            <Text
              style={{
                width: "65%",
                height: "100%",
                transform: [{ rotateZ: "12deg" }],
                left: "12%",
                top: "18%",
                fontSize: 20,
                lineHeight: 30,
                color: "white",
              }}
            >
              Olá eu sou o Gonçalo Olá eu sou o Gonçalo Olá eu sou o Gonçalo Olá
              eu sou o Gonçalo Olá eu sou o Gonçalo Olá eu sou o Gonçalo Olá eu
              sou o Gonçalo Olá eu sou o Gonçalo Olá eu sou o Gonçalo Olá eu sou
              o Gonçalo Olá eu sou o Gonçalo Olá eu sou o Gonçalo Olá eu sou o
              Gonçalo.{" "}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            padding: 10,
            top:'-3%',
            marginBottom: 20,
            height: 150,
          }}
        >
          <TouchableOpacity style={{alignItems:'center'}}>
            <Image
              style={{
                width: "80%",
                height: "100%",
              }}
              source={require("../HomePage/UnlimitedVision.png")}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage
