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
  const ref = collection(db, "EventoUtilizador")

  const [utilizador, setUtilizador] = useState("null")
  const [inscrito, setInscrito] = useState(false)

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

  let listaEventoUtilizador = []

  onSnapshot(ref, (snapshot) => {
    let mounted = true
    if (mounted) {
      listaEventoUtilizador = []
      snapshot.docs.forEach((doc) => {
        listaEventoUtilizador.push({ ...doc.data(), id: doc.id })
      })

      for (let i = 0; i < listaEventoUtilizador.length; i++) {
        if (
          listaEventoUtilizador[i].idEvento == route.params.item.id &&
          listaEventoUtilizador[i].utilizador == utilizador.email
        ) {
          setInscrito(true)
        }
      }
    }
    return () => (mounted = false)
  })

  function inscrever() {
    getDocs(ref).then(() => {
      if (inscrito == false) {
        setDoc(doc(db, "EventoUtilizador", route.params.item.id), {
          idEvento: route.params.item.id,
          utilizador: utilizador.email,
        })
      }
    })
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

            <View style={styles.eventoLogo} />

            <View style={styles.detalhesEvento}>
              <View style={styles.eventoTituloBox}>
                <Text style={styles.eventoTitulo}>
                  {route.params.item.tema}
                </Text>
              </View>
              <View style={styles.descricaoEventoBox}>
                <Text style={styles.descricao}>
                  <Text style={styles.descricaoEvento}>Descrição: </Text>
                  {route.params.item.descricao}
                </Text>
              </View>
              <View style={styles.inscreverBotaoBox}>
                <TouchableOpacity
                  onPress={() => inscrever()}
                  style={styles.inscreverBotao}
                >
                  <Text style={styles.inscreverText}>Inscrever</Text>
                </TouchableOpacity>
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
