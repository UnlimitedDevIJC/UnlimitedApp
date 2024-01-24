import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#1A649F",
    flex: 1,
  },

  scrollView: {
    flex: 1,
    backgroundColor: "#F2F3F5",
  },

  imageLogo: {
    top: "-44%",
    alignSelf: "center",
    width: 100,
    height: 100,
  },

  barCodeBox: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 350,
    width: "80%",
    top: "-7%",
  },

  barCode: {
    height: "100%",
    width: "100%",
  },

  textButtonLogin: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },

  buttonLogin: {
    justifyContent: "center",
    backgroundColor: "#174162",
    marginTop: "3%",
    alignSelf: "center",
    padding: "3%",
    width: "60%",
  },

  codeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  codeInput: {
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderBottomColor: "#16508D",
    borderBottomWidth: 2,
    top:'20%',
    marginBottom:'50%'
  },

  input: {
    fontSize: 24,
  },

  btnSubmeter: {
    justifyContent: "center",
    backgroundColor: "#174162",
    marginTop: "3%",
    alignSelf: "center",
    padding: "3%",
    width: "60%",
  },

  btnSubmeterText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },

  goBackBtn: {
    position: "absolute",
    left: "10%",
    top: "20%",
    zIndex: 100,
  },

  goBackIcon: {
    color: "white",
    fontSize: 30,
  },
});

export default styles;
