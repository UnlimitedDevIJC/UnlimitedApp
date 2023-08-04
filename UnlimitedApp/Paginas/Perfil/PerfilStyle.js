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
    top: "7%",
  },

  editProfileBtn: {
    width: "15%",
    position: "absolute",
    top: 50,
    right: 15,
    alignSelf: "flex-end",
  },

  editProfileIcon: {
    fontSize: 35,
    color: "#174162",
  },

  perfilContainer: {
    width: "100%",
    height: "100%",
  },

  perfilImageContainer: {
    height: "55%",
    width: '50%',
    alignSelf:'center',
    backgroundColor:'white',
    zIndex: 1,
  },

  perfilImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },

  perfilDataContainer: {
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    position: "absolute",
    top: 130,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },

  perfilNomeContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  perfilNome: {
    fontSize: 22,
    color: "black",
    fontWeight:'700',
    letterSpacing: 0.8,
    padding: 5,
  },

  perfilDetalhesContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  perfilDetalhes: {
    fontSize: 18,
    color: "black",
    fontWeight:'600',
    letterSpacing: 0.8,
    padding: 5,
  },

  perfilPontos: {
    fontSize: 24,
    color: "#174162",
    fontWeight:'700',
    letterSpacing: 0.8,
    padding: 5,
    marginBottom: 10,
  },

  perfilLogout: {
    width: "80%",
    height: "11%",
    justifyContent: "center",
    alignItems:'center',
    backgroundColor: "#174162",
    marginTop: "3%",
    alignSelf: "center",
    marginBottom:'5%',
    padding: '5%'
  },

  logout: {
    fontSize: 22,
    fontWeight: 600,
    color: 'white',
  }
})

export default styles
