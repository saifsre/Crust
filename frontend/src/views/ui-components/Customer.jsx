import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Select from 'react-select';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import {
    Alert,
    UncontrolledAlert,
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';

let btnStyle = {
    marginTop: '10px'
}   

const RenderSandwiches = (props) => {
   let sNames = [];
   let btnStyle = {
    marginTop: '10px'
   }
   console.log(props);
   for (let i=0; i<props.sandwiches.length;i++) {
       sNames.push({value: props.sandwiches[i].sName, label : props.sandwiches[i].sName + " " + props.sandwiches[i].Price + " $" , price:props.sandwiches[i].Price});
   }
    return <div><Select
    value={props.selectedOption}
    onChange={props.handleChange}
    options={sNames}
  />    
    <Button disabled = {!props.selectedOption} style = {btnStyle} onClick = {()=>props.proceed("pay")}> Next </Button>
  </div>
}
const RenderPayment = (props) => {
 
    return <div>
    <InputGroup>
    <InputGroupAddon addonType="prepend">Method</InputGroupAddon>
    <Input name = "name" value = {props.method} onChange = {e=>props.updateMethod(e)} placeholder="Payment Method" />
  </InputGroup>
  <Button style = {btnStyle} onClick = {()=>props.proceed("confirm")}> Next </Button>
</div>
}
const RenderConfirm = (props) => {
    let toDisplay = null;
    if(props.success === true) {
        toDisplay =   
        <Jumbotron>  
        <h1 className="display-3">Your Order has been placed!</h1>
      </Jumbotron> 
    }
    else {
        toDisplay = <Jumbotron>
        <h1 className="display-3">You are almost done!</h1>
        <p className="lead">This is the Summary of your order:</p>
        <hr className="my-2" />
        <p>Sandwich: {props.sName} </p>
        <p>Payment Type: {props.pType} </p>
        <p>Price: {props.price} </p>
        <p className="lead">
          <Button color="primary" onClick = {()=>props.proceed()}>Place Order!</Button>
        </p>
      </Jumbotron> 
    }
    return <div>{toDisplay} </div>
}


class Customer extends React.Component {

    //For Dismiss Button with Alert
    constructor(props) {
        super(props);
        this.state = {elm: "sand", sandwiches: [], selectedOption: null,
        paymentMethod: null, submitSuccess: null, orderId: null
    }
    }
    placeOrder() {
        fetch('http://localhost:3000/order/place', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },body: JSON.stringify({
        PaymentMethod: this.state.paymentMethod,
        Price: this.state.selectedOption.price,
        sName: this.state.selectedOption.value,
  })
}).then((res)=>{
    console.log(res);
    if(res.status ==200) {
        this.setState({submitSuccess: true})
    }
    else {
        this.setState({submitSuccess: false})
    }
})
}
    setCrumb(b) {
        console.log(b);
        this.setState({elm: b,submitSuccess:null})
    }
    componentDidMount() {
        fetch("http://localhost:3000/order/sandwiches/all").then(res=>res.json()).then(res => {
            this.setState({sandwiches:res});
        })
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      }
    updateInput = (e) => {
        console.log(e.target.value);
        this.setState({paymentMethod:e.target.value})
    }
    render() {
        let currentView; 
        if(this.state.elm == "sand"){
            currentView = <RenderSandwiches proceed = {this.setCrumb.bind(this)} sandwiches = {this.state.sandwiches} selectedOption = {this.state.selectedOption} handleChange = {this.handleChange.bind(this)}/>;
        }
        else if(this.state.elm == "pay") {
            currentView = <RenderPayment proceed = {this.setCrumb.bind(this)} method = {this.state.paymentMethod} updateMethod = {this.updateInput.bind(this)}/>;
        }
        else if(this.state.elm == "confirm") {
            currentView = <RenderConfirm proceed = {this.placeOrder.bind(this)} sName = {this.state.selectedOption.value} pType = {this.state.paymentMethod} price = {this.state.selectedOption.price} success = {this.state.submitSuccess}/>;

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
