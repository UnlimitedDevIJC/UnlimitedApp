import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { firebase, initializeApp } from "firebase/app";
import firebaseConfig from './Config/firebase';
import MainStack from './Navigators/mainStack';


const database = initializeApp(firebaseConfig)

export default function App() {
 
  
    return (
      
    <NavigationContainer>
         <MainStack />
      </NavigationContainer>
      
  );
  
}