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
  getDoc,
  doc,
  QuerySnapshot,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"

const db = getFirestore()
const academiaRef = collection(db, "Academia")

let listaAcademia = []

onSnapshot(academiaRef, (snapshot) => {
  let existe = true
  if (existe) {
    snapshot.docs.forEach((doc) => {
      listaAcademia.push({ ...doc.data(), id: doc.id })
    })
  }
  return () => (existe = false)
})

const HomePage = ({ navigation }) => {
  const [utilizador, setUtilizador] = useState("null")

  const [imageCodigo, setImageCodigo] = useState()
  const [empresaURL, setEmpresaURL] = useState()
  const [academia, setAcademia] = useState("")

  const imageData = `${imageCodigo}`

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

  useEffect(() => {
    for (let i = 0; i < listaAcademia.length; i++) {
      if (listaAcademia[i].codigo == utilizador.codigoAcademia) {
        setAcademia(listaAcademia[i])
      }
    }
    setEmpresaURL(academia.website)
    setImageCodigo(academia.foto)
  })

  return (
    <SafeAreaView style={{ backgroundColor: "#1A649F", flex: 1 }}>
      <ScrollView
        style={{ flex: 1, marginBottom: 45, backgroundColor: "#F2F3F5" }}
      >
        <View
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 20,
            height: 125,
          }}
        >
          <View
            style={{
              width: "120%",
              transform: [{ rotateZ: "-15deg" }],
              height: "120%",
              left: "-10%",
              top: "-70%",
              backgroundColor: "#1A649F",
              shadowColor: "#000",
              shadowOffset: {
                width: 5,
                height: 8,
              },
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
              elevation: 40,
            }}
          ></View>
          <View
            style={{
              width: "100%",
              position: "absolute",
              top: "24%",
            }}
          >
            <Image
              style={{
                width: 85,
                height: 85,
                alignSelf: "center",
              }}
              source={require("../Login/unlimitedLogo.png")}
            />
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
              transform: [{ rotateZ: "-12deg" }],
              left: "-10%",
              height: "60%",
              top: "15%",
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
                transform: [{ rotateZ: "12deg" }],
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
              height: "60%",
              left: "-15%",
              top: "-5%",
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
                left: "12%",
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
            marginBottom: 10,
            height: 150,
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              padding: 10,
              fontWeight: 600,
              fontSize: 14,
              color: "#174162",
            }}
          >
            Powered By:{" "}
          </Text>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Text
              style={{ fontSize: 18, fontWeight: 500, color: "#174162" }}
              onPress={() => Linking.openURL(empresaURL)}
            >
              {academia.empresa}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage
