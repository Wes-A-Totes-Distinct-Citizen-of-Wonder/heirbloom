import React, { Component } from "react";
import "../App.css";

const RecipeNotes = (props) => {

const { notes } = props;  
    return (
        <td>{notes}</td>
    )
}

export default RecipeNotes;