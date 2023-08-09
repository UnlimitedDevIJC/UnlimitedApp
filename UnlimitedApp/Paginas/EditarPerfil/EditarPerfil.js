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
  deleteDoc,
  addDoc,
  deleteDocs,
  getDoc,
  doc,
  QuerySnapshot,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth"
import styles from "./EditarPerfilStyle"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import React, { useEffect, useState, useSyncExternalStore } from "react"
import * as ImagePicker from "expo-image-picker"
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage"
import * as DocumentPicker from "expo-document-picker"

const EditarPerfil = ({ navigation }) => {
  const [utilizador, setUtilizador] = useState("null")
  const [user, setUser] = useState()
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(null)
  const [document, setDocument] = useState(null)
  const [file, setFile] = useState(null)
  const db = getFirestore()
  const storage = getStorage()
  const storageRef = ref(storage, "imagens/" + utilizador.email)
  const cvsStorageRef = ref(storage, "cvs/" + utilizador.email)

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
    uploadDocument()
  }

  const handleDelete = async () => {
    const auth = getAuth()
    const userToDelete = auth.currentUser

    try {
      user.delete()

      deleteUser(userToDelete).then(() => {
        utilizadorRef = doc(db, "Utilizador", user.email)
        deleteDoc(utilizadorRef)
      })

      navigation.navigate("Login")
    } catch (error) {
      console.error("Error deleting user and document:", error)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    })

    const source = { uri: result.assets[0].uri }
    console.log(source)
    setImage(source)
    console.log(storageRef)
  }

  const uploadImage = async () => {
    setUploading(true)
    const response = await fetch(image.uri)
    const blob = await response.blob()
    var ref = uploadBytes(storageRef, blob).then((snapshot) => {})
    try {
      await ref
    } catch (e) {
      console.log(e)
    }

    setUploading(false)

    Alert.alert("Photo Uploaded!")
    setImage(null)
  }

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({})
    if (result != null) {
      setDocument(result.uri)
    }
  }

  const uploadDocument = async () => {
    setUploading(true)
    const response = await fetch(document)
    const blob = await response.blob()
    var ref = uploadBytes(cvsStorageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!")
    })
    try {
      await ref
    } catch (e) {
      console.log(e)
    }

    setUploading(false)

    Alert.alert("Photo Uploaded!")
    setFile(null)
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
                <TouchableOpacity
                  style={styles.perfilDetalhesContainer}
                  onPress={pickDocument}
                >
                  {document && (
                    <Text style={styles.perfilDetalhes}>{document}</Text>
                  )}
                </TouchableOpacity>
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
                <TouchableOpacity
                  style={styles.guardarBtn}
                  onPress={() => handleDelete()}
                >
                  <Text style={styles.guardarTexto}>Apagar Conta</Text>
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
