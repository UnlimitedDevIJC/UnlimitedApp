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
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDocs,
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import React, { useState, useEffect } from "react"
import styles from "./DetalheEventosStyle"

const DetalheEventos = ({ route }) => {
  const db = getFirestore()

  const [utilizador, setUtilizador] = useState("null")

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
  })

  function inscrever() {

    console.log(route.params.item.id)
    console.log(utilizador)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} bounces={false}>
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

            <View style={styles.eventoLogo}></View>

            <View style={styles.detalhesEvento}>
              <View style={styles.eventoTituloBox}>
                <Text style={styles.eventoTitulo}>
                  {route.params.item.codigo}
                </Text>
              </View>
              <View style={styles.descricaoEventoBox}>
                <Text style={styles.descricao}>
                  Descrição:{" "}
                  <Text style={styles.descricaoEvento}>
                    {route.params.item.descricao}
                  </Text>
                </Text>
              </View>
              <View style={styles.inscreverBotaoBox}>
                <TouchableOpacity
                  onPress={() => inscrever()}
                  style={styles.inscreverBotao}
                >
                  <Text style={styles.inscreverText}>Inscrever</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inscreverBotaoBox}>
                <TouchableOpacity style={styles.inscreverBotao}>
                  <Text style={styles.inscreverText}>Ler Qr Code</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetalheEventos
