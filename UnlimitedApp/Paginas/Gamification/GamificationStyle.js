import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#1A649F",
    flex: 1,
  },

  scrollView: {
    flex: 1,
    backgroundColor: "#F2F3F5",
  },

  headerView: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    height: 125,
  },

  retanguloFundo: {
    width: "120%",
    transform: [{ rotateZ: "-15deg" }],
    height: "118%",
    left: "-10%",
    top: "-70%",
    backgroundColor: "#1A649F",
  },

  logoView: {
    width: "100%",
    position: "absolute",
    top: "17%",
  },

  logo: {
    width: 85,
    height: 85,
    alignSelf: "center",
  },

  notificationBtn: {
    width: "15%",
    position: "absolute",
    top: 50,
    right: 15,
    alignSelf: "flex-end",
  },

  notificationIcon: {
    fontSize: 34,
    color: "#174162",
  },

  titleView: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },

  titleText: {
    color: "#174162",
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    fontFamily:'Oswald-Regular'
  },

  academiaLogoRetangulo: {
    width: "70%",
    transform: [{ rotateZ: "-12deg" }],
    height: "180%",
    left: "-10%",
    top: "20%",
    backgroundColor: "#174162",
    alignItems: "center",
    justifyContent: "center",
   
    elevation: 40,
  },

  academiaLogo: {
    width: 200,
    height: 200,
    position: "absolute",
    left: "25%",
    top: "15%",
  },

  academiaDescricaoRetangulo: {
    width: "70%",
    transform: [{ rotateZ: "-192deg" }],
    height: "180%",
    right: "-40%",
    top: "60%",
    backgroundColor: "#174162",
  
    elevation: 40,
  },

  empresaLogoBtnView: {
    backgroundColor: "orange",
    width: "100%",
    height: "100%",
    top: "100%",
  },

  empresaBtn: {
    width: "100%",
    height: "100%",
  },

  empresaLogoBtn: {
    height: "100%",
    width: "100%",
  },

  notificationIcon1: {
    fontSize: 90,
    color: "#174162",
    position: "absolute",
    right: "10%",
    top: "105%",
  },
  notificationIcon2: {
    fontSize: 100,
    color: "#174162",
    position: "absolute",
    left: 30,
    top: 500,
  },
})

export default styles
