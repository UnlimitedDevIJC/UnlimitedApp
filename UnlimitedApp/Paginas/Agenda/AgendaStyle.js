import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F3F5",
  },

  // scrollView: {
  //   height: "100%",
  //   backgroundColor: "#F2F3F5",
  // },

  retanguloFundo: {
    backgroundColor: "#1A649F",
    width: "110%",
    height: '150%',
    transform: [{ rotateZ: "-15deg" }],
    left: -35,
    top: -130,
  },

  logo: {
    width: 85,
    transform: [{ rotateZ: "0deg" }],
    height: 85,
    alignSelf: "center",
    top:'-132%',
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
    borderRadius: 5,
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
    height: 120,
    alignSelf: "center",
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },

  cardInfo: {
    width: "80%",
    padding: 10,
    marginLeft: 10,
  },

  cardNome: {
    padding: 10,
    marginTop: 5,
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Arial",
  },

  cardData: {
    padding: 10,
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "Arial",
  },

  cardIconContainer: {
    alignItems:'center',
    justifyContent:'center',
  },

  cardIcon: {
    fontSize: 35,
    color:'#174162'
  }
})

export default styles
