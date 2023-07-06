import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1A649F",
  },

  scrollView: {
    height: "100%",
    backgroundColor: "#F2F3F5",
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
    top: "7%",
  },

  perfilContainer: {
    width: "100%",
    height: "100%",
  },

  perfilImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },

  editFoto: {
    height: 150,
    width: 150,
    alignSelf: "center",
    backgroundColor: "#000000",
    opacity: 0.5,
    position: "absolute",
    zIndex: 1,
  },

  editFotoIcon: {
    position: "absolute",
    fontSize: 50,
    color: "white",
    zIndex: 2,
    alignSelf: "center",
    top: 50,
  },

  editFotoBtn: {
    height: "55%",
    width: "50%",
    alignSelf: "center",
    zIndex: 1,
  },

  perfilDataContainer: {
    backgroundColor: "white",
    width: "80%",
    height: 475,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 110,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },

  perfilNomeContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "lightgrey",
    marginTop: 70,
    marginBottom: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "#B9B6B6",
  },

  perfilNome: {
    fontSize: 20,
    color: "black",
    fontWeight: "700",
    letterSpacing: 0.8,
    padding: 5,
  },

  perfilDetalhesContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "lightgrey",
    width: "80%",
    margin: 7,
    padding: 10,
    borderWidth: 1,
    borderColor: "#B9B6B6",
    alignSelf: "center",
  },

  perfilDetalhes: {
    fontSize: 18,
    color: "black",
    fontWeight: "500",
    letterSpacing: 0.8,
    padding: 3,
  },

  guardarBtn: {
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#174162",
    marginBottom: 20,
  },

  guardarTexto: {
    fontSize: 22,
    color: "white",
    fontWeight: "600",
    letterSpacing: 1,
  },
})

export default styles
