import React from "react";
import "../App.css";
import {
    Button,
    Collapse,
    Input,
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
            <div></div>
        );
    }
}

export default GroceryList;