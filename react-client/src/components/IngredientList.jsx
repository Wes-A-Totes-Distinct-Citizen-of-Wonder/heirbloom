import React, { Fragment } from "react";
import Ingredient from "./Ingredient.jsx";
import { Container, Row, Col, Button, CardColumns, CardDeck } from "reactstrap";
import NavBar from "./NavBar.jsx";
import HotList from "./HotList.jsx";
import { toggleHot } from "./HotList.jsx";

// this is the main page, which will display all of the regional/seasonal ingredients for the user.
class IngredientList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIngredients: [],
    }
    this.selectIngredient= this.selectIngredient.bind(this);
    this.removeIngredient= this.removeIngredient.bind(this);
    this.searchSelectedIngredients = this.searchSelectedIngredients.bind(this);
  }

  selectIngredient(ingredient) {
    const { selectedIngredients } = this.state;
    selectedIngredients.push(ingredient)
    this.setState({
      selectedIngredients: selectedIngredients
    })
    console.log(this.state.selectedIngredients);
  }

  removeIngredient(ingredient) {
    const { selectedIngredients } = this.state
    this.setState({
      selectIngredient: selectedIngredients.splice(selectedIngredients.indexOf(ingredient), 1)
    })
    console.log(this.state.selectedIngredients);
  }

  searchSelectedIngredients() {
    const obj = {}
    const { selectedIngredients } = this.state;
    // alert('this works!!!!')
    selectedIngredients.forEach(ing => {
      obj[ing] = '';
    })
    return this.props.handleRecipes(obj)
      .then(() => this.props.history.push("/recipe-list"))
      .catch(err => console.error(err));
  }

  render() {
  const {
    user,
    ingredients,
    userLocation,
    sessionZipcode,
    handleRecipes,
    addToFavorites,
    addToGroceryList,
  } = this.props;
  const { selectedIngredients } = this.state
  const { city } = userLocation;
  return (
    <Fragment>
      <NavBar user={user} searchSelectedIngredients={this.searchSelectedIngredients}/>
      <Container fluid>
        <Row className="mt-10 ml-1">
          <Col sm='11'>
            <h1 className="headline">
              Here&rsquo;s what&rsquo;s fresh in {city}.
            </h1>
          </Col>
          <Col sm='1'>
          </Col>
            {/* <ZipcodeModal userLocation={userLocation} /> */}
        </Row>
            <HotList addToFavorites={addToFavorites} user={user}/>
        <Row className="ml-1">
          <CardColumns>
          <Ingredient
            ingredients={ingredients}
            handleRecipes={handleRecipes}
            sessionZipcode={sessionZipcode}
            addToGroceryList={addToGroceryList}
            user={user}
            selectedIngredients={selectedIngredients}
            selectIngredient={this.selectIngredient}
            removeIngredient={this.removeIngredient}
          />
          </CardColumns>
        </Row>
      </Container>
    </Fragment>
  );
}
};

export default IngredientList;
