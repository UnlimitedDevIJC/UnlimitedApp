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
  Linking,
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
import { getAuth, onAuthStateChanged } from "firebase/auth"
import styles from "./PerfilStyle"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"

const Perfil = ({ navigation }) => {
  const [utilizador, setUtilizador] = useState("null")

  const db = getFirestore()

  let utilizadorRef = null
  useEffect(() => {
    //verificar se tem login feito
    let isMounted = true
    if (isMounted) {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          utilizadorRef = doc(db, "Utilizador", user.email)
          onSnapshot(utilizadorRef, { includeMetadataChanges: true }, (doc) => {
            if (doc.exists()) {
              setUtilizador(doc.data())
            } else {
              console.log("No such document!")
            }
          })
        } else {
          // console.log("User is signed out home")
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [])

  function handleLogout() {
    const auth = getAuth()
    auth.signOut().then(() => navigation.navigate("Login"))
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} bounces={true}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss()
          }}
        >
          <>
            {/* Retangulo de fundo */}
            <View style={styles.retanguloFundo} />

            {/* Logo pequneo */}
            <Image
              style={styles.logo}
              source={require("../Login/unlimitedLogo.png")}
            />

            <TouchableOpacity
              style={styles.editProfileBtn}
              onPress={() => navigation.navigate("EditarPerfil")}
            >
              <FontAwesome5 style={styles.editProfileIcon} name="user-edit" />
            </TouchableOpacity>
            <View style={styles.perfilContainer}>
              <View style={styles.perfilImageContainer}>
                <Image
                  style={styles.perfilImage}
                  source={require("./foto.jpeg")}
                />
              </View>
              <View style={styles.perfilDataContainer}>
                <View style={styles.perfilNomeContainer}>
                  <Text style={styles.perfilNome}>{utilizador.nome}</Text>
                </View>
                <View style={styles.perfilDetalhesContainer}>
                  <Text style={styles.perfilDetalhes}>{utilizador.email}</Text>
                </View>
                <View style={styles.perfilDetalhesContainer}>
                  <Text style={styles.perfilDetalhes}>
                    {utilizador.telemovel}
                  </Text>
                </View>
                <View style={styles.perfilDetalhesContainer}>
                  <Text style={styles.perfilDetalhes}>
                    {utilizador.universidade}
                  </Text>
                </View>
                <View style={styles.perfilDetalhesContainer}>
                  <Text style={styles.perfilDetalhes}>
                    {utilizador.anoEscolar}º Ano
                  </Text>
                </View>
                <View style={styles.perfilDetalhesContainer}>
                  <Text style={styles.perfilDetalhes}>
                    {utilizador.curriculo ? utilizador.curriculo : "Curriculo"}
                  </Text>
                </View>
                <View style={styles.perfilDetalhesContainer}>
                  <Text
                    style={styles.perfilDetalhes}
                    onPress={() => Linking.openURL(utilizador.linkedIn)}
                  >
                    {utilizador.linkedIn ? utilizador.linkedIn : "LinkedIn"}
                  </Text>
                </View>
                <View style={styles.perfilDetalhesContainer}>
                  <Text style={styles.perfilPontos}>
                    {utilizador.pontos} Pontos
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.perfilLogout}
                  onPress={() => handleLogout()}
                >
                  <Text style={styles.logout}>Sair da conta</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Perfil
