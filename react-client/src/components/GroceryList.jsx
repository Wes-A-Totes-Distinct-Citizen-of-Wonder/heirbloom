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
        this.makeGroceries= this.makeGroceries.bind(this);
    }
    componentDidMount() {
      window.scrollTo(0, 0);
      this.makeGroceries();
    }

    toggleBasket () {

    }

    makeGroceries() {
      const { user } = this.props;
      return Axios.get(`/api/groceryList?ID=${user.id}`)
      .then(response => {
        this.setState({
          groceries: response.data
        })
      })
    }

    //pass ingredientsId, userId, to david on back end

    render() {
      const { groceries } =this.state;
      const groceryItem = groceries.map(grocery => (
              <tr>
                <td>{grocery.URL}</td>
                <td>{grocery.Name}</td>
              </tr>
      ))
        return(
          <Fragment>
              <NavBar user={this.props.user}></NavBar>
            <Container>
          <Row className='mt-10 ml-1'>
              <h3>GROCERY LIST</h3>
          <Table bordered hover >
            <thead style={{backgroundColor: '#F7882F', color: 'white'}}>
              <tr>
              <th>Image</th>
              <th>Ingredient</th>
              </tr>
            </thead>
            <tbody>
              {groceryItem}
            </tbody>
          </Table>
          </Row>
            </Container>
          </Fragment>
           
        );
    }
}

export default withRouter(GroceryList);