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
    alignSelf: "center",
    position: "absolute",
    top: "2.5%",
  },

  registarTitulo: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 10,
    color: "#16508D",
    fontSize: 50,
    fontWeight: "800",
    letterSpacing: 1,
  },

  nomeView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 20,
    alignSelf: "center",
    flexDirection: "row",
  },

  nomeIcon: {
    color: "white",
    fontSize: 24,
    width: 50,
    paddingTop: 13,
    paddingLeft: 15,
  },

  nomeInput: {
    fontSize: 18,
    width: "100%",
    color: "white",
  },

  emailView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 10,
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
    color: "white",
  },

  telemovelView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
  },

  telemovelIcon: {
    color: "white",
    fontSize: 24,
    width: 50,
    paddingTop: 13,
    paddingLeft: 18,
  },

  telemovelInput: {
    fontSize: 18,
    width: "100%",
    color: "white",
  },

  passwordView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
  },

  passwordIcon: {
    color: "white",
    fontSize: 24,
    width: 50,
    paddingTop: 12,
    paddingLeft: 15,
  },

  passwordInput: {
    fontSize: 18,
    width: "100%",
    color: "white",
  },

  checkpassView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
  },

  checkpassIcon: {
    color: "white",
    fontSize: 24,
    width: 50,
    paddingTop: 12,
    paddingLeft: 15,
  },

  checkpassInput: {
    fontSize: 18,
    width: "100%",
    color: "white",
  },

  anoescolaView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
  },

  anoescolaIcon: {
    color: "white",
    fontSize: 24,
    width: 50,
    paddingTop: 13,
    paddingLeft: 12,
  },

  anoescolaInput: {
    fontSize: 18,
    width: "100%",
    color: "white",
  },

  escolaView: {
    width: "80%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
  },

  escolaIcon: {
    color: "white",
    fontSize: 22,
    width: 50,
    paddingTop: 12,
    paddingLeft: 12,
  },

  escolaInput: {
    fontSize: 18,
    width: "100%",
    color: "white",
  },

  registarBtn: {
    width: "50%",
    height: 50,
    backgroundColor: "#174162",
    marginTop: 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  registarText: {
    fontSize: 22,
    fontWeight: "400",
    color: "white",
    letterSpacing: 1,
  },

  returnLoginBtn: {
    marginTop: 30,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  returnLoginText: {
    fontSize: 22,
    fontWeight: "600",
  },
})

export default styles
