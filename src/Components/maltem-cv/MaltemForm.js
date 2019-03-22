import React, { Component } from "react";
import styled from "styled-components";
import { FieldArray, reduxForm } from "redux-form";
import renderCompetences from './common/Competences'
import renderEducations from './common/Educations'
import renderLangues from './common/Langues'
import renderExperiences from './common/Experiences'
import RenderInfosPerso from './common/InfosPerso'
import { connect } from 'react-redux'
import { showCode } from '../../actions'

const Div = styled.div`
    width: 50%;
    height: calc(100vh - 64px);
    overflow: auto;
    padding-left: 30px;
    padding-right: 30px;

    form-style {
        padding-bottom: 30px;
    }

    .paper-card {
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .add-button {
        width: 100%;
        margin-bottom: 20px;
    }

    .add-button-child {
        width: 100%;
        margin-bottom: 20px;
    }

    .iconDiv {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-bottom: 8px;

        .icon {
            color: #f44336;
            cursor: pointer;
        }
    }
`;

class MaltemForm extends Component {
    render() {
        const { handleSubmit, pristine, reset, submitting, showCode, showCodeValue } = this.props;
        
        return (
            <Div>
                <form className='form-style' onSubmit={handleSubmit}>
                    <RenderInfosPerso showCode={showCode} value={showCodeValue} />
                    <FieldArray name="competences" component={renderCompetences}/>
                    <FieldArray name="educations" component={renderEducations}/>
                    <FieldArray name="langues" component={renderLangues}/>
                    <FieldArray name="experiences" component={renderExperiences}/>
                </form>
            </Div>
        );
    }
}

MaltemForm = reduxForm({
    form: "MaltemCVForm",
    enableReinitialize: true,
    destroyOnUnmount: false,
})(MaltemForm);

MaltemForm = connect(
    (state, props) => {
        return props.match.params.id && { initialValues: {...state.profileState.profieSelected}, showCodeValue: state.profileState.showCode }
    }, { showCode }
)(MaltemForm)

export default MaltemForm;
