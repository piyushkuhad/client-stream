import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends Component {

    //This is what we are going to pass in as props
    onSubmit = (formValues) => {
        console.log('Submit', formValues);
        //event.preventDefault()
        this.props.createStream(formValues);
    }

    render(){
        //console.log(this.props);
        return(
          <div>
              <h3>Create a Stream</h3>
              <StreamForm onSubmit={this.onSubmit} />
          </div>
        );
    }
}

export default connect(null, { createStream })(StreamCreate);