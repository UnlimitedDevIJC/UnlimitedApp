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
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore"
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth"
import { auth } from "../../Config/firebase"
import { firebase } from "../../Config/firebase"
import React, { useState, useEffect } from "react"
import styles from "./RegistoStyle"
import { FontAwesome5 } from "@expo/vector-icons"
import TabsStack from "../../Navigator/TabsStack"

const Registo = ({ navigation }) => {
  //Firebase
  const db = getFirestore()

  //Constantes
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState("")
  const [telemovel, setTelemovel] = useState("")
  const [universidade, setUniversidade] = useState("")
  const [anoEscolar, setAnoEscolar] = useState("")
  const [pontos, setPontos] = useState("")
  const [linkedIn, setLinkedIn] = useState("")
  const [curriculo, setCurriculo] = useState("")

  //Variaveis
  let listaUniversidades = []

  //Funções

  // Criar Utilizador - Chave primária "Email"
  function adicionarUtilizador() {
    const ref = collection(db, "Utilizador")
    let existe = false
    getDocs(ref)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id == email) {
            existe = true
            Alert.alert("Esse email já foi utilizado!")
          }
        })
      })
      .then(() => {
        if (existe == false) {
          setDoc(doc(db, "Utilizador", email), {
            nome: nome,
            telemovel: telemovel,
            universidade: universidade,
            anoEscolar: anoEscolar,
            pontos: pontos,
            linkedIn: linkedIn,
            curriculo: curriculo,
          })
        }
      })
  }

  // Regista na Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate(TabsStack, "HomePageTab")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        adicionarUtilizador()
        navigation.navigate("Login")
        Alert.alert("Inicia sessão para entrares na tua conta")
        console.log("Registered with:", user.email)
      })
      .catch((error) => alert(error.message))
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
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
                autoCapitalize="none"
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
            <TouchableOpacity style={styles.registarBtn} onPress={handleSignUp}>
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
