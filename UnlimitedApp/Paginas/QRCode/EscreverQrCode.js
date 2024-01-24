import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  StatusBar,
} from "react-native"
import {
  doc,
  arrayUnion,
  updateDoc,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import styles from "./QrCodeStyle"
import { FontAwesome5 } from "@expo/vector-icons"

let listaEventos = []
let listaCodigos = []

const db = getFirestore()
const colRef = collection(db, "Evento")

onSnapshot(colRef, (snapshot) => {
  let mounted = true
  if (mounted) {
    listaEventos = []
    listaCodigos = []
    snapshot.docs.forEach((doc) => {
      listaEventos.push({ ...doc.data(), id: doc.id })
      listaCodigos.push(doc.data().codigoEvento)
    })
  }
  return () => (mounted = false)
})

const EscreverQrCode = ({ navigation }) => {
  const [codigo, setCodigo] = useState()
  const [utilizador, setUtilizador] = useState("null")
  const [evento, setEvento] = useState()
  const [utilizadorUtils, setUtilizadorUtils] = useState("null")
  const [user, setUser] = useState()

  let utilizadorRef = null
  let utilizadorUtilsRef = null
  useEffect(() => {
    //verificar se tem login feito
    let isMounted = true
    if (isMounted) {
      const auth = getAuth()
      onAuthStateChanged(auth, (user1) => {
        if (user1) {
          utilizadorRef = doc(db, "Utilizador", user1.email)
          utilizadorUtilsRef = doc(db, "UtilizadorUtils", user1.email)
          setUser(user1)
          onSnapshot(utilizadorRef, { includeMetadataChanges: true }, (doc) => {
            if (doc.exists()) {
              setUtilizador(doc.data())
            } else {
            }
          })
          onSnapshot(
            utilizadorUtilsRef,
            { includeMetadataChanges: true },
            (doc) => {
              if (doc.exists()) {
                setUtilizadorUtils(doc.data())
              } else {
              }
            }
          )
        } else {
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [])

  function getPontos(code) {
    let aux = listaEventos.filter((item) => {
      return item.codigoEvento == code
    })
    return aux[0].pontosAtribuidos
  }

  function testarCodigo() {
    if (
      listaCodigos.includes(codigo) &&
      !utilizadorUtils.codigosEventos.includes(codigo)
    ) {
      let aux = (
        parseInt(utilizador.pontos) + parseInt(getPontos(codigo))
      ).toString()
      Alert.alert("Adicionado")
      utilizadorRef = doc(db, "Utilizador", user.email)
      updateDoc(utilizadorRef, {
        pontos: aux,
      })
      utilizadorUtilsRef = doc(db, "UtilizadorUtils", user.email)
      updateDoc(utilizadorUtilsRef, {
        codigosEventos: arrayUnion(codigo),
      })
    } else {
      Alert.alert("Já adicionaste!")
    }
  }

  const goBack = () => {
    navigation.goBack()
  }

  const HeaderInclinado = () => {
    return (
      <View>
        <View
          style={{
            backgroundColor: "#1A649F",
            height: 150,
            width: "120%",
            left: -50,
            top: -55,
            transform: [{ skewY: "-15deg" }],
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Image
          style={styles.imageLogo}
          source={require("../Login/unlimitedLogo.png")}
        />
        <TouchableOpacity style={styles.goBackBtn} onPress={goBack}>
          <FontAwesome5 name="arrow-left" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      <View
        style={{
          backgroundColor: "#1A649F",
          height: Platform.OS === "ios" ? 40 : StatusBar.currentHeight,
        }}
      >
        <StatusBar
          translucent
          backgroundColor="#1A649F"
          barStyle="light-content"
        />
      </View>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} bounces={false}>
          <HeaderInclinado />
          <View style={styles.codeInput}>
            <TextInput
              placeholderTextColor="#174162"
              placeholder="Colocar Código"
              autoCapitalize="none"
              type="text"
              onChangeText={(text) => setCodigo(text)}
              value={codigo}
              style={styles.input}
            ></TextInput>
          </View>
          <TouchableOpacity
            style={styles.btnSubmeter}
            onPress={() => testarCodigo()}
          >
            <Text style={styles.btnSubmeterText}>Submeter Código</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default EscreverQrCode
