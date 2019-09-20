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
import axios from "axios";

// This structures the FavRecipeItem component. props should be one recipe object.
class GroceryList extends React.Component {
    constructor(props) {
        super(props)
        const { user } =this.props;
        this.state = {
          groceries: [],
          clearProduce: [],
        }
        this.toggleBasket= this.toggleBasket.bind(this);
        this.makeGroceries= this.makeGroceries.bind(this);
        this.clearGrocerisList = this.clearGrocerisList.bind(this);
        this.conditionalRender = this.conditionalRender.bind(this);
    }
    componentDidMount() {
      window.scrollTo(0, 0);
      this.makeGroceries();
    }

    toggleBasket (groceryId) {
      const { clearProduce } = this.state;
      console.log('Carin bullies me');
      let ele = document.getElementById(groceryId)
      if(ele.style.backgroundColor === 'white'){
        ele.style.backgroundColor = '#A9A9A9';
       this.setState.clearProduce = clearProduce.push(groceryId);
      }else{
        ele.style.backgroundColor = 'white';
        let remove = clearProduce.indexOf(groceryId);
        let leaveGrocery = clearProduce.splice(remove, 1);
        this.setState.clearProduce = leaveGrocery;
      }
    }

    clearGrocerisList () {
      console.log('success');
      return axios.post('/api/removeGroceries', {userId: this.props.user.id, ingredientIds: this.state.clearProduce})
        .then((result) =>{
          console.log(result, 'Ingredients removed from Grocery List')
          window.location.reload();
        })
    }

    makeGroceries() {
      return axios.get(`/api/groceryList?id=${this.props.user.id}`)
      .then(response => {
        this.setState({
          groceries: response.data
        })
      })
    }

    conditionalRender() {
      const { groceries } = this.state;
      if(groceries.length === 0){
        return <h3>There is no Produce in your list</h3>
      } else {
      const groceryItem = groceries.map(grocery => (
        <tr id={grocery.id} style={{backgroundColor: 'white'}} onClick={() => {this.toggleBasket(grocery.id)}}>
          <td>
            <img src={grocery.URL} height='40%' crop='fill'>
            </img>
          </td>
          <td>{grocery.Name}</td>
        </tr>
       ));
       return groceryItem;  
      }
    }

    //pass ingredientsId, userId, to david on back end

    render() {
      const { groceries, backGround } =this.state;
        return(
          <Fragment>
              <NavBar user={this.props.user}></NavBar>
            <Container>
          <Row className='mt-10 ml-1'>
          <Button href='#' className="card-button mr-3 mb-3 sm-12" onClick={() => this.clearGrocerisList()}><i className="fas fa-shopping-basket" data-toggle="tooltip" data-placement="top" title="Click to remove already selected produce " ></i></Button><h3>Grocery List</h3>
          <Table bordered hover >
            <thead style={{backgroundColor: '#F7882F', color: 'white'}}>
              <tr>
              <th>Image</th>
              <th>Ingredient</th>
              </tr>
            </thead>
            <tbody>
              {this.conditionalRender()}
            </tbody>
          </Table>
          </Row>
            </Container>
          </Fragment>
           
        );
    }
}

export default withRouter(GroceryList);