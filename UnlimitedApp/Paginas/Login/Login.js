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
  ScrollView,
  StatusBar,
} from "react-native"
import React, { useState, useEffect, useRef } from "react"
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth"
import { auth } from "../../Config/firebase"
import { initializeApp } from "firebase/app"
import firebase from "../../Config/firebase"
import styles from "./LoginStyle"
import TabsStack from "../../Navigator/TabsStack"
import { FontAwesome5 } from "@expo/vector-icons"

const Login = ({ navigation }) => {
  //Firebase

  //Constantes
  const [email, setEmail] = useState("")
  const emailRef = useRef(null)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  const [errorLogin, setErrorLogin] = useState(false)
  const [verPalavraPasse, setVerPalavraPasse] = useState(true)

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
          if (user.emailVerified) {
            navigation.navigate(TabsStack, "HomePageTab")
          } else navigation.navigate("Registo")
        } else {
          // console.log("User signed out login")
        }
      })
    }
    return () => (mounted = false)
  }, [])

  const focusNextInput = (nextInputRef) => {
    nextInputRef.current.focus()
  }

  return (
    <>
    <View
        style={{
          backgroundColor: "#1A649F",
          height: Platform.OS === "ios" ? 40 : StatusBar.currentHeight,
        }}
      >
        <StatusBar
          translucent
          backgroundColor="#1A649F"
          barStyle="light-content"
        />
      </View>
    <ScrollView style={styles.scrollView} bounces={false}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        <>
          <View
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 20,
              height: 125,
            }}
          >
            <View
              style={{
                width: "150%",
                transform: [{ rotateZ: "-15deg" }],
                height: "320%",
                left: "-18%",
                top: "-100%",
                backgroundColor: "#1A649F",
              }}
            ></View>
            <View
              style={{
                width: "100%",
                top: "-180%",
                left: "22%",
              }}
            >
              <Image
                style={styles.imageLogo}
                source={require("../Login/unlimitedLogo.png")}
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 20,
              height: 600,
            }}
          >
            {/* Inserir Email */}
            <TextInput
              keyboardType="email-address"
              placeholderTextColor="#174162"
              placeholder="Email"
              autoCapitalize="none"
              type="text"
              returnKeyType="next"
              onSubmitEditing={() => focusNextInput(passwordRef)}
              ref={emailRef}
              onChangeText={(email) => setEmail(email)}
              value={email}
              style={styles.emailInput}
            ></TextInput>

            {/* Inserir Password */}
            <TextInput
              placeholderTextColor="#174162"
              placeholder="Password"
              type="text"
              returnKeyType="done"
              ref={passwordRef}
              onChangeText={(password) => setPassword(password)}
              value={password}
              style={styles.passwordInput}
              secureTextEntry={verPalavraPasse}
            ></TextInput>
            <TouchableOpacity style={styles.verPassBtn}>
              {verPalavraPasse ? (
                <FontAwesome5
                  name="eye"
                  onPress={() => setVerPalavraPasse(false)}
                  color={"#174162"}
                  size={18}
                />
              ) : (
                <FontAwesome5
                  name="eye-slash"
                  onPress={() => setVerPalavraPasse(true)}
                  color={"red"}
                  size={18}
                />
              )}
            </TouchableOpacity>

            {/* Recuperar Password */}
            <View style={styles.recuperarPasswordView}>
              <TouchableOpacity
                style={styles.recuperarPasswordButton}
                onPress={() => navigation.navigate("RecuperarPassword")}
              >
                <Text style={styles.recuperarPasswordText}>
                  Recuperar Palavra-Passe
                </Text>
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
                <TouchableOpacity disabled={true} style={styles.loginButton}>
                  <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.loginView}>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => loginFirebase(email, password)}
                >
                  <Text style={styles.loginText}>Entrar</Text>
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
          </View>
        </>
      </TouchableWithoutFeedback>
    </ScrollView>
    </>
  )
}

export default Login
