import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id); //Fetching Data independently for each stream
    }

    //Callback for StreamForm
    onSubmit = (formValues) => {
        console.log(formValues);
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render(){
        //console.log(this.props);
        if(!this.props.stream){
            return <div>Loading...</div>
        }
        return(
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    //Special Prop to pass in the initial value of fields (use as is)
                    //initialValues={{ title: this.props.stream.title, description: this.props.stream.description }} 
                    //ES6
                    //This send all the properties to Redux Forms, we only want title and Description
                    //initialValues = {this.props.stream}
                    
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);