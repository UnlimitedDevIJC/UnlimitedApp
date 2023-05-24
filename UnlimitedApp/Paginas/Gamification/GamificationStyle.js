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
})

export default styles
