import React from 'react'
import './recipe.css'
import RecipeDetails from '../components/RecipeDetails'

export default class Recipe extends React.Component {
    state = {
        recipesList: [],
        recipeText: '',
        ingredientText: '',
        IngredientLists: []
    }

    inputHandleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addrecipe = () => {
        if (this.state.recipeText.length === 0 || this.state.ingredientText.length === 0) return

        let newObj = {
            recipeText: this.state.recipeText,
            ingredientText: this.state.ingredientText
        }

        this.setState({
            recipesList: [newObj, ...this.state.recipesList],
            recipeText: "",
            ingredientText: ""
        });
    }

    render() {
        return (
            <div className="recipe-wrapper">
                <h2>Add Recipes</h2>
                <div className="form-group">
                    <input type="text" className="form-control" name="recipeText" onChange={this.inputHandleChange} value={this.state.recipeText} placeholder="Enter Recipe Name" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="ingredientText" onChange={this.inputHandleChange} value={this.state.ingredientText} placeholder="Enter Ingredients Name" />
                </div>
                <button className="btn-primary" onClick={() => { this.addrecipe() }}>Add Recipe</button>
                <RecipeDetails recipesList={this.state.recipesList} />

            </div>
        )
    }
}