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
import { getAuth, onAuthStateChanged } from "firebase/auth"
import React, { useState, useEffect } from "react"
import styles from "./DetalheEventosStyle"

const DetalheEventos = ({ route }) => {
  const db = getFirestore()
  const ref = collection(db, "EventoUtilizador")

  const [utilizador, setUtilizador] = useState("null")
  const [inscrito, setInscrito] = useState(false)

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
          // console.log("User is signed out home")
        }
      })
    }
    return () => {
      isMounted = false
    }
  })

  let listaEventoUtilizador = []

  onSnapshot(ref, (snapshot) => {
    let mounted = true
    if (mounted) {
      listaEventoUtilizador = []
      snapshot.docs.forEach((doc) => {
        listaEventoUtilizador.push({ ...doc.data(), id: doc.id })
      })

      for (let i = 0; i < listaEventoUtilizador.length; i++) {
        if (
          listaEventoUtilizador[i].idEvento == route.params.item.id &&
          listaEventoUtilizador[i].utilizador == utilizador.email
        ) {
          setInscrito(true)
        }
      }
    }
    return () => (mounted = false)
  })

  function inscrever() {
    getDocs(ref).then(() => {
      if (inscrito == false) {
        setDoc(doc(db, "EventoUtilizador", route.params.item.id), {
          idEvento: route.params.item.id,
          utilizador: utilizador.email,
        })
      }
    })

    // getDocs(ref)
    //   .then((snapshot) => {
    //     snapshot.docs.forEach((doc) => {
    //       if (doc.id == route.params.item.id) {
    //         inscrito = true
    //         Alert.alert("Já estás inscrito neste evento")
    //       }
    //     })
    //   })
    //   .then(() => {
    //     if (inscrito == false) {
    //       setDoc(doc(db, "EventoUtilizador", email), {
    //         nome: nome,
    //         telemovel: telemovel,
    //         universidade: universidade,
    //         anoEscolar: anoEscolar,
    //         pontos: pontos,
    //         linkedIn: linkedIn,
    //         curriculo: curriculo,
    //         codigo: codigo,
    //       })
    //     }
    //   })
  }

  // function inscrever() {
  //   const ref = collection(db, "EventoUtilizador")
  //   let existe = false
  //   getDocs(ref)
  //     .then((snapshot) => {
  //       snapshot.docs.forEach((doc) => {
  //         console.log(doc.idEvento)
  //         if (
  //           doc.idEvento == route.params.item.id &&
  //           doc.utilizador == utilizador.email
  //         ) {
  //           existe = true
  //         }
  //       })
  //     })
  //     .then(() => {
  //       if (existe == false) {
  //         setDoc(doc(db, "EventoUtilizador"), {
  //           idEvento: route.params.item.id,
  //           utilizador: utilizador.email,
  //         })
  //       }
  //     })

  // }

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

            <View style={styles.eventoLogo}></View>

            <View style={styles.detalhesEvento}>
              <View style={styles.eventoTituloBox}>
                <Text style={styles.eventoTitulo}>
                  {route.params.item.codigo}
                </Text>
              </View>
              <View style={styles.descricaoEventoBox}>
                <Text style={styles.descricao}>
                  Descrição:{" "}
                  <Text style={styles.descricaoEvento}>
                    {route.params.item.descricao}
                  </Text>
                </Text>
              </View>
              <View style={styles.inscreverBotaoBox}>
                <TouchableOpacity
                  onPress={() => inscrever()}
                  style={styles.inscreverBotao}
                >
                  <Text style={styles.inscreverText}>Inscrever</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inscreverBotaoBox}>
                <TouchableOpacity style={styles.inscreverBotao}>
                  <Text style={styles.inscreverText}>Ler Qr Code</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetalheEventos
