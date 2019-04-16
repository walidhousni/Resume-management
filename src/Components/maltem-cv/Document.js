import React, { PureComponent } from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Image,
  PDFViewer
} from "@react-pdf/renderer";
import Logo from '../../static/icon.png'
import qrCode from '../../static/qrcode.png'

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  infoPerso: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleCompetence: {
    color: '#C00000',
    fontSize: 17
  },
  expTitle: {
    color: '#C00000',
    fontSize: 17
  },
  competenceView: {
    marginTop: 50,
    paddingLeft: 40,
    width: '100%',
  },
  expView: {
    width: '100%',
  },
  infoText: {
    color: '#C00000',
    fontSize: 17
  },
  sign: {
    color: '#C00000',
  },
  infoTextNom: {
    color: '#C00000',
    fontSize: 17,
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold'
  },
  logo: {
    width: '50px'
  },
  qrCode: {
    width: '40px'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10
  },
  hr: {
    width: '100%',
    height: 2,
    backgroundColor: '#C00000',
    marginBottom: 10
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    left: 35
  },
  infoFooter: {
    fontSize: 10,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  CStyle: {
    fontSize: 15,
    color: 'grey',
    overflowWrap: 'break-word',
  },
  childView1: {
    width: '30%',
    paddingLeft: 20,
    marginTop: 20
  },
  childView2: {
    width: '70%',
    marginTop: 20,
    paddingLeft: 20,
  },
  parentView: {
    display: 'flex',
    flexDirection: 'row',
  },
  anneExp: {
    fontSize: 15,
    color: 'grey',
    overflowWrap: 'break-word',
    fontSize: 12
  },
  foncExp: {
    fontSize: 15,
    color: 'grey',
    overflowWrap: 'break-word',
    fontSize: 12
  },
  entrExp: {
    fontSize: 15,
    color: 'black',
    overflowWrap: 'break-word',
    fontSize: 12,
    fontFamily: 'Helvetica-Bold'
  },
  titreMiss: {
    fontSize: 15,
    color: 'grey',
    overflowWrap: 'break-word',
    fontSize: 12,
    fontFamily: 'Helvetica-Bold'
  },
  tachTitre: {
    fontSize: 15,
    color: 'grey',
    overflowWrap: 'break-word',
    fontSize: 12
  },
  descMiss: {
    fontSize: 15,
    color: 'grey',
    overflowWrap: 'break-word',
    fontSize: 12,
  },
  anneExp: {
    fontSize: 15,
    color: 'grey',
    overflowWrap: 'break-word',
    fontSize: 12
  },
  CStyle2: {
    fontSize: 15,
    color: 'grey',
    marginLeft: 20,
    overflowWrap: 'break-word',
  },
  CView: {
    marginLeft: 20,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  missionView: {
    marginTop: 20
  },
  tachView: {
    marginTop: 5,
    paddingLeft: 20
  }
});

class DocumentPDF extends PureComponent {
  constructor() {
    super()
    this.state = {
      ready: false
    }
  }

  componentDidMount = () => {
    setTimeout(()=>{
      this.setState({ ready: true });
    }, 1);
  }
  
  render() {
    const { infosPerso, competences, educations, langues, experiences, showCode } = this.props
    const { ready } = this.state
    console.log(infosPerso)

    if(ready && infosPerso && competences && educations && langues && experiences ) {
      return(
        <PDFViewer className='pdf-viewer' >
          <Document>
            <Page style={styles.body} >
              {/* Header */}
                <View style={styles.header} fixed>
                  <Image src={Logo} style={styles.logo} />
                  <View style={styles.hr}></View>
                </View>
              {/* Info Perso */}
                <Text style={styles.infoTextNom} >
                    {infosPerso.nom ? infosPerso.nom : ''}
                    {infosPerso.number && showCode ? '  N°: '+infosPerso.number : ''}
                </Text>
                <View style={styles.infoPerso}>
                  <Text style={styles.infoText} >
                    {infosPerso.status ? infosPerso.status : ''}
                  </Text>
                  <Text style={styles.infoText}>
                    {infosPerso.annee ? infosPerso.annee + ' ans d’expérience' : ''}
                  </Text>
                </View>
              {/* Competences */}
                {
                  competences ?
                  competences.length !== 0 &&
                  <View style={styles.competenceView} >
                    <Text style={styles.titleCompetence} >
                      Domaines de Compétences
                    </Text>
                    {
                      competences.map((competence, idx) => (
                        <View key={idx} style={styles.CView} >
                          <Text style={styles.CStyle} > <Text style={styles.sign} >-</Text> {competence.titre ? competence.titre : ''} :</Text>
                          <Text style={styles.CStyle2} >{competence.description ? competence.description : ''}</Text>
                        </View>
                      ))
                    }
                  </View> : <Text></Text>
                }
              {/* Educations */}
                {
                  educations ?
                  educations.length !== 0 &&
                  <View style={styles.competenceView} >
                    <Text style={styles.titleCompetence} >
                      Études et formations
                    </Text>
                    {
                      educations.map((education, idx) => (
                        <View key={idx} style={styles.CView} >
                          <Text style={styles.CStyle} > {education.annee ? education.annee : ''} </Text>
                          <Text style={styles.CStyle2} >{education.description ? education.description : ''}</Text>
                        </View>
                      ))
                    }
                  </View> : <Text></Text>
                }
              {/* langues */}
                {
                  langues ?
                  langues.length !== 0 &&
                  <View style={styles.competenceView} >
                    <Text style={styles.titleCompetence} >
                      Langues
                    </Text>
                    {
                      langues.map((langue, idx) => (
                        <View key={idx} style={styles.CView} >
                          <Text style={styles.CStyle} > {langue.langue ? langue.langue : ''} </Text>
                          <Text style={styles.CStyle2} >{langue.niveau ? langue.niveau : ''}</Text>
                        </View>
                      ))
                    }
                  </View> : <Text></Text>
                }
              {/* Footer */}
                <View style={styles.footer} fixed>
                  <Image src={qrCode} style={styles.qrCode} />
                  <View style={styles.infoFooter} >
                    <Text>
                      Maltem Africa – Casablanca - Maroc
                    </Text>
                    <Text>
                      Contact : Maltem Africa – obronzini@maltem.com - +212 660 13 79 78
                    </Text>
                  </View>
                </View>
            </Page>
            {
              experiences &&
              <Page style={styles.body}>
                {/* Header */}
                  <View style={styles.header} fixed>
                    <Image src={Logo} style={styles.logo} />
                    <View style={styles.hr}></View>
                  </View>
                {/* Experiences */}
                  {
                    experiences.length !== 0 ?
                    <View style={styles.expView}>
                      <Text style={styles.expTitle}>
                        Expérience Professionnelle
                      </Text>
                      {
                        experiences.map((experience, idx) => (
                          <View style={styles.parentView} key={idx} >
                            <View style={styles.childView1}>
                              <Text style={styles.anneExp}>{experience.annee ? experience.annee : ''}</Text>
                            </View>
                            <View style={styles.childView2}>
                              <Text style={styles.entrExp}>{experience.entreprise ? experience.entreprise : ''}</Text>
                              <Text style={styles.foncExp}>{experience.fonction ? experience.fonction : ''}</Text>
                              {
                                experience.missions ?
                                experience.missions.length !== 0 &&
                                experience.missions.map((mission, idx) => (
                                  <View style={styles.missionView} key={idx} >
                                    <Text style={styles.titreMiss}>{mission.titre ? mission.titre : ''}</Text>
                                    <Text style={styles.descMiss}>{mission.description ? mission.description : ''}</Text>
                                    {
                                      mission.taches ?
                                      mission.taches.length !== 0 &&
                                      mission.taches.map((tach, idx) => (
                                        <View key={idx} style={styles.tachView} >
                                          <Text style={styles.tachTitre} >{tach.titre ? `- ${tach.titre}` : ''}</Text>
                                        </View>
                                      )) : <Text></Text>
                                    }
                                  </View>
                                )) : <Text></Text>
                              }
                            </View>
                          </View>
                        ))
                      }
                    </View> : <Text></Text>
                  }
                {/* Footer */}
                <View style={styles.footer} fixed>
                  <Image src={qrCode} style={styles.qrCode} />
                  <View style={styles.infoFooter} >
                    <Text>
                      Maltem Africa – Casablanca - Maroc
                    </Text>
                    <Text>
                      Contact : Olivier BRONZINI – obronzini@maltem.com - +212 660 13 79 78
                    </Text>
                  </View>
                </View>
              </Page>
            }
          </Document>
        </PDFViewer>
      )
    }else {
      return null
    }
  }
}

export default DocumentPDF;
