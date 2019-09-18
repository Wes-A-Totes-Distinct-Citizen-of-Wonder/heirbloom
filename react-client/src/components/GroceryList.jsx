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
  DropdownItem
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
            <NavBar user={this.props.user} />
            <div>GROCERY LIST</div>
          </Fragment>

         
      //       <Table striped>
      //   <thead>
      //     <tr>
      //       <th>#</th>
      //       <th>First Name</th>
      //       <th>Last Name</th>
      //       <th>Username</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     <tr>
      //       <th scope="row">1</th>
      //       <td>Mark</td>
      //       <td>Otto</td>
      //       <td>@mdo</td>
      //     </tr>
      //     <tr>
      //       <th scope="row">2</th>
      //       <td>Jacob</td>
      //       <td>Thornton</td>
      //       <td>@fat</td>
      //     </tr>
      //     <tr>
      //       <th scope="row">3</th>
      //       <td>Larry</td>
      //       <td>the Bird</td>
      //       <td>@twitter</td>
      //     </tr>
      //   </tbody>
      // </Table>
           
        );
    }
}

export default withRouter(GroceryList);