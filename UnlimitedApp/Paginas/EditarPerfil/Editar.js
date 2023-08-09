import React, { useState, useEffect } from 'react';
import { File } from 'expo';
import { StyleSheet, View, Button, Image, FlatList, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../Config/firebase';
import 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';

//import DocumentPicker, { types } from 'react-native-document-picker';
import * as DocumentPicker from 'expo-document-picker';
import { getStorage, ref, getDownloadURL, uploadBytes, uploadBytesResumable } from "firebase/storage";
//const bucket = getStorage().bucket();

const storage = getStorage();
const storageRef = ref(storage, 'cvs/igorvc13@outlook.pt');

const UploadFile = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(null);
    const [image2, setImage2] = useState(null)

    const getDocument = async () => {
        getDownloadURL(storageRef)
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'
                setImage2(url)
                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();

                // Or inserted into an <img> element
                const img = document.getElementById('myimg');
                img.setAttribute('src', url);
            })
            .catch((error) => {
                // Handle any errors
            });
    }


//     const pickDocument = async () => {
//         let result = await DocumentPicker.getDocumentAsync({})
//         if (result != null) {
//           console.log(result)
//           setImage(result.uri)
//           //setIsChoosed(true) 
//         }
//     }

//   const uploadDocument = async () => {
//     setUploading(true)
//     console.log(image)
//     const response = await fetch(image)
//     const blob = await response.blob();
//     // 'file' comes from the Blob or File API
//     var ref = uploadBytes(storageRef, blob).then((snapshot) => {
//         console.log('Uploaded a blob or file!');
//     });
    
// //     var ref = firebase.storage().ref().child(filename).put(blob);

//     try {
//         await ref;
//     } catch (e) {
//         console.log(e)
//     }

//     setUploading(false)

//     Alert.alert("Photo Uploaded!")
//     setImage(null);
// }
/*
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [blob, setBlob] = useState(null);

  const permisionFunction = async () => {
    // here is how you can get the camera permission

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === 'granted');

    if (imagePermission.status !== 'granted') {
      alert('Permission for media access needed.');
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    console.log(result.assets[0].uri)
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      const photo = await Image.fromFile(result.assets[0].uri);
      const url = await photo.upload();
      console.log(url);
    }
  };
*/
  return (
    <SafeAreaView>
        <TouchableOpacity style={styles.selectButton} onPress={pickDocument}>
        <Text style={styles.buttonText}>
                Pick an Image
            </Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
            {image && <Text>{image}</Text>}
            <TouchableOpacity style={styles.uploadButton} onPress={uploadDocument}>
                <Text style={styles.buttonText}>
                    Upload Image
                </Text>
            </TouchableOpacity>
            {image2 && <Text>{image2}</Text>}
            <TouchableOpacity style={styles.uploadButton} onPress={getDocument}>
                <Text style={styles.buttonText}>
                    Get Image
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

export default UploadFile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "white",
    fontsize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: "center",
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});