import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    marginTop: "14%",
  },

  scrollView: {
    height: "100%",
  },

  retanguloFundo: {
    backgroundColor: "#16508D",
    width: "100%",
    height: 120,
    transform: [{ rotateZ: '-15deg' }],
    left: -28,
    top: -70,
  },

  logo: {
    width: 85,
    height: 85,
    position: "absolute",
    left: 50,
    top: 40,
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
    backgroundColor: "#1A9FE0",
    marginTop: 20,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 10,
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
  },

  emailView: {
    width: "80%",
    height: 50,
    backgroundColor: "#1A9FE0",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 10,
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
  },

  telemovelView: {
    width: "80%",
    height: 50,
    backgroundColor: "#1A9FE0",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 10,
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
  },

  passwordView: {
    width: "80%",
    height: 50,
    backgroundColor: "#1A9FE0",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 10,
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
  },

  checkpassView: {
    width: "80%",
    height: 50,
    backgroundColor: "#1A9FE0",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 10,
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
  },

  anoescolaView: {
    width: "80%",
    height: 50,
    backgroundColor: "#1A9FE0",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 10,
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
  },

  escolaView: {
    width: "80%",
    height: 50,
    backgroundColor: "#1A9FE0",
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 10,
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
  },

  registarBtn: {
    width: "50%",
    height: 50,
    backgroundColor: "#1A9FE0",
    marginTop: 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
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
