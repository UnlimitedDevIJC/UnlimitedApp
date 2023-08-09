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
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage"

const Perfil = ({ navigation }) => {
  const [utilizador, setUtilizador] = useState("null")
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(null)
  const [image2, setImage2] = useState(null)
  const [document, setDocument] = useState(null)
  const [isLogin, setIsLogin] = useState(false)

  const db = getFirestore()
  const storage = getStorage()

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
              setIsLogin(true)
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

  useEffect(() => {
    getImage()
    getDocument()
  }, [isLogin])

  async function getImage() {
    getDownloadURL(ref(storage, "imagens/" + utilizador.email))
      .then((url) => {
        setImage2(url)
        const xhr = new XMLHttpRequest()
        xhr.responseType = "blob"
        xhr.onload = (event) => {
          const blob = xhr.response
        }
        xhr.open("GET", url)
        xhr.send()

        const img = document.getElementById("myimg")
        img.setAttribute("src", url)
      })
      .catch((error) => {})
  }

  async function getDocument() {
    getDownloadURL(ref(storage, "cvs/" + utilizador.email))
      .then((url) => {
        setDocument(url)

        const xhr = new XMLHttpRequest()
        xhr.responseType = "blob"
        xhr.onload = (event) => {
          const blob = xhr.response
        }
        xhr.open("GET", url)
        xhr.send()

        // Or inserted into an <img> element
        const img = document.getElementById("myimg")
        img.setAttribute("src", url)
      })
      .catch((error) => {
        // Handle any errors
      })
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
                {image2 && (
                  <Image style={styles.perfilImage} source={{ uri: image2 }} />
                )}
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
                  {document && (
                    <Text style={styles.perfilDetalhes}>{document}</Text>
                  )}
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
