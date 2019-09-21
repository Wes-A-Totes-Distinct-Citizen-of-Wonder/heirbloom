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
import axios from "axios";
import { Transform } from "stream";

// This structures the FavRecipeItem component. props should be one recipe object.
class HotList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false,
            recipes: [],
        }
        this.toggleHot = this.toggleHot.bind(this);
    }

    toggleHot() {
        return axios.get('/hotList')
            .then(response => {
                this.setState({
                    recipes: response.data,
                    collapse: !this.state.collapse
                })
            })
    }

    render() {
        const { recipes } = this.state;
        const { user, addToFavorites } = this.props;
        // const { title, image_url, publisher, source_url } = recipe || {};
        const hotFive = recipes.map(recipe => (
            <Col sm='2'>
                <Card>
                        <CardImg src={recipe.recipe_image} top width='10%'>
                        </CardImg>
                    <CardBody>
                        <CardTitle>
                            <a href={recipe.recipe_url} target="_blank"><h5>
                            {recipe.recipe_name}
                            </h5>
                            </a>
                            <Button
                                color="white"
                                className="far fa-heart float-right text-danger"
                                onClick={() =>
                                    addToFavorites([recipe.recipe_name, recipe.recipe_image, recipe.recipe_url, user.id])
                                }
                            ></Button></CardTitle>
                        <CardSubtitle>Favorited by {recipe.count} users</CardSubtitle>
                    </CardBody>
                </Card>
            </Col>
        ));
        return (
            <div>
                <Button className="fas fa-fire fa-2x float-right" color="danger" title="Top 5 Recipes" onClick={this.toggleHot}></Button>
                <Collapse isOpen={this.state.collapse}>
                    <h2 style={{color: 'rgb(235, 28, 49)', fontFamily: 'Abril Fatface', fontWeight: '900'}}>Top Five Favorite Recipes:</h2>
                    <Row>
                        {hotFive}
                    </Row>
                </Collapse>
                <hr />
            </div>
        );
    }
};

export default HotList;
