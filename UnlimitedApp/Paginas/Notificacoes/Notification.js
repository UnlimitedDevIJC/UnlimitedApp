import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native"
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import React, { useState, useEffect } from "react"
import styles from "./NotificationStyle"
import { FontAwesome5 } from "@expo/vector-icons"
import NotificationItem from "./NotificationItem"

const db = getFirestore()
const notificationRef = collection(db, "Notificacoes")
const utilizadorUtilsRef = collection(db, "UtilizadorUtils")

let listaNotificacoes = [] //Todas as notificações
let listaNotificationIds = [] //Todos os Ids não repetido

const Notification = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(-1)
  const [utilizador, setUtilizador] = useState("null")
  const [utilizadorUtils, setUtilizadorUtils] = useState("null")
  const [userNotification, setUserNotification] = useState([])
  const [notificationIds, setNotificationIds] = useState([])
  const [notificacoesDeleted, setNotificacoesDeleted] = useState([])
  const [user, setUser] = useState()

  let utilizadorRef = null
  let utilizadorUtilsRef = null
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const auth = getAuth()
      onAuthStateChanged(auth, (user1) => {
        if (user1) {
          utilizadorRef = doc(db, "Utilizador", user1.email)
          utilizadorUtilsRef = doc(db, "UtilizadorUtils", user1.email)
          setUser(user1)
          onSnapshot(utilizadorRef, { includeMetadataChanges: true }, (doc) => {
            if (doc.exists()) {
              setUtilizador(doc.data())
            } else {
            }
          })
          onSnapshot(
            utilizadorUtilsRef,
            { includeMetadataChanges: true },
            (doc) => {
              if (doc.exists()) {
                setUtilizadorUtils(doc.data())
              } else {
              }
            }
          )
        } else {
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (utilizadorUtils) {
      const unsubscribe = onSnapshot(notificationRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data())
        const filteredNotifications = data.filter((item) => {
          return (
            (item.anos === "all" &&
              utilizadorUtils.notificacoesDelete &&
              !utilizadorUtils.notificacoesDelete.includes(item.id)) ||
            (item.anos === utilizador.anoEscolar &&
              utilizadorUtils.notificacoesDelete &&
              !utilizadorUtils.notificacoesDelete.includes(item.id))
          )
        })
        setUserNotification(filteredNotifications)

        userNotification.forEach((item) => {
          if (!utilizadorUtils.notificacoes.includes(item.id)) {
            const utilizadorUtilsRef = doc(db, "UtilizadorUtils", user.email)
            updateDoc(utilizadorUtilsRef, {
              notificacoes: arrayUnion(item.id),
            })
          }
        })
      })
      return () => unsubscribe()
    }
  })

  const handleNotificationPress = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index))
  }

  const handleDeleteNotification = (index) => {
    let userNotificationsDeleted = []

    userNotificationsDeleted.push(index)

    let oldData = [...notificationIds]

    let notificationIndex = notificationIds.indexOf(index)

    oldData.splice(notificationIndex, 1)

    if (!utilizadorUtils.notificacoesDelete.includes(index)) {
      utilizadorRef = doc(db, "UtilizadorUtils", user.email)
      updateDoc(utilizadorRef, {
        notificacoesDelete: arrayUnion(index),
      })
      updateDoc(utilizadorRef, {
        notificacoes: oldData,
      })
    }

    setNotificationIds(oldData)
    setNotificacoesDeleted(userNotificationsDeleted)

    // console.log(notificationIds)

    setUserNotification((prevNotifications) => {
      const updatedNotifications = [...prevNotifications]
      updatedNotifications.splice(index, 1)
      return updatedNotifications
    })
  }

  const goBack = () => {
    navigation.goBack()
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
      <SafeAreaView style={styles.safeArea}>
        <View style={{ height: 130, backgroundColor: "#F2F3F5" }}>
          <View style={styles.retanguloFundo} />
          <TouchableOpacity style={styles.goBackBtn} onPress={goBack}>
            <FontAwesome5 name="arrow-left" style={styles.goBackIcon} />
          </TouchableOpacity>
          <View style={styles.logoView}>
            <Image
              style={styles.logo}
              source={require("../Login/unlimitedLogo.png")}
            />
          </View>
        </View>
        {userNotification.length != 0 ? (
          <FlatList
            data={userNotification}
            initialNumToRender={10}
            renderItem={({ item, index }) => {
              return (
                <NotificationItem
                  item={item}
                  index={index}
                  utilizador={utilizador}
                  utilizadorUtils={utilizadorUtils}
                  user={user}
                />
              )
            }}
            keyExtractor={(item) => {
              return item.id
            }}
          />
        ) : (
          <Text style={{ alignSelf: "center", fontSize: 16 }}>
            Não tens notificações...
          </Text>
        )}
      </SafeAreaView>
    </>
  )
}

export default Notification
