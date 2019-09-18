import React from "react";
import "../App.css";
import {
    Button,
    Table,
} from "reactstrap";
import Axios from "axios";

// This structures the FavRecipeItem component. props should be one recipe object.
class GroceryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          groceries: []
        }
        this.toggleBasket= this.toggleBasket.bind(this);
       
    }

    toggleBasket() {

    }

    render() {
        return(
            <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
           
        );
    }
}

export default GroceryList;