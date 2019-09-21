import React from "react";
import { withRouter } from "react-router-dom";
import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Button
} from "reactstrap";

// This renders an individual ingredient card
const Ingredient = props => {
  
  const { addToGroceryList, handleRecipes, user } = props

  const handleRecipesAndRedirect = selectedIngredient => {
    // const { handleRecipes } = props;
    // use App.Jsx's handleRecipes function which sends an api request to get the recipes with the selectedIngredient
    handleRecipes(selectedIngredient)
      .then(() => props.history.push("/recipe-list"))
      .catch(err => console.error(err));
  };

  const addIngredient = (ingredientId, userId) => {
    document.getElementById(`${ingredientId}button`).disabled = true;
    addToGroceryList(ingredientId, userId)
  }

  return props.ingredients.map(ingredient => {
    // const { addToGroceryList } = props;
    return (
      <Col
        xl={{ size: 3, offset: 0 }}
        md={{ size: 4, offset: 0 }}
        sm={{ size: 6 }}
        xs={{ size: 12 }}
        className="mb-3"
      >
        <Card id="ingredient-card" key={ingredient.id}>
          <CardImg top width="100%" src={ingredient.URL} alt="Card image cap" />
          <CardBody className="bg-light">
            <CardTitle className="card-title">{ingredient.Name}
              <Button id={ingredient.id + 'button'} className="float-right ml-auto card-button" disabled={false} onClick={() => addIngredient(ingredient.id, user.id)}><i className="fas fa-shopping-cart" title="add to grocery list" >+</i></Button>
            </CardTitle>
            <CardText>{ingredient.Description}</CardText>
            <hr></hr>
            <Button
              onClick={() => props.history.push("/market-list")}
              className="card-button col-12"
            >
              Where to find them
            </Button>
            <Button
              onClick={() => handleRecipesAndRedirect(ingredient.Name)}
              className="card-button col-12"
            >
              How to prepare them
            </Button>
          </CardBody>
        </Card>
      </Col>
    );
  });
};

export default withRouter(Ingredient);
