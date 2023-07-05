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
  updateDoc,
  addDoc,
  deleteDocs,
  getDoc,
  doc,
  QuerySnapshot,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import styles from "./EditarPerfilStyle"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import React, { useEffect, useState, useSyncExternalStore } from "react"
import PerfilStack from "../../Navigator/PerfilStack"
import * as ImagePicker from "expo-image-picker"
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage"

const EditarPerfil = ({ navigation }) => {
  const [utilizador, setUtilizador] = useState("null")
  const [user, setUser] = useState()
  const db = getFirestore()

  let utilizadorRef = null
  useEffect(() => {
    //verificar se tem login feito
    let isMounted = true
    if (isMounted) {
      const auth = getAuth()
      onAuthStateChanged(auth, (user1) => {
        if (user1) {
          utilizadorRef = doc(db, "Utilizador", user1.email)
          setUser(user1)
          onSnapshot(utilizadorRef, { includeMetadataChanges: true }, (doc) => {
            if (doc.exists()) {
              setUtilizador(doc.data())
            } else {
            }
          })
        } else {
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [])

  const storage = getStorage()
  const storageRef = ref(storage, "imagens/" + utilizador.email)

  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(null)
  const [image2, setImage2] = useState(null)

  // const getImage = async () => {
  //   getDownloadURL(ref(storage, "imagens/" + utilizador.email))
  //     .then((url) => {
  //       // `url` is the download URL for 'images/stars.jpg'
  //       setImage2(url)
  //       console.log(url)
  //       // This can be downloaded directly:
  //       const xhr = new XMLHttpRequest()
  //       xhr.responseType = "blob"
  //       xhr.onload = (event) => {
  //         const blob = xhr.response
  //       }
  //       xhr.open("GET", url)
  //       xhr.send()

  //       // Or inserted into an <img> element
  //       const img = document.getElementById("myimg")
  //       img.setAttribute("src", url)
  //     })
  //     .catch((error) => {
  //       // Handle any errors
  //     })
  // }

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      })

      console.log("Aqui")
      console.log(result)
      // const selectedAsset = result.assets[0]

      const source = {
        uri: result.uri,
        width: result.width,
        height: result.height,
        type: result.type,
        fileSize: result.fileSize,
      }

      console.log(source)
      setImage(source)
      console.log(storageRef)
    } catch (error) {
      console.log("Error occurred during image selection:", error)
    }
  }

  const uploadImage = async () => {
    setUploading(true)
    const response = await fetch(image.uri)
    const blob = await response.blob()
    var ref = uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!")
    })

    try {
      await ref
    } catch (e) {
      console.log(e)
    }

    setUploading(false)

    Alert.alert("Photo Uploaded!")
    setImage(null)
  }

  const handleUpdate = async () => {
    utilizadorRef = doc(db, "Utilizador", user.email)
    updateDoc(utilizadorRef, {
      nome: utilizador.nome,
      email: utilizador.email,
      telemovel: utilizador.telemovel,
      universidade: utilizador.universidade,
      anoEscolar: utilizador.anoEscolar,
      curriculo: utilizador.curriculo,
      linkedIn: utilizador.linkedIn,
    }).then(() => {
      navigation.navigate("Perfil")
    })

    uploadImage()
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

            <View style={styles.perfilContainer}>
              <TouchableOpacity style={styles.editFotoBtn} onPress={pickImage}>
                {image && (
                  <Image
                    style={styles.perfilImage}
                    source={{ uri: image.uri }}
                  />
                )}
                <View style={styles.editFoto} />
                <FontAwesome5 name="pen" style={styles.editFotoIcon} />
              </TouchableOpacity>
              <View style={styles.perfilDataContainer}>
                <TextInput
                  style={styles.perfilNomeContainer}
                  onChangeText={(text) =>
                    setUtilizador({ ...utilizador, nome: text })
                  }
                >
                  <Text style={styles.perfilNome}>
                    {utilizador ? utilizador.nome : ""}
                  </Text>
                </TextInput>
                <TextInput
                  style={styles.perfilDetalhesContainer}
                  onChangeText={(text) =>
                    setUtilizador({ ...utilizador, telemovel: text })
                  }
                >
                  <Text style={styles.perfilDetalhes}>
                    {utilizador ? utilizador.telemovel : ""}
                  </Text>
                </TextInput>
                <TextInput
                  style={styles.perfilDetalhesContainer}
                  onChangeText={(text) =>
                    setUtilizador({ ...utilizador, universidade: text })
                  }
                >
                  <Text style={styles.perfilDetalhes}>
                    {utilizador ? utilizador.universidade : ""}
                  </Text>
                </TextInput>
                <TextInput
                  style={styles.perfilDetalhesContainer}
                  onChangeText={(text) =>
                    setUtilizador({ ...utilizador, anoEscolar: text })
                  }
                >
                  <Text style={styles.perfilDetalhes}>
                    {utilizador ? utilizador.anoEscolar : ""}
                  </Text>
                </TextInput>
                <TextInput
                  style={styles.perfilDetalhesContainer}
                  onChangeText={(text) =>
                    setUtilizador({ ...utilizador, curriculo: text })
                  }
                  placeholder="Insere o teu LinkedIn"
                >
                  <Text style={styles.perfilDetalhes}>
                    {utilizador ? utilizador.curriculo : ""}
                  </Text>
                </TextInput>
                <TextInput
                  style={styles.perfilDetalhesContainer}
                  onChangeText={(text) =>
                    setUtilizador({ ...utilizador, linkedIn: text })
                  }
                  placeholder="Insere o teu LinkedIn"
                >
                  <Text style={styles.perfilDetalhes}>
                    {utilizador ? utilizador.linkedIn : ""}
                  </Text>
                </TextInput>
                <TouchableOpacity
                  style={styles.guardarBtn}
                  onPress={() => handleUpdate()}
                >
                  <Text style={styles.guardarTexto}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditarPerfil
