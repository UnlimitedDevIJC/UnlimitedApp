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
              <TouchableOpacity style={styles.editFotoBtn}>
                <Image
                  style={styles.perfilImage}
                  source={require("../Perfil/foto.jpeg")}
                />
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
                  placeholder="Insere o teu Curriculo"
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
