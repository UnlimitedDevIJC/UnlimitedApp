import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native"
import React from "react"
import styles from "./HomePageStyle"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"

const HomePage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <TouchableWithoutFeedback>
          <>
            <View style={{ width: "100%", height: 130 }}>
              <View
                style={{
                  width: "120%",
                  transform: [{ rotateZ: "-15deg" }],
                  height: "100%",
                  left: "-10%",
                  top: "-55%",
                  backgroundColor: "#1A649F",
                }}
              />
              <View style={{ width: "100%", position: "absolute", top: "15%" }}>
                <Image
                  style={styles.logo}
                  source={require("../Login/unlimitedLogo.png")}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.editProfileBtn}>
              <FontAwesome5 style={styles.editProfileIcon} name="bell" />
            </TouchableOpacity>
            <View style={{ width: "100%", height: "100%" }}>
              <View
                style={{
                  width: "100%",
                  height: "80%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#174162",
                    fontSize: 30,
                    fontWeight: "600",
                  }}
                >
                  Bem-Vindo à Academia!
                </Text>
              </View>
              <View
                style={{
                  width: "120%",
                  transform: [{ rotateZ: "-12deg" }],
                  height: "80%",
                  left: "-10%",
                  top: "10%",
                  backgroundColor: "#DADBDB",
                }}
              >
                <TouchableOpacity></TouchableOpacity>
              </View>
              <View
                style={{
                  width: "120%",
                  transform: [{ rotateZ: "-12deg" }],
                  height: "100%",
                  left: "-10%",
                  top:'35%',
                  backgroundColor: "#1A649F",
                }}
              />
              <View>
                <TouchableOpacity></TouchableOpacity>
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage
