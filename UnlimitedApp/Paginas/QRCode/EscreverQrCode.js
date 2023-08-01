import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
} from "react-native"
import {
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  collection,
  getFirestore,
  onSnapshot,
  addDoc,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import styles from "./QrCodeStyle"

const EscreverQrCode = ({ navigation }) => {
  const [codigo, setCodigo] = useState()

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <View style={styles.headerRetangulo}></View>
          <View style={styles.headerLogoContainer}>
            <Image
              style={styles.headerLogo}
              source={require("../Login/unlimitedLogo.png")}
            />
          </View>
        </View>
        <View style={styles.codeContainer}>
          <View style={styles.codeInput}>
            <TextInput
              keyboardType="text"
              placeholderTextColor="#174162"
              placeholder="Colocar Código"
              autoCapitalize="none"
              type="text"
              onChangeText={(codigo) => setCodigo(codigo)}
              value={codigo}
              style={styles.input}
            ></TextInput>
          </View>
        </View>
        <View style={styles.btnBox}>
          <TouchableOpacity style={styles.btnSubmeter}>
            <Text style={styles.btnSubmeterText}>Submeter Código</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSubmeter}
            onPress={() => {
              navigation.navigate("QrCode")
            }}
          >
            <Text style={styles.btnSubmeterText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EscreverQrCode
