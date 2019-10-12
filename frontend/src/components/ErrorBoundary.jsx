// REACT
import React, { Component } from 'react';

class ErrorBoundary extends Component {

    // Life cycle methods

    constructor(props){
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render(){
        if(this.state.errorInfo) {
            return (
                <div>
                    <h2>Something went wrong</h2>
                    { this._displayErrorStack() }
                </div>
            );
        }

        return this.props.children;
    }

    // Component functions
    
    _displayErrorStack(){
        // Check for the Environment
        if (process.env.NODE_ENV === 'development') {
            return (
                <details style={{ whiteSpace: 'pre-wrap'}}>
                    { this.state.error && this.state.error.toString() }
                    <br />
                    { this.state.errorInfo.componentStack }
                </details>
            );
        } else {
            return null;
        }
                    
    }
}

export default ErrorBoundary;

