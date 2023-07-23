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

const db = getFirestore()
const universidadeRef = collection(db, "Universidade")

let listaUniversidadesData = []
let listaUniversidades = []

onSnapshot(universidadeRef, (snapshot) => {
  let existe = true
  if (existe) {
    snapshot.docs.forEach((doc) => {
      listaUniversidadesData.push({ ...doc.data(), id: doc.id })
    })
    listaUniversidades = listaUniversidadesData.map((item) => item.nome)
  }
  return () => (existe = false)
})

const Registo = ({ navigation }) => {
  //Firebase

  //Constantes
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState("")
  const [telemovel, setTelemovel] = useState("")
  const [universidade, setUniversidade] = useState("")
  const [anoEscolar, setAnoEscolar] = useState("")
  const [pontos, setPontos] = useState(0)
  const [linkedIn, setLinkedIn] = useState("")
  const [curriculo, setCurriculo] = useState("")
<<<<<<< HEAD
  const [errorRegisterPassword, setErrorRegisterPassword] = useState(true)
  const [verPalavraPasse, setVerPalavraPasse] = useState(true)
  const [verCheckPalavraPasse, setVerCheckPalavraPasse] = useState(true)
  const [codigo, setCodigo] = useState("")
  const [paginaRegister, setPaginaRegister] = useState(1)

  //Variaveis
  let anos = ["1", "2", "3", "4", "5"]
=======

  //Variaveis
  let listaUniversidades = []
>>>>>>> parent of 9a3850d (update)

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
            email: email,
            telemovel: telemovel,
            universidade: universidade,
            anoEscolar: anoEscolar,
            pontos: pontos,
            linkedIn: linkedIn,
            curriculo: curriculo,
<<<<<<< HEAD
            codigoAcademia: codigo,
=======
>>>>>>> parent of 9a3850d (update)
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

  function verificarCredenciais() {
    if (password.length < 6) {
      setErrorRegisterPassword(true)
      Alert.alert("A password não tem caracteres suficientes!")
      setPaginaRegister(1)
    } else if (checkPassword !== password) {
      setErrorRegisterPassword(true)
      Alert.alert("As palavra-passes não coincidem!")
      setPaginaRegister(1)
    } else {
      setErrorRegisterPassword(false)
    }

    if (telemovel.length < 9) {
      setErrorRegisterPassword(true)
      Alert.alert("O número de telemóvel não tem números suficientes!")
      setPaginaRegister(1)
    } else {
      setErrorRegisterPassword(false)
    }

    if (errorRegisterPassword == false) {
      setPaginaRegister(2)
    }
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

<<<<<<< HEAD
                {/* Instituicao de ensino */}
                <View style={styles.escolaView}>
                  <FontAwesome5 style={styles.escolaIcon} name="school" />
                  <SelectDropdown
                    dropdownStyle={{
                      width: "40%",
                      borderRadius: 5,
                    }}
                    buttonStyle={{
                      width: "85%",
                      height: "100%",
                      backgroundColor: "transparent",
                      textAlign: "left",
                    }}
                    defaultButtonText={"Universidade"}
                    buttonTextStyle={{
                      color: "white",
                      fontSize: 18,
                      textAlign: "left",
                      margin: 0,
                      padding: 0,
                      position: "absolute",
                      right: 0,
                    }}
                    data={listaUniversidades}
                    onSelect={(selectedItem, index) => {
                      setUniversidade(selectedItem)
                    }}
                  />
                </View>
=======
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
>>>>>>> parent of 9a3850d (update)

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

<<<<<<< HEAD
                {/* Registar */}
                {email === "" ||
                telemovel === "" ||
                nome === "" ||
                password === "" ||
                checkPassword === "" ||
                universidade === "" ||
                anoEscolar === "" ? (
                  <TouchableOpacity
                    disabled={true}
                    style={styles.registarBtnDisable}
                    onPress={() => verificarCredenciais()}
                  >
                    <Text style={styles.registarText}>Continuar</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.registarBtn}
                    onPress={() => verificarCredenciais()}
                  >
                    <Text style={styles.registarText}>Continuar</Text>
                  </TouchableOpacity>
                )}
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
              </View>
            ) : (
              <View style={{ top: 200 }}>
                <TextInput
                  keyboardType="text"
                  placeholderTextColor="#174162"
                  placeholder="Colocar Código"
                  autoCapitalize="none"
                  type="text"
                  onChangeText={(codigo) => setCodigo(codigo)}
                  value={codigo}
                  style={styles.codigoInput}
                ></TextInput>

                {/* Butão para Registar novo utilizador */}
                <View style={styles.registarView}>
                  <TouchableOpacity
                    style={styles.registarButton}
                    onPress={() => handleSignUp()}
                  >
                    <Text style={styles.registarText}>Entrar</Text>
                  </TouchableOpacity>
                </View>
                {/* Retornar a login */}
                <TouchableOpacity
                  style={styles.returnLoginBtnCodigo}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.returnLoginText}>
                    Já tens uma conta?{" "}
                    <Text style={{ color: "#16508D" }}>Inicia Sessão</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}
=======
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
>>>>>>> parent of 9a3850d (update)
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Registo
