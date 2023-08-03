import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1A649F",
  },

  scrollView: {
    flex: 1,
    backgroundColor: "#F2F3F5",
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

  notificationBtn: {
    width: "15%",
    position: "absolute",
    top: "40%",
    right: "5%",
    alignSelf: "flex-end",
  },

  notificationIcon: {
    fontSize: 35,
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
    height: "100%",
    left: "-10%",
    top: "10%",
    backgroundColor: "#DADBDB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 40,
  },

  academiaLogo: {
    width: "65%",
    height: "55%",
    transform: [{ rotateZ: "12deg" }],
  },

  academiaDescricaoRetangulo: {
    width: "120%",
    transform: [{ rotateZ: "-12deg" }],
    height: "130%",
    left: "-10%",
    top: "45%",
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

  empresaLogoBtnView: {
    backgroundColor:'orange',
    width:'100%',
    height:'100%',
    top:'100%',
  },

  empresaBtn: {
    width:'100%',
    height:'100%',
  },

  empresaLogoBtn: {
    height:'100%',
    width:'100%',
  },
})

export default styles
