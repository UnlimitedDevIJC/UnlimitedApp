import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1A649F",
  },

<<<<<<< HEAD
=======
  scrollView: {
    height: "100%",
    backgroundColor: "#F2F3F5",
  },

>>>>>>> parent of 9a3850d (update)
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
    top: "16%",
  },

  searchView: {
    width: "100%",
    height: 40,
    flexDirection: "row",
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
    borderRadius: 5
  },

  filterIcon: {
    marginLeft: 30,
    fontSize: 35,
    color: '#174162'
  },
})

export default styles
