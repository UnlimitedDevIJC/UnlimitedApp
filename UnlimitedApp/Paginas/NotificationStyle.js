import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1A649F",
  },

  scrollView: {
    backgroundColor: "#F2F3F5",
    flexGrow: 1,
  },

  retanguloFundo: {
    width: "120%",
    transform: [{ rotateZ: "-15deg" }],
    height: "100%",
    left: "-10%",
    top: "-55%",
    backgroundColor: "#1A649F",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 40,
  },

  logoView: {
    width: "100%",
    position: "absolute",
    top: "15%",
  },

  logo: {
    width: 85,
    height: 85,
    alignSelf: "center",
  },
  notificationContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginLeft:20,
    marginRight:20,
  },
  expandedContainer: {
    maxHeight: 200, // Set a maximum height when expanded
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
   
   
  },
    trashIcon: {
    color: '#FF0000',
    marginRight: 22,   
    fontSize:18,
  },

  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationContent: {
    marginTop: 8,
    fontSize: 16,
  },

  
})

export default styles