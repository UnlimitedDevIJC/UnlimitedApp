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
import { auth } from '../../Config/firebase'
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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        navigation.navigate(TabsStack, "HomePageTab")
      })
      .catch((error) => alert(error.message))
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
        } else {
          // console.log("User signed out login")
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
        {/* Logo principal */}
        <Image
          style={styles.imageLogo}
          source={require("../Login/unlimitedLogo.png")}
        />

        {/* Inserir Email */}
        <TextInput
          keyboardType="email-address"
          placeholderTextColor="#174162"
          placeholder="Introduzir Email"
          autoCapitalize="none"
          type="text"
          onChangeText={(email) => setEmail(email)}
          value={email}
          style={styles.emailInput}
        ></TextInput>

        {/* Inserir Password */}
        <TextInput
          placeholderTextColor="#174162"
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
