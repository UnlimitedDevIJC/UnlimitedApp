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
  Alert
} from "react-native"
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDocs,
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore"
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth"
import { firebase, initializeApp } from "firebase/app"
import firebaseConfig from "../../Config/firebase"
import React, { useState } from "react"
import styles from "./RegistoStyle"
import { FontAwesome5 } from "@expo/vector-icons"

const Registo = ({ navigation }) => {
  //Firebase
  initializeApp(firebaseConfig)
  const db = getFirestore()
  const colRef = collection(db, "Universidade")

  //Constantes
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState("")
  const [telemovel, setTelemovel] = useState("")
  const [universidade, setUniversidade] = useState("")
  const [anoEscolar, setAnoEscolar] = useState("")
  const [errorRegister, setErrorRegister] = useState("")

  //Variaveis
  let listaUniversidades = []

  //Funções

  //Vai buscar a lista de universidades
  onSnapshot(colRef, (snapshot) => {
    let mounted = true
    if (mounted) {
      listaUniversidades = []
      snapshot.docs.forEach((doc) => {
        listaUniversidades.push({ ...doc.data(), id: doc.id })
      })
    }
    return () => (mounted = false)
  })

  //Criar Utilizador - Chave primária "Email"
  function adicionarUtilizador() {
    const ref = collection(db, "Utilizador")
    let existe = false
    getDocs(ref)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id == email) {
            existe = true
            Alert.alert(
              "Esse email já foi utilizado!"
            )
          }
        })
      })
      .then(() => {
        if (existe == false) {
          setDoc(doc(db, "Utilizador", email), {
            nome: nome,
            password: password,
            telemovel: telemovel,
            universidade: universidade,
            anoEscolar: anoEscolar,
          })
        }
      })
  }

  //Regista na Firebase
  const registerFirebase = async () => {
    let mounted = true
    if (mounted) {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setErrorRegister(false)
          sendEmailVerification(userCredential.user)
          Alert.alert(
            "Foi enviado um email de verificação para o email indicado! Verifica o lixo/spam"
          )
          navigation.navigate("Login")
        })
        .catch((error) => {
          setErrorRegister(true)
          const errorCode = error.code
          const errorMessage = error.message
        })
      adicionarUtilizador()
    }
    return () => (mounted = false)
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
            {/* Registar */}
            <Text style={styles.registarTitulo}>Registar</Text>
            {/* Nome */}
            <View style={styles.nomeView}>
              <FontAwesome5 style={styles.nomeIcon} name="user" />
              <TextInput
                style={styles.nomeInput}
                placeholderTextColor="white"
                placeholder="Nome"
                type="text"
                onChangeText={(text) => setNome(text)}
                value={nome}
              ></TextInput>
            </View>
            {/* Email */}
            <View style={styles.emailView}>
              <FontAwesome5 style={styles.emailIcon} name="envelope" />
              <TextInput
                style={styles.emailInput}
                placeholderTextColor="white"
                placeholder="Email"
                type="text"
                onChangeText={(text) => setEmail(text)}
                value={email}
              ></TextInput>
            </View>
            {/* Numero Telemovel */}
            <View style={styles.telemovelView}>
              <FontAwesome5 style={styles.telemovelIcon} name="mobile" />
              <TextInput
                style={styles.telemovelInput}
                placeholderTextColor="white"
                placeholder="Número de Telemóvel"
                type="text"
                onChangeText={(text) => setTelemovel(text)}
                value={telemovel}
              ></TextInput>
            </View>
            {/* Password */}
            <View style={styles.passwordView}>
              <FontAwesome5 style={styles.passwordIcon} name="lock" />
              <TextInput
                style={styles.passwordInput}
                placeholderTextColor="white"
                placeholder="Palavra-Passe"
                type="text"
                onChangeText={(text) => setPassword(text)}
                value={password}
              ></TextInput>
            </View>
            {/* Confirmar Password */}
            <View style={styles.checkpassView}>
              <FontAwesome5 style={styles.checkpassIcon} name="lock" />
              <TextInput
                style={styles.checkpassInput}
                placeholderTextColor="white"
                placeholder="Confirmar Palavra-Passe"
                type="text"
                onChangeText={(text) => setCheckPassword(text)}
                value={checkPassword}
              ></TextInput>
            </View>
            {/* Instituicao de ensino */}
            <View style={styles.escolaView}>
              <FontAwesome5 style={styles.escolaIcon} name="school" />
              <TextInput
                style={styles.escolaInput}
                placeholderTextColor="white"
                placeholder="Instituição de Ensino"
                type="text"
                onChangeText={(text) => setUniversidade(text)}
                value={universidade}
              ></TextInput>
            </View>
            {/* Ano de Escolaridade */}
            <View style={styles.anoescolaView}>
              <FontAwesome5
                style={styles.anoescolaIcon}
                name="graduation-cap"
              />
              <TextInput
                style={styles.anoescolaInput}
                placeholderTextColor="white"
                placeholder="Ano de Escolaridade"
                type="text"
                onChangeText={(text) => setAnoEscolar(text)}
                value={anoEscolar}
              ></TextInput>
            </View>
            {/* Registar */}
            <TouchableOpacity
              style={styles.registarBtn}
              onPress={() =>
                registerFirebase(
                  email,
                  password,
                  nome,
                  universidade,
                  anoEscolar,
                  telemovel
                )
              }
            >
              <Text style={styles.registarText}>Registar</Text>
            </TouchableOpacity>
            {/* Retornar a login */}
            <TouchableOpacity
              style={styles.returnLoginBtn}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.returnLoginText}>
                Já tens uma conta?{" "}
                <Text style={{ color: "#16508D" }}>Inicia Sessão</Text>
              </Text>
            </TouchableOpacity>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Registo
