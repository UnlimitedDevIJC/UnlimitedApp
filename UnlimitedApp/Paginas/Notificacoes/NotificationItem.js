import { View, Text, TouchableOpacity } from "react-native";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import styles from "./NotificationStyle";
import { FontAwesome5 } from "@expo/vector-icons";

const db = getFirestore();

const NotificationItem = ({ item, index, utilizadorUtils, utilizador, user }) => {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [userNotification, setUserNotification] = useState([]);
  const [notificationIds, setNotificationIds] = useState([]);
  const [notificacoesDeleted, setNotificacoesDeleted] = useState([]);

  let utilizadorRef = null;

  const handleNotificationPress = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleDeleteNotification = (index) => {
    let userNotificationsDeleted = [];

    userNotificationsDeleted.push(index);

    let oldData = [...notificationIds];

    let notificationIndex = notificationIds.indexOf(index);

    oldData.splice(notificationIndex, 1);

    if (!utilizadorUtils.notificacoesDelete.includes(index)) {
      utilizadorRef = doc(db, "UtilizadorUtils", user.email);
      updateDoc(utilizadorRef, {
        notificacoesDelete: arrayUnion(index),
      });
      updateDoc(utilizadorRef, {
        notificacoes: oldData,
      });
    }

    setNotificationIds(oldData);
    setNotificacoesDeleted(userNotificationsDeleted);

    setUserNotification((prevNotifications) => {
      const updatedNotifications = [...prevNotifications];
      updatedNotifications.splice(index, 1);
      return updatedNotifications;
    });
  };

  return (
    <View style={styles.cardView}>
      {/* <View style={styles.cardInfo}>
        <Text style={styles.cardNome}>{item.titulo}</Text>
        <Text style={styles.cardData}>{item.corpo}</Text>
      </View> */}
      <View key={index}>
        <TouchableOpacity
          style={[
            styles.notificationContainer,
            expandedIndex === index && styles.expandedContainer,
          ]}
          onPress={() => handleNotificationPress(index)}
        >
          <Text style={styles.notificationTitle}>{item.titulo}</Text>
          <TouchableOpacity
            style={styles.deleteIconContainer}
            onPress={() => handleDeleteNotification(item.id)}
          >
            <FontAwesome5 style={styles.trashIcon} name="trash" />
          </TouchableOpacity>

          {expandedIndex === index && (
            <Text style={styles.notificationContent}>{item.corpo}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationItem;
