import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1A649F",
  },

  retanguloFundo: {
    width: "210%",
    transform: [{ rotateZ: "-15deg" }],
    height: "520%",
    left: "-30%",
    top: "-502%",
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
    top: "17%",
  },

  logo: {
    width: 85,
    height: 85,
    alignSelf: "center",
  },

  searchView: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },

  searchInput: {
    width: "70%",
    height: "100%",
    fontSize: 14,
    marginLeft: 20,
    padding: 10,
    backgroundColor: "white",
  },

  filterIcon: {
    marginLeft: 30,
    fontSize: 35,
    color: "#174162",
  },

  listaEventos: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    width: "100%",
    flex: 1,
  },

  cardView: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    marginTop: 25,
  },

  cardInfo: {
    width: "80%",
    padding: 10,
    marginLeft: 10,
  },

  cardNome: {
    padding: 10,
    marginTop: 5,
    fontSize: 22,
    fontWeight: "700",
    fontFamily:'Oswald-Regular'
  },

  cardData: {
    padding: 10,
    fontSize: 14,
    fontWeight: "400",
    fontFamily:'Oswald-Regular'
  },

  cardIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  cardIcon: {
    fontSize: 35,
    color: "#174162",
  },
})

export default styles
