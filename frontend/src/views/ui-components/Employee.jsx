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
    CardTitle,
    Table
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


class Employee extends React.Component {

    //For Dismiss Button with Alert
    constructor(props) {
        super(props);
        this.state = {elm: "sand",
        sandwiches: [],
        selectedOption: null,
        paymentMethod: null,
        submitSuccess: null,
        orderId: null,
        IngredientButton:false,
        IngredientInfo: [{
          iName: "Mustard",
          Amount: 0,
          ExpirationDate: 0,
          FranchiseId: 0,
          FranchisePhone:0,
          FranchiseAddress:0,
        }],
        MemberButton: false,
        MemberInfo: [
          {Points: 2000,
            Name: "jake",
            Phone: 112321012,
            Email: "aksldaj@masa.com"},
            {Points: 0,
              Name: "",
              Phone: 0,
              Email: ""},
              {Points: 0,
                Name: "",
                Phone: 0,
                Email: ""},
                {Points: 0,
                  Name: "",
                  Phone: 0,
                  Email: ""},
                  {Points: 0,
                    Name: "",
                    Phone: 0,
                    Email: ""}
        ],
        MemberAndCustButton: false,
    CustomersAndMembers:[{
          CustomerID:"",
          Name:"",
          Phone:0,
          Name:"",
          Points:"",
        }],
    AccessMemberProfile:{
              Name:"Saif",
              Phone:604829102,
              Email:"kdsalkda@nklsda.com",
              Points:2200,
            },
    DistributorTable:[{
      Did: 0,
      Name: "Name",
      Address: "2013 West 16th"
    }]



    }
    }
    placeOrder() {
        fetch('http://localhost:5000/order/place', {
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
        fetch("http://localhost:5000/order/sandwiches/all").then(res=>res.json()).then(res => {
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
    displayIngredientInformation(){
      let name = this.refs.IngredientName.value;
      console.log(name);
      fetch("http://localhost:5000/supply/ing/" + name).then(res=>res.json()).then(res => {
        this.setState({IngredientInfo:res, IngredientButton: true});
        console.log(res);
    }).catch(e => {
      alert("Please enter a valid input");
    })
    }

    displayMemberInformation(){
      fetch("http://localhost:5000/store/members").then(res=>res.json()).then(res => {
        this.setState({MemberInfo:res, MemberButton: true});
        console.log(res);
    }).catch(e => {
      alert("Some Error Occured");
    })
    }
    displayMembers(){
      let snm = this.refs.SandwichName.value;
      fetch("http://localhost:5000/store/customers/sandwich/" + snm).then(res=>res.json()).then(res => {
        this.setState({CustomersAndMembers:res, MemberAndCustButton: true});
        console.log(res);
    }).catch(e => {
      alert("Some Error Occured");
    })
  }
    displayMemberByID(){
      let id = this.refs.CustID.value;
      fetch("http://localhost:5000/store/member/" + id).then(res=>res.json()).then(res => {
        this.setState({AccessMemberProfile:res, MemberByIDButton: true});
        console.log(res);
    }).catch(e => {
      alert("Some Error Occured");
    })
    }
    displayDistributors(){
      fetch("http://localhost:5000/supply/distributor/all").then(res=>res.json()).then(res => {
        this.setState({DistributorTable:res, DistributorButton: true});
        console.log(res);
    }).catch(e => {
      alert("Some Error Occured");
    })
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
        let IngredientTable = null;
        if(this.state.IngredientButton) {

          //refs.IngredientName.value will give the name of the ingredient that the Employee
          //wants to know more about. use this in an sql statement, likely with a GROUP BY
          //To get the info of all the ingredients.

        //  alert(this.refs.IngredientName.value)
          IngredientTable = <Table borderless>
                <thead>
                  <tr>
                    <th>Ingredient Name</th>
                    <th>Calories</th>
                    <th>ExpirationDate</th>
                    <th>FranchiseId</th>
                    <th>FranchisePhone</th>
                    <th>FranchiseAddress</th>
                  </tr>
                </thead>
                <tbody>
              {this.state.IngredientInfo.map(function(ingredient,i){
                    return   <tr>
                    <td> <strong>{ingredient.iName}</strong></td>
                    <td> <strong>{ingredient.Calories}</strong></td>
                    <td> <strong>{ingredient.bb_date}</strong></td>
                    <td> <strong>{ingredient.fid}</strong></td>
                    <td> <strong>{ingredient.FranchisePhone}</strong></td>
                     <td> <strong>{ingredient.FranchiseAddress}</strong></td>
              </tr>
            })}
            </tbody>
                </Table>
        }


        let MemberTable = null;
        if(this.state.MemberButton) {

          MemberTable = <Table borderless>
                <thead>
                  <tr>
                    <th>Member Name</th>
                    <th>Points</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
              {this.state.MemberInfo.map(function(member,i){
                    return   <tr>
                    <td> <strong>{member.Name}</strong></td>
                    <td> <strong>{member.Points}</strong></td>
                    <td> <strong>{member.Email}</strong></td>
                    <td> <strong>{member.Phone}</strong></td>
              </tr>
            })}
            </tbody>
                </Table>
        }

        let MemberAndCustTable = null;
        if(this.state.MemberAndCustButton) {
          // this.refs.SandwichName.value will return the name of the inputted
          // sandwich. Use this to get necessary member and customer data.
          // Since we're displaying all of the data in one table,
          // Any time a customer is not a member, simply leave their
          // attributes null except for cutomer ID.
          MemberAndCustTable = <Table borderless>
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
              {this.state.CustomersAndMembers.map(function(mc,i){
                    return   <tr>
                    <td> <strong>{mc.cid}</strong></td>
                    <td> <strong>{mc.Name}</strong></td>
                    <td> <strong>{mc.Email}</strong></td>
                    <td> <strong>{mc.Phone}</strong></td>
                    <td> <strong>{mc.Points}</strong></td>
              </tr>
            })}
            </tbody>
                </Table>
        }

        let MemberByIDTable = null;
        if(this.state.MemberByIDButton) {
          // this.refs.SandwichName.value will return the name of the inputted
          // sandwich. Use this to get necessary member and customer data.
          // Since we're displaying all of the data in one table,
          // Any time a customer is not a member, simply leave their
          // attributes null except for cutomer ID.
          MemberByIDTable = <Table borderless>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                 <tr>
                    <td> <strong>{this.state.AccessMemberProfile.Name}</strong></td>
                    <td> <strong>{this.state.AccessMemberProfile.Email}</strong></td>
                    <td> <strong>{this.state.AccessMemberProfile.Phone}</strong></td>
                    <td> <strong>{this.state.AccessMemberProfile.Points}</strong></td>
              </tr>
            </tbody>
                </Table>
        }

        let DistributorTable = null;
        if(this.state.DistributorButton) {

          DistributorTable = <Table borderless>
                <thead>
                  <tr>
                    <th>Distributor ID</th>
                    <th>Name</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
              {this.state.DistributorTable.map(function(distributor,i){
                    return   <tr>
                    <td> <strong>{distributor.did}</strong></td>
                    <td> <strong>{distributor.Name}</strong></td>
                    <td> <strong>{distributor.Address}</strong></td>
              </tr>
            })}
            </tbody>
                </Table>
        }


      return <div>
      <Breadcrumb>
        <BreadcrumbItem name = "sand" active onClick = {() => this.setCrumb("sand")}> <Button>Pick your Sandwich </Button></BreadcrumbItem>
        <BreadcrumbItem name = "pay" onClick = {() => this.setCrumb("pay")}> <Button>Choose payment type </Button></BreadcrumbItem>
        <BreadcrumbItem name = "confirm" onClick = {() => this.setCrumb("confirm")} ><Button>Confirm your order </Button></BreadcrumbItem>
      </Breadcrumb>
      {currentView}

      <Card>
      <CardBody>
      <div>
        <label>What Ingredient do you want to know more about?</label><br />
        <input type="text" ref="IngredientName" />
      </div>
      <div>
      </div>
      <Button onClick ={this.displayIngredientInformation.bind(this)}>
      Check Ingredient Info
      </Button>
      {IngredientTable}
      </CardBody>
      </Card>

      <Card>
      <CardBody>
      <div>
        <label>Look up Members with more than 2000 point</label><br />
      </div>
      <div>
      </div>
      <Button onClick ={this.displayMemberInformation.bind(this)}>
      Display Members
      </Button>
      {MemberTable}
      </CardBody>
      </Card>

      <Card>
      <CardBody>
      <div>
        <label>Look up Members and customers based on sandwich names</label><br />
      </div>
      <div>
      <input type="text" ref="SandwichName" />
      </div>
      <Button onClick ={this.displayMembers.bind(this)}>
      Display Members
      </Button>
      {MemberAndCustTable}
      </CardBody>
      </Card>

      <Card>
      <CardBody>
      <div>
        <label>Look Up Members based on their Customer ID</label><br />
      </div>
      <div>
      <input type="text" ref="CustID" />
      </div>
      <Button onClick ={this.displayMemberByID.bind(this)}>
      Display Members by ID
      </Button>
      {MemberByIDTable}
      </CardBody>
      </Card>

            <Card>
            <CardBody>
            <div>
              <label>Distributor Information</label><br />
            </div>
            <div>
            </div>
            <Button onClick ={this.displayDistributors.bind(this)}>
            Display Distributors
            </Button>
            {DistributorTable}
            </CardBody>
            </Card>
    </div>
    }
}

export default Employee;
