import React from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table
} from 'reactstrap';
import Calendar from "react-calendar";
import moment from "moment";


class Buttons extends React.Component {

    // For Checkboxes & Radio Buttons
    constructor (props) {
      super(props);
      this.state = {
          visible: true,
          btnClicked: false,
          prodButton:false,
          /*This is going to be empty for customer, as they will only be able to see the sandwiches that
          they order */
          IngredientBestByInfo:[{
            iName: "Mustard",
            ship_date: "123",
            bb_date: '11',},
            {
              iName: "Mustard",
              ship_date: "234",
              bb_date: '11',},
              {
                iName: "Mustard",
                ship_date: "123",
                bb_date: '11',},
                {
                  iName: "Mustard",
                  ship_date: "123",
                  bb_date: '11',},
                  {
                    iName: "Mustard",
                    ship_date: "123",
                    bb_date: '11',}],

          IngredientProducerInfo: null,
          date: new Date()
      };

    }

    componentDidMount() {
    }
    checkBestByIngredients(){ 
      let shipdate = moment(this.state.date).format("YYYY-MM-DD");
      alert(shipdate);
      fetch("http://localhost:3000/supply/ingredient/" + shipdate).then(res=>res.json()).then(res => {
          console.log(res);
          this.setState({IngredientBestByInfo: res, btnClicked: true})
          })
    }

    displayIngredientProducerData(){
        let prodId = this.refs.prodID.value;
        let url = "http://localhost:3000/supply/ingredientproducer/" + prodId;
        fetch(url).then(res=>res.json()).then(res => {
            console.log(res);
            this.setState({IngredientProducerInfo: res, prodButton: !this.state.prodButton})
            }).catch(e=>{
                alert("Please enter a valid Producer ID");
            });
    }
    onChange = date => this.setState({date})

    render() {
      let table = null;
      let producerTable = null;
      if(this.state.btnClicked) {
        table =       <Table borderless>
              <thead>
                <tr>
                  <th>Ingredient Name</th>
                  <th>Shipping Date</th>
                  <th>Best by Date</th>
                </tr>
              </thead>
              <tbody>
            {this.state.IngredientBestByInfo.map(function(ingredient,i){
                  return   <tr>
                  <td> <strong>{ingredient.iName}</strong></td>
                  <td> <strong>{ingredient.ship_date}</strong></td>
                  <td> <strong>{ingredient.bb_date}</strong></td>
            </tr>
          })}
          </tbody>
              </Table>
      }
      if(this.state.prodButton){
        //In this call you will be calling an sql statement that gets a single tuple,
        //This tuple would be the original ingredient producer obtained from an inputted id.
        //For this particular function, at any point you will ony need to have 1 ingredient producer tuple
        //No need to iterate through the list of objects.
        producerTable=  <Table borderless>
              <thead>
                <tr>
                  <th>Distributor ID</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <td> <strong>{this.state.IngredientProducerInfo.did}</strong></td>
                  <td> <strong>{this.state.IngredientProducerInfo.address}</strong></td>
                  <td> <strong>{this.state.IngredientProducerInfo.phone}</strong></td>
            </tr>
          </tbody>
              </Table>
      }


      return (<div>
                Distributor View
                <Card>
                  <CardBody>
                  <Calendar
                  onChange={this.onChange}
                  value={this.state.date}/>
                  </CardBody>
                  <Button onClick ={this.checkBestByIngredients.bind(this)}>
                  Check Best By Dates of Ingredients Shipped at this date
                  </Button>
                </Card>
                {table}

                <Card>
                <CardBody>
                <div>
                  <label>What Ingredient Producer do you want to know more about?</label><br />
                  <input type="text" ref="prodID" />
                </div>
                <div>
                </div>

                <Button onClick ={this.displayIngredientProducerData.bind(this)}>
                Enter the Ingredient Producer ID
                </Button>

                </CardBody>
                {producerTable}

                </Card>

             </div>

)
    }


}

export default Buttons;
