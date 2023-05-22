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
    transform: [{ rotateZ: "-15deg" }],
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

  tituloView: {
    width: "60%",
    alignSelf: "center",
    justifyContent: "center",
  },

  registarTitulo: {
    textAlign: "center",
    marginTop: 25,
    color: "#16508D",
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: 1,
  },

  emailView: {
    width: "80%",
    height: 50,
    backgroundColor: "#1A9FE0",
    marginTop: 120,
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

  enviarEmailBtn: {
    width: "50%",
    height: 50,
    backgroundColor: "#1A9FE0",
    marginTop: 140,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  enviarEmailText: {
    fontSize: 20,
    fontWeight: "400",
    color: "white",
    letterSpacing: 1,
  },
})

export default styles
