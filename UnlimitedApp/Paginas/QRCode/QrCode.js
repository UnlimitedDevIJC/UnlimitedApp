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
} from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
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

let listaDesafios = []
let listaCodigos = []
let listaDesafiosFiltrada = []
let filtros = []
const db = getFirestore()

const colRef = collection(db, "Desafios")
const userRef = collection(db, "Utilizador")

let index1 = 1

onSnapshot(colRef, (snapshot) => {
  let mounted = true
  if (mounted) {
    listaDesafios = []
    listaCodigos = []
    snapshot.docs.forEach((doc) => {
      listaDesafios.push({ ...doc.data(), id: doc.id })
      listaCodigos.push(doc.data().Codigo)
    })
    listaDesafios.sort((a, b) => {
      return a.inicio - b.inicio
    })
    listaDesafiosFiltrada = listaDesafios
    filtros = [...new Set(listaDesafiosFiltrada.map((item) => item.Tipo))]
    filtros.unshift("Completos") //Vai buscar os valores das areas sem estarem repetidos e acrescenta "Todos" ao inicio
    filtros.unshift("Todos") //Vai buscar os valores das areas sem estarem repetidos e acrescenta "Todos" ao inicio
  }
  return () => (mounted = false)
})

const QrCode = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [text, setText] = useState("Not yet scanned")
  const [utilizador, setUtilizador] = useState(null)
  const [codigo, setCodigo] = useState("")
  const [gamification, setGamification] = useState()

  const askForCameraPermission = () => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }

  function testarCodigo() {
    if (
      listaCodigos.includes(codigo) &&
      !utilizador.Desafios.includes(codigo)
    ) {
      let aux = (parseInt(utilizador.pontos) + getPontos(codigo)).toString()
      console.log("Foram adicionados " + aux + " PONTOS")
      Alert.alert(
        "Código correto!",
        "Parabéns, ganhaste " + getPontos(codigo) + " pontos!"
      )
      utilizadorRef = doc(db, "Utilizador", getAuth().currentUser.email)
      updateDoc(utilizadorRef, {
        Desafios: arrayUnion(codigo),
        pontos: aux,
      })
      let auxP = parseInt(aux)
      //console.log(auxP, " : ", gamification.pontos_n3, " : ", gamification.pontos_n2, " : " , gamification.pontos_n1, " : " , utilizador.nivel)
      if (auxP > gamification.pontos_n3 && utilizador.nivel < 4) {
        updateDoc(utilizadorRef, {
          imagem: gamification.imagem_n4,
          nivel: 4,
        })
        Alert.alert("Subiste de nível!")
      } else if (auxP > gamification.pontos_n2 && utilizador.nivel < 3) {
        updateDoc(utilizadorRef, {
          imagem: gamification.imagem_n3,
          nivel: 3,
        })
        Alert.alert("Subiste de nível!")
      } else if (auxP > gamification.pontos_n1 && utilizador.nivel < 2) {
        updateDoc(utilizadorRef, {
          imagem: gamification.imagem_n2,
          nivel: 2,
        })
        Alert.alert("Subiste de nível!")
      }
    } else {
      console.log("Codigo invalido ou já foi utilizado")
      Alert.alert(
        "Código inválido ou já utilizado!",
        "O código inserido não foi aceite pois já foi utilizado ou encontra-se incorreto. Por favor, tenta outra vez. "
      )
    }
    setCodigo("")
  }
  function getPontos(codigo) {
    let aux = listaDesafios.filter((item) => {
      return item.Codigo == codigo
    })
    return aux[0].Pontos
  }
  let utilizadorRef = null
  useEffect(() => {
    //verificar se tem login feito
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
        const gamiRef = doc(db, "Gamification", "Gamification_geral")
        onSnapshot(gamiRef, (doc) => {
          setGamification(doc.data())
        })
      } else {
        console.log("User is signed out gamification")
      }
    })
  }, [])

  useEffect(() => {
    askForCameraPermission()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    setText(data)
    setCodigo(data)
    console.log("Type: " + type + "\nData: " + data)
  }

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    )
  }

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
        <View style={styles.container}>
          <View style={styles.barCodeBox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.barCode}
            />
          </View>
        </View>
        <View style={styles.buttonsBox}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => {
              setScanned(false)
              testarCodigo()
            }}
          >
            <Text style={styles.textButtonLogin}> Ler QR Code </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => {
              navigation.navigate("EscreverQrCode")
            }}
          >
            <Text style={styles.textButtonLogin}> Escrever Código </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default QrCode
