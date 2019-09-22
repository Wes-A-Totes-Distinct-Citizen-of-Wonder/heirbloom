import React, { Component } from "react";
import "../App.css";

const RecipeNotes = (props) => {

const { notes } = props;  
    return (
        <tr><td>{notes}</td></tr>
    )
}

export default RecipeNotes;