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
import SelectDropdown from "react-native-select-dropdown"
import * as FileSystem from "expo-file-system"

let listaUniversidades = new Set()
let listaUniversidadesData = []
let anos = ["1", "2", "3", "4", "5"]
const db = getFirestore()
const universidadeRef = collection(db, "Universidade")

onSnapshot(universidadeRef, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    listaUniversidadesData.push({ ...doc.data(), id: doc.id })
  })

  listaUniversidadesData.forEach((item) => {
    listaUniversidades.add(item.nome)
  })

  listaUniversidades = Array.from(listaUniversidades)
})

const EditarPerfil = ({ navigation }) => {
  const [utilizador, setUtilizador] = useState("null")
  const [user, setUser] = useState()
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(null)
  const [document, setDocument] = useState(null)
  const [file, setFile] = useState(null)

  const storage = getStorage()
  const storageRef = ref(storage, "imagens/" + utilizador.email)
  const cvsStorageRef = ref(storage, "cvs/" + utilizador.email)

  let utilizadorRef = null
  useEffect(() => {
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
      curriculo: document,
      linkedIn: utilizador.linkedIn,
    }).then(() => {
      navigation.navigate("Perfil")
    })
    uploadImage()
    // uploadDocument()
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

  // const pickDocument = async () => {
  //   let result = await DocumentPicker.getDocumentAsync({})
  //   if (result != null) {
  //     setDocument(result.uri)
  //   }
  // }

  // const uploadDocument = async () => {
  //   setUploading(true)
  //   const response = await fetch(document)
  //   const blob = await response.blob()
  //   var ref = uploadBytes(cvsStorageRef, blob).then((snapshot) => {
  //     console.log("Uploaded a blob or file!")
  //   })
  //   try {
  //     await ref
  //   } catch (e) {
  //     console.log(e)
  //   }

  //   setUploading(false)

  //   Alert.alert("File Uploaded!")
  //   setFile(null)
  // }

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result.split(",")[1])
      }
      reader.onerror = (error) => {
        reject(error)
      }
      reader.readAsDataURL(blob)
    })
  }

  const pickAndUploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({})

      if (result) {
        const fileBlob = await fetch(result.uri).then((response) =>
          response.blob()
        )
        const base64Data = await blobToBase64(fileBlob)
        setDocument(base64Data)

        console.log("File uploaded successfully!")
      }
    } catch (error) {
      console.error("Error picking/uploading file:", error)
    }
  }

  const goBack = () => {
    navigation.goBack()
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
                  top: 50,
                  right: 15,
                  alignSelf: "flex-end",
                }}
                onPress={handleDelete}
              >
                <FontAwesome5
                  style={{
                    fontSize: 34,
                    color: "red",
                  }}
                  name="trash"
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: "100%",
                flex: 1,
                zIndex: 20,
                marginTop: 20,
              }}
            >
              <TouchableOpacity style={styles.editFotoBtn} onPress={pickImage}>
                {image && (
                  <Image
                    style={styles.perfilImage}
                    source={{ uri: image.uri }}
                  />
                )}
                <FontAwesome5 name="pen" style={styles.editFotoIcon} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                flex: 1,
                alignItems: "center",
                marginBottom: 50,
              }}
            >
              <View
                style={{
                  width: "80%",
                  flex: 1,
                  backgroundColor: "#ffffff",
                  alignItems: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 20,
                  top: -20,
                }}
              >
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
                <View style={styles.escolaView}>
                  <SelectDropdown
                    dropdownStyle={{
                      width: "50%",
                    }}
                    buttonStyle={{
                      width: "100%",
                      backgroundColor: "transparent",
                      textAlign: "center",
                    }}
                    defaultButtonText={
                      utilizador ? utilizador.universidade : "Universidade"
                    }
                    buttonTextStyle={{
                      fontSize: 18,
                      color: "black",
                      fontFamily: "Oswald-Regular",
                      textAlign: "center",
                    }}
                    data={listaUniversidades}
                    onSelect={(selectedItem, index) => {
                      setUtilizador({
                        ...utilizador,
                        universidade: selectedItem,
                      })
                    }}
                  />
                </View>
                <View style={styles.escolaView}>
                  <SelectDropdown
                    dropdownStyle={{
                      width: "50%",
                    }}
                    buttonStyle={{
                      width: "100%",
                      backgroundColor: "transparent",
                      textAlign: "center",
                    }}
                    defaultButtonText={
                      utilizador
                        ? utilizador.anoEscolar + "º Ano"
                        : "Ano Escolar"
                    }
                    buttonTextStyle={{
                      fontSize: 18,
                      color: "black",
                      fontFamily: "Oswald-Regular",
                      textAlign: "center",
                    }}
                    data={anos}
                    onSelect={(selectedItem, index) => {
                      setUtilizador({
                        ...utilizador,
                        anoEscolar: selectedItem,
                      })
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.perfilDetalhesContainer}
                  onPress={pickAndUploadFile}
                >
                  {document ? (
                    <Text style={styles.perfilDetalhes}>{document}</Text>
                  ) : (
                    <Text style={styles.perfilDetalhes}>Inserir Currículo</Text>
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
                  style={styles.perfilBtn}
                  onPress={() => navigation.navigate("Perfil")}
                >
                  <Text style={styles.guardarTexto}>Cancelar</Text>
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
