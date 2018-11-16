import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button } from 'reactstrap';

import {
    Alert,
    UncontrolledAlert,
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';

function RenderSandwiches() {
    return <div>Sandwiches Rendered</div>
}
function RenderPayment() {
    return <div>Payment Rendered</div>
}
function RenderConfirm() {
    return <div>Confirm Rendered</div>
}


class Customer extends React.Component {

    //For Dismiss Button with Alert
    constructor(props) {
        super(props);
        this.state = {elm: "sand"}
    }
    setCrumb(b) {
        console.log(b);
        this.setState({elm: b})
    }
    render() {
        let currentView; 
        if(this.state.elm == "sand"){
            currentView = RenderSandwiches();
        }
        else if(this.state.elm == "pay") {
            currentView = RenderPayment();
        }
        else if(this.state.elm == "confirm") {
            currentView = RenderConfirm();

        }
      return <div>
      <Breadcrumb>
        <BreadcrumbItem name = "sand" active onClick = {() => this.setCrumb("sand")}> <Button>Pick your Sandwich </Button></BreadcrumbItem>
        <BreadcrumbItem name = "pay" onClick = {() => this.setCrumb("pay")}> <Button>Choose payment type </Button></BreadcrumbItem>
        <BreadcrumbItem name = "confirm" onClick = {() => this.setCrumb("confirm")} ><Button>Confirm your order </Button></BreadcrumbItem>
      </Breadcrumb>
      {currentView}
    </div>
    }
}

export default Customer;
