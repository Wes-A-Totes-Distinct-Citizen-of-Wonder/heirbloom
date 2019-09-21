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
import Swal from "sweetalert2";

// This renders an individual ingredient card
const Ingredient = props => {
  
  const { addToGroceryList, handleRecipes, user, selectedIngredients, selectIngredient, removeIngredient } = props

  const handleRecipesAndRedirect = selectedIngredient => {
    // const { handleRecipes } = props;
    // use App.Jsx's handleRecipes function which sends an api request to get the recipes with the selectedIngredient
    handleRecipes(selectedIngredient)
      .then(() => props.history.push("/recipe-list"))
      .catch(err => console.error(err));
  };

  const addIngredient = (ingredientId, userId) => {
    document.getElementById(`${ingredientId}button`).disabled = true;
    Swal.fire({text: 'Produce added to grocery List', type: 'success', confirmButtonColor: '#F7882F' })
    addToGroceryList(ingredientId, userId)
  }

  const imgSelect = (ingredient) => {
    const selected = document.getElementById(ingredient.id).style;
    if (selected.borderWidth === '4px') {
      selected.borderWidth = '0px';
      removeIngredient(ingredient.Name);
    } else if (selectedIngredients.length < 3){
      selected.borderWidth = '4px';
      selected.borderColor = 'rgb(224, 109, 31)';
      selectIngredient(ingredient.Name);
    } else {
      Swal.fire({text:'You already have 3 items selected, please remove one if you wish to add it', type: error})
    }
  }

  return props.ingredients.map(ingredient => {
    // const { addToGroceryList } = props;
    return (
      // <Col sm="3"
      //   // xl={{ size: 3, offset: 0 }}
      //   // md={{ size: 4, offset: 0 }}
      //   // sm={{ size: 6 }}
      //   // xs={{ size: 12 }}
      //   className="mb-3"
      // >
        <Card className='card-pointer' id={ingredient.id} key={ingredient.id} >
          <CardImg className='card-img' top width="100%" src={ingredient.URL} style={{cursor: 'pointer'}} alt="Card image cap" onClick={() => {imgSelect(ingredient)}}/>
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
      // </Col>
    );
  });
};

export default withRouter(Ingredient);
