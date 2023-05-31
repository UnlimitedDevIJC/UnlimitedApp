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
  import React from "react"
  import styles from "./GamificationStyle"
  
  const HomePage = ({ navigation }) => {
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
            </>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default HomePage
  