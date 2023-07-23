import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1A649F",
  },

  scrollView: {
    height: "100%",
    backgroundColor:'white'
  },

  retanguloFundo: {
    backgroundColor: "#1A649F",
    width: "110%",
    height: 130,
    transform: [{ rotateZ: "-15deg" }],
    left: -25,
    top: -70,
  },

  logo: {
    width: 85,
    height: 85,
    alignSelf:'center',
    position:'absolute',
    top:'2.5%'
  },

  tituloView: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },

  alterarTitulo: {
    textAlign: "center",
    marginTop: 25,
    color: "#16508D",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  emailView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 120,
    alignSelf: "center",
    flexDirection: "row",
  },

  emailIcon: {
    color: "white",
    fontSize: 24,
    width: 50,
    paddingTop: 14,
    paddingLeft: 14,
  },

  emailInput: {
    fontSize: 18,
    width: "100%",
    color:'white'
  },

  enviarEmailBtn: {
    width: "50%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 70,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  enviarEmailText: {
    fontSize: 20,
    fontWeight: "400",
    color: "white",
    letterSpacing: 1,
  },

  returnLoginBtn: {
    marginTop: 160,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  returnLoginText: {
    fontSize: 22,
    fontWeight: "600",
  },

  returnArrowLeft: {
    color: "#174162",
    fontSize: 24,
    width: 50,
    paddingLeft: 14,
  },
})

export default styles
