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
              <View style={styles.retanguloFundo} />
              <View style={styles.logoView}>
                <Image
                  style={styles.logo}
                  source={require("../Login/unlimitedLogo.png")}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.notificationBtn}>
              <FontAwesome5 style={styles.notificationIcon} name="bell" />
            </TouchableOpacity>
            <View style={{ width: "100%", height: "100%" }}>
              <View style={styles.titleView}>
                <Text style={styles.titleText}>Bem-Vindo à Academia!</Text>
              </View>
              <View style={styles.academiaLogoRetangulo}></View>
              <View style={styles.academiaDescricaoRetangulo}></View>
              <View style={styles.empresaLogoBtnView}>
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
