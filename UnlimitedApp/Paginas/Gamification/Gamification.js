import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native"
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDocs,
  getDoc,
  doc,
  QuerySnapshot,
} from "firebase/firestore"
import React, { useState, useEffect } from "react"
import styles from "./GamificationStyle"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import QrCode from "../QRCode/QrCode"

const db = getFirestore()
const gamificationRef = collection(db, "Gamification")

let descricaoGamification = []

onSnapshot(gamificationRef, (snapshot) => {
  let existe = true
  if (existe) {
    snapshot.docs.forEach((doc) => {
      descricaoGamification.push({ ...doc.data(), id: doc.id })
    })
  }
  return () => (existe = false)
})

const Gamification = ({ navigation }) => {
  const [descricao, setDescricao] = useState("")

  useEffect(() => {
    for (let i = 0; i < descricaoGamification.length; i++) {
      setDescricao(descricaoGamification[i])
    }
  })

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
              <Text
                style={{
                  width: "70%",
                  height: "100%",
                  transform: [{ rotateZ: "12deg" }],
                  top: "12%",
                  left: "4%",
                  fontSize: 16,
                  lineHeight: 25,
                  color: "white",
                }}
              >
                {/* {descricao.descricaoPremio} */}
                Olá eu sou o Goçalo Olá eu sou o Goçalo Olá eu sou o Goçalo Olá
                eu sou o Goçalo Olá eu sou o Goçalo Olá eu sou o Goçalo Olá eu
                sou o Goçalo Olá eu sou o Goçalo Olá eu sou o Goçalo Olá eu sou o aaaaaaaa.
              </Text>
            </View>
            <FontAwesome5 style={styles.notificationIcon1} name="trophy" />

            <View style={styles.academiaDescricaoRetangulo}>
              <Text
                style={{
                  width: "70%",
                  height: "100%",
                  transform: [{ rotateZ: "-168deg" }],
                  fontSize: 16,
                  top: "-12%",
                  right: "-20%",
                  lineHeight: 25,
                  color: "white",
                }}
              >
                Olá eu sou o Goçalo Olá eu sou o Goçalo Olá eu sou o Goçalo Olá
                eu sou o Goçalo Olá eu sou o Goçalo Olá eu sou o Goçalo Olá eu
                sou o Goçalo Olá eu sou o Goçalo Olá eu sou o Goçalo Olá eu sou o aaaa.
              </Text>
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
