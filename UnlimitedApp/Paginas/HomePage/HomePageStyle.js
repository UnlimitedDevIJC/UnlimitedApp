import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1A649F",
  },

  scrollView: {
    height: "100%",
    backgroundColor: "white",
  },

  retanguloFundo: {
    width: "120%",
    transform: [{ rotateZ: "-15deg" }],
    height: "100%",
    left: "-10%",
    top: "-55%",
    backgroundColor: "#1A649F",
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

  notificationBtn: {
    width: "15%",
    position: "absolute",
    top: "40%",
    right: "5%",
    alignSelf: "flex-end",
  },

  notificationIcon: {
    fontSize: "35%",
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
  },

  academiaLogoRetangulo: {
    width: "120%",
    transform: [{ rotateZ: "-12deg" }],
    height: "80%",
    left: "-10%",
    top: "10%",
    backgroundColor: "#DADBDB",
  },

  academiaDescricaoRetangulo: {
    width: "120%",
    transform: [{ rotateZ: "-12deg" }],
    height: "100%",
    left: "-10%",
    top: "35%",
    backgroundColor: "#1A649F",
  },

  empresaLogoBtnView: {
    
  }
})

export default styles
