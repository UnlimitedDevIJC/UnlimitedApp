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
import styles from "./AgendaStyle"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import { useState } from "react"
import SelectDropdown from "react-native-select-dropdown"

const db = getFirestore()
const colRef = collection(db, "Evento")

let listaEventos = []
let listaEventosFiltrada = []
let filtros = []

onSnapshot(colRef, (snapshot) => {
  let mounted = true
  if (mounted) {
    listaEventos = []
    snapshot.docs.forEach((doc) => {
      listaEventos.push({ ...doc.data(), id: doc.id })
    })
    listaEventos.sort((a, b) => {
      return a.inicio - b.inicio
    })
    // listaEventosFiltrada = listaEventos.filter((item) => {
    //   return item.hora_inicio.toDate().getDate() == 2
    // })
    filtros = [...new Set(listaEventos.map((item) => item.palavrasChave))]
    filtros.unshift("Todos") //Vai buscar os valores das areas sem estarem repetidos e acrescenta "Todos" ao inicio
  }
  return () => (mounted = false)
})

const Agenda = () => {
  const [filtro, setFiltro] = useState("")

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

            {/* Barra de Pesquisa e filtro / palavras-chave*/}
            <View style={styles.searchView}>
              <TextInput
                placeholder="Pesquisa..."
                type="text"
                onChangeText={(text) => alterarFiltro(text)}
                value={filtro}
                style={styles.searchInput}
              />
              {/* <TouchableOpacity>
                <FontAwesome5 name={"filter"} style={styles.filterIcon} />
              </TouchableOpacity> */}
              <SelectDropdown
                data={filtros}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  return item
                }}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome5 name={"filter"} color={"#444"} size={18} style={styles.filterIcon}/>
                  )
                }}
                defaultValue={"Todos"}
                defaultButtonText="Todos"
                dropdownIconPosition="left"
                rowTextStyle={{ fontWeight: "600" }}
                buttonStyle={{
                  borderRadius: 15,
                  width: "100%",
                  height: 40,
                  backgroundColor: "transparent",
                }}
                dropdownStyle={{ borderRadius: 15, width: "30%" }}
              />
            </View>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Agenda
