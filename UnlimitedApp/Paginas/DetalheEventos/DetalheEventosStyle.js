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
    top: "-51%",
  },

  eventoLogo: {
    backgroundColor: "orange",
    width: "100%",
    height: 200,
    position: "absolute",
    top: 0,
    zIndex: -1,
  },

  detalhesEvento: {
    position: "absolute",
    top: 200,
    width: "100%",
    height: "100%",
  },

  eventoTituloBox: {
    alignSelf:'center',
    width:'100%',
    margin: 10,
  },

  eventoTitulo: {
    alignSelf:'center',
    justifyContent:'center',
    color:'#174162',
    fontSize: 35,
    fontWeight: '600',
    letterSpacing: 1.5,
    padding: 10,

  },

  descricaoEventoBox: {
    height: '100%',
    width: '100%',
    marginTop: 10,
    flexDirection: 'row'
  },

  descricao: {
    fontSize: 20,
    fontWeight: '700',
    padding: 15,
    lineHeight: 35,
    letterSpacing: 1
  }, 

  descricaoEvento: {
    padding: 20,
    fontSize: 20,
    fontWeight: '0'
  },

  inscreverBotaoBox: {
    height: 50,
    marginTop: 20,
    alignItems:'center'
  },

  inscreverBotao: {
    marginTop: 40,
    width: "75%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#174162",
  },

  inscreverText: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  }
})

export default styles
