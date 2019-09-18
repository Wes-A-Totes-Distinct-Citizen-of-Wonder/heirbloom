import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import "../App.css";
import {
  Button,
  Table,
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
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
    componentDidMount() {
      window.scrollTo(0, 0);
    }

    toggleBasket() {

    }

    //pass ingredientsId, userId, to david on back end

    render() {
        return(
          <Fragment>
              <NavBar user={this.props.user}></NavBar>
            <Container fluid>
          <Row className='mt-10 ml-1'>
              <h3>GROCERY LIST</h3>
          <Table bordered hover>
            <thead>
              <tr>
              <th>Image</th>
              <th>Ingredient</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>Larry</td>
                <td>the Bird</td>
              </tr>
            </tbody>
          </Table>
          </Row>
            </Container>
          </Fragment>
           
        );
    }
}

export default withRouter(GroceryList);