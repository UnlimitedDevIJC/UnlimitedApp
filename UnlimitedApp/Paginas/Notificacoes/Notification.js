import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native"
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  getDocs,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import React, { useState, useEffect } from "react"
import styles from "./NotificationStyle"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import { setLogLevel } from "@firebase/app"

const db = getFirestore()
const notificationRef = collection(db, "Notificacoes")
const utilizadorUtilsRef = collection(db, "UtilizadorUtils")

let listaNotificacoes = [] //Todas as notificações
let listaNotificationIds = [] //Todos os Ids não repetido

const Notification = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(-1)
  const [utilizador, setUtilizador] = useState("null")
  const [utilizadorUtils, setUtilizadorUtils] = useState("null")
  const [notification, setNotification] = useState([])
  const [notificationIds, setNotificationIds] = useState([])
  const [notificacoesDeleted, setNotificacoesDeleted] = useState([])
  const [user, setUser] = useState()

  onSnapshot(notificationRef, (snapshot) => {
    let existe = true
    if (existe) {
      snapshot.docs.forEach((doc) => {
        listaNotificacoes.push({ ...doc.data(), id: doc.id })
        if (!listaNotificationIds.includes(doc.data().id)) {
          listaNotificationIds.push(doc.data().id)
        }
      })
    }
    return () => (existe = false)
  })

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
    const unsubscribe = onSnapshot(notificationRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data())
      const filteredNotifications = data.filter((item) => {
        // console.log(!notificacoesDeleted.includes(item.id))
        return (
          (item.anos === utilizador.anoEscolar || item.anos === "all") &&
          !notificacoesDeleted.includes(item.id)
        )
      })
      setNotification(filteredNotifications)
      handleUpdate(filteredNotifications)
    })
    return () => unsubscribe()
  }, [])

  async function handleUpdate(filteredNotifications) {
    let userNotificationsIds = [] // Códigos notificações utilizador

    filteredNotifications.forEach((item) => {
      if (!userNotificationsIds.includes(item.id)) {
        userNotificationsIds.push(item.id)
      }
    })

    setNotificationIds(userNotificationsIds)

    const utilizadorRef = doc(db, "UtilizadorUtils", utilizador.email)
    const docSnap = await getDoc(utilizadorRef)
    const currentNotificacoes = docSnap.data()?.notificacoes || []

    const updatedNotificacoes = currentNotificacoes.filter((id) =>
      userNotificationsIds.includes(id)
    )

    await updateDoc(utilizadorRef, {
      notificacoes: updatedNotificacoes,
    })
  }

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

    setNotification((prevNotifications) => {
      const updatedNotifications = [...prevNotifications]
      updatedNotifications.splice(index, 1)
      return updatedNotifications
    })
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} bounces={true}>
        <View style={{ width: "100%", height: 130 }}>
          <View style={{ width: "100%", height: "100%" }}>
            <View style={styles.retanguloFundo} />
            <View style={styles.logoView}>
              <Image
                style={styles.logo}
                source={require("../Login/unlimitedLogo.png")}
              />
            </View>
          </View>

          <View style={styles.container}>
            {notification.map((notification, index) => (
              <View key={notification.id}>
                <TouchableOpacity
                  style={[
                    styles.notificationContainer,
                    expandedIndex === index && styles.expandedContainer,
                  ]}
                  onPress={() => handleNotificationPress(index)}
                >
                  <Text style={styles.notificationTitle}>
                    {notification.titulo}
                  </Text>
                  <TouchableOpacity
                    style={styles.deleteIconContainer}
                    onPress={() => handleDeleteNotification(notification.id)}
                  >
                    <FontAwesome5 style={styles.trashIcon} name="trash" />
                  </TouchableOpacity>

                  {expandedIndex === index && (
                    <Text style={styles.notificationContent}>
                      {notification.corpo}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Notification
