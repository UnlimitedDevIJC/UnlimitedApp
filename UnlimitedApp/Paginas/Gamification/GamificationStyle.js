import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#16508D",
  },

  scrollView: {
    height: "100%",
    backgroundColor:'white'
  },

  retanguloFundo: {
    backgroundColor: "#16508D",
    width: "110%",
    height: 130,
    transform: [{ rotateZ: "-15deg" }],
    left: -25,
    top: -70,
  },

  logo: {
    width: 85,
    height: 85,
    alignSelf:'center',
    position:'absolute',
    top:'16%'
  },
})

export default styles
