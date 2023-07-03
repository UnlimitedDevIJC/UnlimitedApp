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
    height:'45%',
    // height: 130,
    transform: [{ rotateZ: "-15deg" }],
    left: -25,
    top: '-20%',
  },

  logo: {
    width: '15%',
    height:'22%',
    alignSelf: "center",
    top: "-30%",
  },

  eventoLogo: {
    backgroundColor: "orange",
    width: "100%",
    height: "70%",
    position:'absolute',
    zIndex: -1,
  },

  detalhesEvento: {
    width: "100%",
    height: "100%",
  },

  eventoTituloBox: {
    width:'100%',
    marginTop: '3%',
  },

  eventoTitulo: {
    alignSelf:'center',
    color:'#174162',
    fontSize: 35,
    fontWeight: '600',
    letterSpacing: 1.5,
    padding:'3%'
  },

  descricaoEventoBox: {
    width: '100%',
    height:'55%',
    flexDirection: 'row',
    padding:'3%',
  },

  descricao: {
    fontSize: 20,
    lineHeight: 35,
    letterSpacing: 1
  }, 

  descricaoEvento: {
    fontSize: 20,
    fontWeight:'700'
  },

  inscreverBotaoBox: {
    alignItems:'center',
    width:'100%',
    height:'60%',
    top:'35%',
  },

  inscreverBotao: {
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#174162",
    marginTop:'5%'
  },

  inscreverText: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    padding:'4%'
  }
})

export default styles
