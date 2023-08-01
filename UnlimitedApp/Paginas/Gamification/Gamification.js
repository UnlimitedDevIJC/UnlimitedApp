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
import styles from "./GamificationStyle"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import QrCode from "../QRCode/QrCode"

const Gamification = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} bounces={true}>
        <View style={{ width: "100%", height: 130 }}>
          <View style={{ width: "100%", height: "100%" }}>
            <View style={styles.retanguloFundo} />
            <View style={styles.logoView}>
              <Image
                style={styles.logo}
                source={require("../Login/unlimitedLogo.png")}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => navigation.navigate("QrCode")}
          >
            <FontAwesome5 style={styles.notificationIcon} name="qrcode" />
          </TouchableOpacity>
          <View style={{ width: "100%", height: "100%", top: "-25%" }}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>
                Já conheces os nossos prémios?
              </Text>
            </View>
            <View style={styles.academiaLogoRetangulo}>
              <Text>jxdujxuduxdjujxuj efefmwmfwe fewfw eodeodemom</Text>
            </View>
            <FontAwesome5 style={styles.notificationIcon1} name="trophy" />

            <View style={styles.academiaDescricaoRetangulo}>
              <Text>jxdujxuduxdjujxuj</Text>
            </View>
            <FontAwesome5
              style={styles.notificationIcon2}
              name="calendar-alt"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Gamification
