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
    console.log(props);
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
    <Button disabled = {!props.selectedOption} style = {btnStyle} onClick = {()=>props.proceed(props.screen)}> {props.btnText} </Button>
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
    let updateOrder = null;
    if(props.update) {
        updateOrder = <RenderSandwiches btnText = "Update Your Order Here!" screen = "pay" proceed = {props.update.bind(this)} handleChange = {props.handleChange.bind(this)} sandwiches = {props.sandwiches} selectedOption = {props.selectedOption}/>
    }
    if(props.success === true) {
        toDisplay =   
        <div>
        <Jumbotron>  
        <h1 className="display-3">Your Order has been {props.msg}!</h1>
        <p className="lead">Your order Id is: {props.id}</p>
        {updateOrder}
      </Jumbotron>
      <Button onClick = {props.cancel}> Click here to Cancel your Order </Button>
       </div>
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
        paymentMethod: null, submitSuccess: null, orderId: null, update: false, msg: "placed"
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
}).then(res=>res.json()).then(res => {
    console.log(res);
    if(res.id) {
        this.setState({submitSuccess: true, orderId:res.id })
    }
    else {
        this.setState({submitSuccess: false})
    }
})
}
updateOrder() {
    console.log("Updated: " + this.state.orderId);
    
    fetch('http://localhost:3000/order/update', {
    method: 'PUT',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
},body: JSON.stringify({
    sName: this.state.selectedOption.value,
    Price: this.state.selectedOption.price,
    orderId: this.state.orderId
})
}).then(res=>res.json()).then(res => {
    alert("Your order has been updated!");
})
}
    setCrumb(b) {
        console.log(b);
        this.setState({elm: b,submitSuccess:null})
    }
    componentDidMount() {
        fetch("http://localhost:3000/order/sandwiches/all").then(res=>res.json()).then(res => {
            this.setState({sandwiches:res});
        }).catch(e=>{
            console.log(e);
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
    updateUpdate = () => {
        this.setState({update: true, msg: "updated"})
    }
    cancelOrder = () => {
        fetch('http://localhost:3000/order/cancel/' + this.state.orderId.toString(), {
            method: 'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }}).then(res=>res.json()).then(res => {
            alert("Your Order has been Canceled. Please reorder!")
            this.setCrumb("sand")
        })
    }
    render() {
        let currentView; 
        if(this.state.elm == "sand"){
            currentView = <RenderSandwiches btnText = "Next" screen = "pay" proceed = {this.setCrumb.bind(this)} sandwiches = {this.state.sandwiches} selectedOption = {this.state.selectedOption} handleChange = {this.handleChange.bind(this)}/>;
        }
        else if(this.state.elm == "pay") {
            currentView = <RenderPayment proceed = {this.setCrumb.bind(this)} method = {this.state.paymentMethod} updateMethod = {this.updateInput.bind(this)}/>;
        }
        else if(this.state.elm == "confirm") {
            currentView = <RenderConfirm msg = {this.state.msg} cancel = {this.cancelOrder.bind(this)}update = {this.state.update} uUpdate = {this.updateUpdate.bind(this)} handleChange = {this.handleChange.bind(this)} selectedOption = {this.state.selectedOption} sandwiches = {this.state.sandwiches} method = {this.state.paymentMethod} updateMethod = {this.updateInput.bind(this)} id = {this.state.orderId} update = {this.updateOrder.bind(this)} proceed = {this.placeOrder.bind(this)} sName = {this.state.selectedOption.value} pType = {this.state.paymentMethod} price = {this.state.selectedOption.price} success = {this.state.submitSuccess}/>;

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
