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
<<<<<<< HEAD
const academiaRef = collection(db, "Academia")
=======
>>>>>>> parent of 9a3850d (update)

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

<<<<<<< HEAD
<<<<<<< HEAD
onSnapshot(palavraChaveRef, (snapshot) => {
  let existe = true
  if (existe) {
    snapshot.docs.forEach((doc) => {
      listaPalavrasChave.push({ ...doc.data(), id: doc.id })
    })
  }
  return () => (existe = false)
})

=======
>>>>>>> parent of a24221d (update)
const Agenda = ({ navigation }) => {
  const [filtro, setFiltro] = useState("") // Barra de pesquisa
  const [utilizador, setUtilizador] = useState("null")
  const [academia, setAcademia] = useState("")
  const [value, setValue] = useState("")

  const [utilizadorCodigo, setUtilizadorCodigo] = useState("")

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

  onSnapshot(colRef, (snapshot) => {
    let mounted = true
    if (mounted) {
      listaEventos = []
      snapshot.docs.forEach((doc) => {
        listaEventos.push({ ...doc.data(), id: doc.id })
      })
      filtros = [...new Set(listaEventos.map((item) => item.palavrasChave))]
      filtros.unshift("Todos") //Vai buscar os valores das areas sem estarem repetidos e acrescenta "Todos" ao inicio
    }
    return () => (mounted = false)
  })

  useEffect(() => {
    const data = onSnapshot(colRef, (snapshot) => {
      let mounted = true
      if (mounted) {
        listaEventosFiltrada = listaEventos.filter((item) => {
          return (
            item.academiaCodigo == utilizador.codigoAcademia &&
            item.anoEscolar <= utilizador.anoEscolar
          )
        })
      }
      return () => (mounted = false)
    })

    return () => data()
  })

  function _renderItem(item) {
    return (
      <ItemLista
        item={item.item}
        utilizador={utilizador}
        navigation={navigation}
      />
    )
  }

  function alterarAcademias() {
    for (let i = 0; i < listaAcademia.length; i++) {
      if (listaAcademia[i].codigo == utilizador.codigoAcademia) {
        setAcademia(listaAcademia[i])
      }
    }
  }

  function alterarFiltro(item) {
    alterarAcademias()
    setValue(item)
    if (item == "Todos") {
      listaEventosFiltrada = listaEventos.filter((evento) => {
        return (
          evento.academiaCodigo == utilizador.codigoAcademia &&
          evento.academiaCodigo == academia.codigo &&
          evento.anoEscolar <= utilizador.anoEscolar
        )
      })
    } else {
      listaEventosFiltrada = listaEventos.filter((evento) => {
        return (
          evento.academiaCodigo == utilizador.codigoAcademia &&
          evento.academiaCodigo == academia.codigo &&
          evento.palavrasChave == item &&
          evento.anoEscolar <= utilizador.anoEscolar
        )
      })
    }
  }

  function alterarFiltroManual(text) {
    let listaEventosFiltradaManual = listaEventosFiltrada
    setFiltro(text)
    if (text == "") {
      listaEventosFiltradaManual
    } else {
      listaEventosFiltrada = listaEventos.filter((item) => {
        return (
          String(item.tema.toLowerCase()).includes(text.toLowerCase()) &&
          item.anoEscolar <= utilizador.anoEscolar
        )
      })
    }
  }
=======
const Agenda = () => {
  const [filtro, setFiltro] = useState("")
>>>>>>> parent of 9a3850d (update)

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

<<<<<<< HEAD
          {/* Barra de Pesquisa e filtro / palavras-chave*/}
          <View style={styles.searchView}>
            <TextInput
              placeholder="Pesquisa..."
              type="text"
              onChangeText={(text) => alterarFiltroManual(text)}
              value={filtro}
              style={styles.searchInput}
            />
            <SelectDropdown
              data={filtros}
              onSelect={(selectedItem, index) => {
                alterarFiltro(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome5
                    name={"filter"}
                    color={"#444"}
                    style={styles.filterIcon}
                  />
                )
              }}
              defaultValue={"Todos"}
              defaultButtonText="Todos"
              dropdownIconPosition="left"
              rowTextStyle={{ fontWeight: "600" }}
              buttonStyle={{
                width: "20%",
                height: 40,
                backgroundColor: "transparent",
              }}
              dropdownStyle={{
                width: "40%",
                position: "absolute",
                left: "55%",
                borderRadius: 5,
              }}
            />
          </View>
          <FlatList
            data={listaEventosFiltrada}
            initialNumToRender={3}
            renderItem={(item) => _renderItem(item)}
            keyExtractor={(item) => {
              return item.id
            }}
          />
          <View style={{ zIndex: -1, height: 50, marginTop:10 }}></View>
        </>
      </TouchableWithoutFeedback>
=======
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
>>>>>>> parent of 9a3850d (update)
    </SafeAreaView>
  )
}

<<<<<<< HEAD
class ItemLista extends React.PureComponent {
  render() {
    return (
      <>
        <TouchableOpacity
          style={{ zIndex: 0 }}
          onPress={() =>
            this.props.navigation.navigate("DetalheEvento", {
              item: this.props.item,
            })
          }
        >
          <View style={styles.cardView}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardNome}>{this.props.item.tema}</Text>
              <Text style={styles.cardData}>Datas: {this.props.item.data}</Text>
            </View>
            <View style={styles.cardIconContainer}>
              <FontAwesome5 name={"plus-square"} style={styles.cardIcon} />
            </View>
          </View>
        </TouchableOpacity>
      </>
    )
  }
}

=======
>>>>>>> parent of 9a3850d (update)
export default Agenda
