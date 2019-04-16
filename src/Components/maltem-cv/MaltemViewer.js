import React, { Component } from 'react'
import styled from 'styled-components'
import DocumentPDF from './Document'
import { connect } from 'react-redux'
import { formValueSelector  } from 'redux-form'

const Div = styled.div`
    width: 50%;
    overflow: hidden;
    position: relative;

    .pdf-viewer{
        width: 100%;
        height: 100%;
        border: none;
        position: absolute;
        display: fixed;
    }
`

class MaltemViewer extends Component {
    render () {
        const {
            nom,
            annee,
            status,
            competences,
            educations,
            langues,
            experiences,
            number,
            showCode
        } = this.props
        return (
            <Div>
                <DocumentPDF
                    infosPerso={{ nom, annee, status, number }}
                    competences={competences}
                    educations={educations}
                    langues={langues}
                    experiences={experiences}
                    showCode={showCode}
                />
            </Div>
        )
    }
}

const selector = formValueSelector('MaltemCVForm')

export default connect(
    state => ({
        nom: selector(state, 'nom'),
        number: selector(state, 'number'),
        annee: selector(state, 'annee'),
        status: selector(state, 'status'),
        competences: selector(state, 'competences'),
        educations: selector(state, 'educations'),
        langues: selector(state, 'langues'),
        experiences: selector(state, 'experiences'),
        showCode: state.profileState.showCode
    })
)(MaltemViewer);