import {
    View,
    Text,
    SafeAreaView,
    TouchableWithoutFeedback,
    ScrollView,
    Image,
    TouchableOpacity,
  } from "react-native"
  import React, { useState } from 'react';
  import styles from "./NotificationStyle"
  import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
  
  const Notification = () => {
    const [expandedIndex, setExpandedIndex] = useState(-1);

    const [notifications, setNotifications] = useState([
        {
          id: 1,
          title: 'Notification 1',
          content: 'This is the content of Notification 1.',
        },
        {
          id: 2,
          title: 'Notification 2',
          content: 'This is the content of Notification 2.',
        },
      
          {
            id: 3,
            title: 'Notification 3',
            content: 'This is the content of Notification 2.',
          },
        
        // Add more notifications as needed
      ]);

      const handleNotificationPress = (index) => {
        // Toggle the expansion of the container
        setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
      };

      const handleDeleteNotification = (index) => {
        // Remove the notification from the list when delete icon is pressed
        setNotifications((prevNotifications) => {
          const updatedNotifications = [...prevNotifications];
          updatedNotifications.splice(index, 1);
          return updatedNotifications;
        });
      };
    



    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} bounces={true}>
        
          <View style={{ width: "100%", height: 130 }}>
          <View style={{ width: "100%", height: "100%" }}>
            
              <View style={styles.retanguloFundo} />
              <View style={styles.logoView}>
                <Image
                  style={styles.logo}
                  source={require("./unlimitedLogo.png")}
                 
                />
              </View>
            </View>

            <View style={styles.container}>
      {notifications.map((notification, index) => (
        <View key={notification.id}>
          <TouchableOpacity
            style={[
              styles.notificationContainer,
              expandedIndex === index && styles.expandedContainer,
            ]}
            onPress={() => handleNotificationPress(index)}
          >
            <Text style={styles.notificationTitle}>{notification.title}
            
            <TouchableOpacity
            style={styles.deleteIconContainer}
            onPress={() => handleDeleteNotification(index)}
          >
            <FontAwesome5 style={styles.trashIcon} name="trash" />
          </TouchableOpacity>
          
           </Text>
           

            {expandedIndex === index && (
              <Text style={styles.notificationContent}>
                {notification.content}
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

  