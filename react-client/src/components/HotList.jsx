import React from "react";
import "../App.css";
import {
    Button,
    Collapse,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardSubtitle,
    CardColumns,
    Col,
    Row,
    NavLink,
    Input,
} from "reactstrap";
import Axios from "axios";
import { Transform } from "stream";

// This structures the FavRecipeItem component. props should be one recipe object.
class HotList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false,
            recipes: [],
        }
        this.toggleHot= this.toggleHot.bind(this);
        this.getSomeHotStuff= this.getSomeHotStuff.bind(this);
    }

    getSomeHotStuff() {
        
    }

    toggleHot() {
        return Axios.get('/hotList')
        .then(response => {
            this.setState({
                recipes: response.data,
                collapse: !this.state.collapse
            })
        })
    }

    render() {
        const { recipes } = this.state;
        const hotFive = recipes.map(recipe => (
            <Col sm='2'>
            <Card>
                <CardBody>
                    <CardImg src={recipe.recipe_image} top width='10%'>
                    </CardImg>
                    <CardTitle>{recipe.recipe_name}</CardTitle>
                    <CardSubtitle>{recipe.recipe_url}</CardSubtitle>
                </CardBody>
            </Card>
            </Col>
        ));
        return (
            <div>
            <Button className="fas fa-fire fa-2x float-right" color="danger" title="Top 5 Recipes" onClick={this.toggleHot}></Button>
            <Collapse isOpen={this.state.collapse}>
                <h5>TOP FIVE HOTTTTTTTEST RECIPES:</h5>
                <Row>
                    {hotFive}
                </Row>
            </Collapse>
            <hr/>
            </div>
        );
    }
};

export default HotList;
