import React, { Component } from "react";
import "../App.css";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
  Table,
  Container,
  Collapse,
} from "reactstrap";
import axios from "axios";
import RecipeNotes from './RecipeNotes.jsx';

// This structures the FavRecipeItem component. props should be one recipe object.
class FavRecipeItem extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      collapse: false,
      notes: '',
    };
    this.toggleNotes = this.toggleNotes.bind(this);
    this.removeFavoritesAndRedirect = this.removeFavoritesAndRedirect.bind(this);
    this.saveRecipeNotes = this.saveRecipeNotes.bind(this);
  }
  // const { user, removeFromFavorites } = this.props;

  componentDidMount() {
    axios.get(`/api/notes?userId=${this.props.user.id}&recipeId=${this.props.favRecipe.id}`)
      .then(usersNotes => {
        console.log(usersNotes)
        this.setState({
          notes: usersNotes.data,
        })
      })
  }
  
  removeFavoritesAndRedirect (selectedRecipe) {
    this.props.removeFromFavorites(selectedRecipe)
    .then(() => console.log("Recipe is on it's way to the void."))
    .catch(err => console.error(err));
  };
  
  toggleNotes() {
    this.setState(state => ({ collapse : !state.collapse}));
  }

  saveRecipeNotes() {
    const { notes } = this.state;
    
    return axios.post('api/notes', {note: notes, recipeId: this.props.favRecipe.id, userId: this.props.user.id })
      .then((response) =>{
        console.log(response, 'the save RecipieNotes response');
        this.toggleNotes();
      })
  }

  render(){
    const { recipe_name, recipe_url, title, recipe_image, id } = this.props.favRecipe;
    const {state, notes } = this.state;
  return (
    <tbody>
      <tr>
        <td>
          <a
            href={recipe_url}
            className="float-left recipe-name"
            size="sm"
            color="warning"
            target="_blank"
          >
            {recipe_name}
          </a>
        </td>

        <td>
          <Button
            color="white"
            className="fas fa-heart float-right text-danger"
            onClick={() =>
              this.removeFavoritesAndRedirect([
                recipe_url,
                recipe_name,
                recipe_image,
                id
              ])
            }
          ></Button>
            <Button
            color="white"
            className="fas fa-scroll float-right text-f70f"
            onClick={() =>{this.toggleNotes()}}
          ></Button>
        </td>
      </tr>
      {/* <tr> */}
      <Collapse isOpen={this.state.collapse}>
        <Row>
          <Col sm='10'>
            <Input type='textarea' placeholder="write your notes here" bsSize="lg" value={notes} onChange={e => this.setState({notes: e.target.value})} />
          </Col>
          <Col sm='2'>
            <tr>
              <td>
              <Button className='card-button float-right' onClick={this.saveRecipeNotes} data-toggle="tooltip" title="Save Note"><i className='fas fa-utensils icon-food ml-auto'>  </i> save</Button> 
              </td>
            </tr>
          </Col>
        </Row>
      </Collapse>
      {/* </tr> */}
    </tbody>
  );
  };
};

export default FavRecipeItem;
