import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ImageBackground,
  Touchable,
} from "react-native"
import React, { useState, useEffect } from "react"
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth"
import { initializeApp } from "firebase/app"
import firebase from "../../Config/firebase"
import styles from "./LoginStyle"
import TabsStack from "../../Navigator/TabsStack"

const Login = ({ navigation }) => {
  //Firebase

  //Constantes
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorLogin, setErrorLogin] = useState(false)

  //Funções
  const loginFirebase = (email, password) => {
    const auth = getAuth()
    .signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setErrorLogin(false)
        const user = userCredential.user
        if (user.emailVerified) navigation.navigate(TabsStack, "HomePageTab")
        else Alert("Erro")
        return
      })
      .catch((error) => {
        setErrorLogin(true)
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  useEffect(() => {
    //verificar se tem login feito
    let mounted = true
    if (mounted) {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid
          if (user.emailVerified) navigation.navigate("HomePage")
          else navigation.navigate("Registo")
          console.log("User signed in login")
        } else {
          console.log("User signed out login")
        }
      })
    }
    return () => (mounted = false)
  }, [])

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <>
        {/* Imagem de fundo */}
        <ImageBackground
          source={require("../Login/ULTeam.png")}
          resizeMode="cover"
          style={styles.imageBackground}
        ></ImageBackground>

        {/* Logo principal */}
        <Image
          style={styles.imageLogo}
          source={require("../Login/unlimitedLogo.png")}
        />

        {/* Inserir Email */}
        <TextInput
          keyboardType="email-address"
          placeholderTextColor="white"
          placeholder="Introduzir Email"
          autoCapitalize="none"
          type="text"
          onChangeText={(email) => setEmail(email)}
          value={email}
          style={styles.emailInput}
        ></TextInput>

        {/* Inserir Password */}
        <TextInput
          placeholderTextColor="white"
          placeholder="Introduzir Password"
          type="text"
          onChangeText={(password) => setPassword(password)}
          value={password}
          style={styles.passwordInput}
        ></TextInput>

        {/* Recuperar Password */}
        <View style={styles.recuperarPasswordView}>
          <TouchableOpacity
            style={styles.recuperarPasswordButton}
            onPress={() => navigation.navigate("RecuperarPassword")}
          >
            <Text style={styles.recuperarPasswordText}>Recuperar Password</Text>
          </TouchableOpacity>
        </View>

        {/* Caso falhe o login */}
        {errorLogin === true ? (
          <Text>Email ou password incorretos</Text>
        ) : (
          <View />
        )}

        {/* Caso os campos estejam vazios */}
        {email === "" || password === "" ? (
          <View style={styles.loginView}>
            <TouchableOpacity disabled={true} style={styles.loginButtonDisable}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.loginView}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => loginFirebase(email, password)}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Butão para Registar novo utilizador */}
        <View style={styles.registarView}>
          <TouchableOpacity
            style={styles.registarButton}
            onPress={() => navigation.navigate("Registo")}
          >
            <Text style={styles.registarText}>Registar</Text>
          </TouchableOpacity>
        </View>
      </>
    </TouchableWithoutFeedback>
  )
}

export default Login
