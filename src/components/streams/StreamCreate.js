import React, { Component } from 'react';
import  { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { createStream } from '../../actions';

class StreamCreate extends Component {

    renderError({error, touched}) {
        if(touched && error){
            return(
                <div className="ui error message">
                    <p className="header">{error}</p>
                </div>
            )
        }
    }

    renderInput = ({input, label, meta}) => {
        //console.log(formProps);
        //return <div><input type="text" onChange={formProps.input.onChange} value={formProps.input.value} /></div>
        //return <div><input {...formProps.input} /></div>
        //console.log(meta);

        const errClassName = `field ${meta.error && meta.touched? 'error': ''}`;

        return (
            <div className={errClassName}>
                <label>{ label }</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        console.log('Submit', formValues);
        //event.preventDefault()
        this.props.createStream(formValues);
    }

    render(){
        //console.log(this.props);
        return(
          <form className="ui form error" onSubmit={ this.props.handleSubmit(this.onSubmit) }>
              <Field name="title" component={this.renderInput} label="Enter Title" />
              <Field name="description" component={this.renderInput} label="Enter Description" />
              <button className="ui button primary">Submit</button>
          </form>  
        )
    }
}

//Validation
const validate = (formValues) => {
    const errors = {};

    if(!formValues.title){
        errors.title = "You must enter a title";
    }

    if(!formValues.description){
        errors.description = "You must enter description";
    }

    return errors;
}


// export default reduxForm({
//     form: 'streamCreate',
//     validate: validate
// })(StreamCreate);

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);