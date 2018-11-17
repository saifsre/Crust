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
            shipped_date: "123",
            bb_date: '11',},
            {
              iName: "Mustard",
              shipped_date: "234",
              bb_date: '11',},
              {
                iName: "Mustard",
                shipped_date: "123",
                bb_date: '11',},
                {
                  iName: "Mustard",
                  shipped_date: "123",
                  bb_date: '11',},
                  {
                    iName: "Mustard",
                    shipped_date: "123",
                    bb_date: '11',}],

          IngredientProducerInfo:[{
            did: 123,
            prodid: 200,
            address:"West 8th 12",
            phone:123456792
          },
          {
            did: 456,
            prodid: 400,
            address:"Meep Avenue",
            phone:68371939
          }],
          date: new Date()
      };

    }



    componentDidMount(){
      //this.setState();
    }

    checkBestByIngredients(){
      alert(this.state.date)
      // this.state.date is accessible from here and gives the date clicked on the Calendar
      // Use this data to store the right data onto the state
      this.setState({btnClicked: !this.state.btnClicked})
    }

    displayIngredientProducerData(){
      this.setState({prodButton: !this.state.prodButton})
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
                  <td> <strong>{ingredient.shipped_date}</strong></td>
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
        alert(this.refs.prodID.value)
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
                Check Best By Dates of Ingredients Shipped at this date (Enter ID)
                </Button>

                </CardBody>
                {producerTable}

                </Card>

             </div>

)
    }


}

export default Buttons;
