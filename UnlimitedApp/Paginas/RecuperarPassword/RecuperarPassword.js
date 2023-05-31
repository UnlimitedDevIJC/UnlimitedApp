import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native"
import React, { useState } from "react"
import styles from "./RecuperarPasswordStyle"
import { FontAwesome5 } from "@expo/vector-icons"

const RecuperarPassword = ({ navigation }) => {
  //Constantes
  const [email, setEmail] = useState("")

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
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
            <View style={styles.tituloView}>
              <Text style={styles.alterarTitulo}>Alterar Palavra-Passe</Text>
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
            {/* Registar */}
            <TouchableOpacity
              style={styles.enviarEmailBtn}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.enviarEmailText}>Enviar Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.returnLoginBtn}
              onPress={() => navigation.navigate("Login")}
            >
              <FontAwesome5 style={styles.returnArrowLeft} name="arrow-left"/>
              <Text style={styles.returnLoginText}>
                Voltar ao Iniciar Sessão
              </Text>
            </TouchableOpacity>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RecuperarPassword
