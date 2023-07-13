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
  },

  editProfileBtn: {
    width: "15%",
    position: "absolute",
    top: '40%',
    right: '5%',
    alignSelf: "flex-end",
  },

  editProfileIcon: {
    fontSize: '35%',
    color: "#174162",
  },
})

export default styles
