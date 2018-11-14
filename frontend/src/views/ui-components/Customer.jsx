import React from 'react';
import {
    Alert,
    UncontrolledAlert,
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';

class Customer extends React.Component {

    //For Dismiss Button with Alert
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({
            visible: false
        });
    }
    render() {
      return <div>
              {/*--------------------------------------------------------------------------------*/}
              {/* Start Inner Div*/}
              {/*--------------------------------------------------------------------------------*/}
              
                {/*--------------------------------------------------------------------------------*/}
                {/*Card-1*/}
                {/*--------------------------------------------------------------------------------*/}
                
              
              {/*--------------------------------------------------------------------------------*/}
              {/*End Inner Div*/}
              {/*--------------------------------------------------------------------------------*/}
            </div>
    }
}

export default Customer;
