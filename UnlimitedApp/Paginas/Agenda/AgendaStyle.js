import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F3F5",
  },

  imageLogo: {
    top: '-54%',
    alignSelf:'center',
    width: 85,
    height: 85,
  },

  searchView: {
    height: 40,
    flexDirection: "row",
    top: '-15%'
  },

  searchInput: {
    width: "70%",
    fontSize: 14,
    marginLeft: '5%',
    backgroundColor: "white",
    height: 50,
  },

  filterIcon: {
    marginLeft: '35%',
    fontSize: 35,
    color: "#174162",
  },

  cardView: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "90%",
    flex: 1,
    alignSelf: "center",
  },

  cardInfo: {
    width: "80%",
    padding: '2%',
    marginLeft: '3%',
  },

  cardNome: {
    padding: '3%',
    marginTop: '2%',
    fontSize: 22,
    fontWeight: "700",
  },

  cardData: {
    padding: '3%',
    fontSize: 14,
    fontWeight: "400",
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
