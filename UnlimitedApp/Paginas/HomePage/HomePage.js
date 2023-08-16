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
import React from "react"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  getDocs,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import styles from "./HomePageStyle"

const db = getFirestore()
const academiaRef = collection(db, "Academia")
const utilizadorUtilsRef = collection(db, "UtilizadorUtils")
const notificationRef = collection(db, "Notificacoes")

let listaAcademia = []
let listaNotificacoes = []
let listaNotificacoesUser = []
let notificaoes = []
let listaNotificationIds = [] //Todos os Ids não repetido

onSnapshot(academiaRef, (snapshot) => {
  let existe = true
  if (existe) {
    snapshot.docs.forEach((doc) => {
      listaAcademia.push({ ...doc.data(), id: doc.id })
    })
  }
  return () => (existe = false)
})

onSnapshot(utilizadorUtilsRef, (snapshot) => {
  let existe = true
  if (existe) {
    snapshot.docs.forEach((doc) => {
      listaNotificacoesUser.push({ ...doc.data(), id: doc.id })
    })
  }

  return () => (existe = false)
})

onSnapshot(notificationRef, (snapshot) => {
  let existe = true
  if (existe) {
    snapshot.docs.forEach((doc) => {
      listaNotificacoes.push({ ...doc.data(), id: doc.id })
      if (!listaNotificationIds.includes(doc.data().id)) {
        listaNotificationIds.push(doc.data().id)
      }
    })
  }
  return () => (existe = false)
})

const HomePage = ({ navigation }) => {
  const [utilizador, setUtilizador] = useState("null")
  const [utilizadorUtils, setUtilizadorUtils] = useState("null")
  const [imageCodigo, setImageCodigo] = useState()
  const [empresaURL, setEmpresaURL] = useState()
  const [academia, setAcademia] = useState("")
  const [user, setUser] = useState()
  const [utils, setUtils] = useState()
  const [notificacoesOn, setNotificacoesOn] = useState([])
  const [userNotification, setUserNotification] = useState([])
  const [notificationIds, setNotificationIds] = useState([])

  const imageData = `${imageCodigo}`

  let utilizadorRef = null
  let utilizadorUtilsRef = null
  useEffect(() => {
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

  useEffect(() => {
    if (utilizadorUtils) {
      const unsubscribe = onSnapshot(notificationRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data())
        const filteredNotifications = data.filter((item) => {
          return (
            (item.anos === "all" &&
              utilizadorUtils.notificacoesDelete &&
              !utilizadorUtils.notificacoesDelete.includes(item.id)) ||
            (item.anos === utilizador.anoEscolar &&
              utilizadorUtils.notificacoesDelete &&
              !utilizadorUtils.notificacoesDelete.includes(item.id))
          )
        })
        setUserNotification(filteredNotifications)
      })
      return () => unsubscribe()
    }
  })

  useEffect(() => {
    for (let i = 0; i < listaAcademia.length; i++) {
      if (listaAcademia[i].codigo == utilizador.codigoAcademia) {
        setAcademia(listaAcademia[i])
      }
    }
    setEmpresaURL(academia.website)
    setImageCodigo(academia.foto)
  })

  useEffect(() => {
    for (let i = 0; i < listaNotificacoesUser.length; i++) {
      if (listaNotificacoesUser[i].id == utilizador.email) {
        setUtils(listaNotificacoesUser[i])
      }
    }
    if (utils) {
      setNotificacoesOn(utils.notificacoes)
    }
  })

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} bounces={false}>
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
            style={{
              width: "15%",
              position: "absolute",
              top: "60%",
              right: "3%",
              alignSelf: "flex-end",
            }}
            onPress={() => navigation.navigate("Notificacoes")}
          >
            <FontAwesome5
              style={{
                fontSize: 34,
                color: "#174162",
              }}
              name="bell"
            />
          </TouchableOpacity>
          {notificacoesOn.length != 0 ? (
            <TouchableOpacity
              style={{
                width: 20,
                top: 20,
                position: "absolute",
                top: "60%",
                right: "9%",
                alignSelf: "flex-end",
              }}
              onPress={() => navigation.navigate("Notificacoes")}
            >
              <FontAwesome5
                solid
                style={{
                  fontSize: 15,
                  color: "red",
                }}
                name="circle"
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View
          style={{
            width: "100%",
            padding: 10,
            height: 90,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#174162",
                fontSize: 34,
                fontWeight: "600",
              }}
            >
              {`Bem-Vindo à Academia!`}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            padding: 5,
            height: 300,
          }}
        >
          <View
            style={{
              width: "120%",
              left: "-10%",
              height: "80%",
              top: "10%",
              backgroundColor: "#DADBDB",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 5,
                height: 8,
              },
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
              elevation: 40,
            }}
          >
            <Image
              style={{
                width: 400,
                height: 75,
                top: "3%",
              }}
              source={{ uri: `data:image/png;base64,${imageData}` }}
              //style={{ width: 200, height: 200 }}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            padding: 5,
            height: 400,
          }}
        >
          <View
            style={{
              width: "140%",
              transform: [{ rotateZ: "-12deg" }],
              height: "70%",
              left: "-15%",
              top: "10%",
              backgroundColor: "#174162",
              shadowColor: "#000",
              shadowOffset: {
                width: 5,
                height: 8,
              },
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
              elevation: 40,
            }}
          >
            <Text
              style={{
                width: "65%",
                height: "100%",
                transform: [{ rotateZ: "12deg" }],
                left: "13%",
                top: "20%",
                fontSize: 16,
                lineHeight: 25,
                color: "white",
              }}
            >
              <Text style={{ fontWeight: 600 }}>Descrição: {""}</Text>
              {academia.descricao}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            padding: 10,
            top: "-8%",
            height: 150,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Text
              style={{
                alignSelf: "center",
                fontWeight: 600,
                fontSize: 14,
                color: "#174162",
              }}
            >
              Powered By:{" "}
            </Text>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => Linking.openURL(empresaURL)}
            >
              <Image
                style={{
                  width: 200,
                  height: 60,
                }}
                source={{ uri: `data:image/png;base64,${imageData}` }}
                //style={{ width: 200, height: 200 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                alignSelf: "center",
                fontWeight: 600,
                fontSize: 14,
                color: "#174162",
              }}
            >
              Made By:{" "}
            </Text>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => Linking.openURL(empresaURL)}
            >
              <Image
                style={{
                  width: 200,
                  height: 60,
                }}
                source={{ uri: `data:image/png;base64,${imageData}` }}
                //style={{ width: 200, height: 200 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage
