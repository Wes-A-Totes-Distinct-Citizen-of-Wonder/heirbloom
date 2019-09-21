import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import IngredientList from "./IngredientList.jsx";
import "../App.css";
import {
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

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleFavRecipes = this.handleFavRecipes.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout() {
    // remove the user's token
    sessionStorage.removeItem("token");
    // Redirect them to the home page
    this.props.history.push("/");
  }

  handleProfile() {
    this.props.history.push("/profile");
  }

  handleFavRecipes() {
    this.props.history.push("/fav-recipes");
  }

  handleSearch() { 
    // alert('DO IT!')
    this.props.searchSelectedIngredients()
      // .then(() => props.history.push("/recipe-list"))
      // .catch(err => console.error(err));
    // this.props.searchSelecteIngredients();
    // this.props.history.push("/recipe-list")
  }

  render() {
    const { history, user } = this.props;
    return (
      <div className="fixed-top container" color="#F7882F">
        <Navbar light expand="xs">
          <NavbarBrand href="/" id="logo" className="pl-2">
            Heir<span id="bloom">bloom</span>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Nav className="ml-auto" navbar>
            {/* if user props is passed down (meaning a user is logged-in), show this component) */}
            {user && (
              <NavItem>
                <NavLink onClick={this.handleSearch}>
                  <i
                    className="fas fa-search fa-2x"
                    id="search-icon"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Search selected ingredients"
                  ></i>
                </NavLink>
              </NavItem>
            )}
            {user && (
              <NavItem>
                <NavLink onClick={() => history.push("/grocery-list")}>
                  <i
                    className="fas fa-shopping-cart fa-2x"
                    id="grocery-icon"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Time to make some groceries"
                  ></i>
                </NavLink>
              </NavItem>
            )}
            {user && (
              <NavItem>
                <NavLink onClick={() => history.push("/market-list")}>
                  <i
                    className="fas fa-map-marker-alt fa-2x"
                    id="map-icon"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Markets near you"
                  ></i>
                </NavLink>
              </NavItem>
            )}
            {user && (
              <NavItem>
                <NavLink onClick={() => history.push("/fav-recipes")}>
                  <i
                    className="far fa-heart fa-2x"
                    id="fav-icon"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Favorites"
                  ></i>
                </NavLink>
              </NavItem>
            )}
            {user && (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="pr-2" nav caret>
                  <i className="fas fa-user fa-2x"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.handleProfile}>
                    Edit Profile
                  </DropdownItem>
                  <DropdownItem onClick={this.handleFavRecipes}>
                    View Favorites
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.handleLogout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavBar);
