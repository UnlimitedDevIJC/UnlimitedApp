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
  getDoc,
  doc,
  QuerySnapshot,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import styles from "./EditarPerfilStyle"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"

const EditarPerfil = ({ navigation }) => {
  const [utilizador, setUtilizador] = useState("null")
  const db = getFirestore()

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
          console.log("User is signed out home")
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [])

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
                <TextInput style={styles.perfilNomeContainer}>
                  <Text style={styles.perfilNome}>{utilizador.nome}</Text>
                </TextInput>
                <TextInput style={styles.perfilDetalhesContainer}>
                  <Text style={styles.perfilDetalhes}>E-mail</Text>
                </TextInput>
                <TextInput style={styles.perfilDetalhesContainer}>
                  <Text style={styles.perfilDetalhes}>
                    {utilizador.telemovel}
                  </Text>
                </TextInput>
                <TextInput style={styles.perfilDetalhesContainer}>
                  <Text style={styles.perfilDetalhes}>
                    {utilizador.universidade}
                  </Text>
                </TextInput>
                <TextInput style={styles.perfilDetalhesContainer}>
                  <Text style={styles.perfilDetalhes}>
                    {utilizador.anoEscolar}
                  </Text>
                </TextInput>
                <TextInput style={styles.perfilDetalhesContainer}>
                  <Text style={styles.perfilDetalhes}>Currículo</Text>
                </TextInput>
                <TextInput style={styles.perfilDetalhesContainer}>
                  <Text style={styles.perfilDetalhes}>LinkedIn</Text>
                </TextInput>
                <TouchableOpacity style={styles.guardarBtn}>
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
