import React from 'react'
import './recipeBlock.css'
import IngredientBlock from './IngredientBlock'


export default class RecipeBlock extends React.Component {
    state = {
        moreIngredients: ""
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        let { recipe, parentIndex, removeRecipe, addIngredient, removeIngredient, editIngredient, editedText } = this.props

        return (
            <div className="recipe-details">
                <button className="close-btn" onClick={() => { removeRecipe(parentIndex) }}>&times;</button>
                <div className="recipe-title">{recipe.recipeText}</div>
                <ul className="ingredients-list">
                    {recipe.ingredient &&
                        recipe.ingredient.map((ingredients, index) => {
                            return (
                                <IngredientBlock
                                    recipe={recipe}
                                    ingredients={ingredients}
                                    index={index}
                                    key={index}
                                    parentIndex={parentIndex}
                                    removeIngredient={removeIngredient}
                                    editIngredient={editIngredient}
                                    editedText={editedText} />
                            )
                        })
                    }
                </ul>
                <input type="text"
                    name="moreIngredients"
                    value={this.state.moreIngredients}
                    placeholder="Add more Ingredients here.."
                    className="form-control"
                    onChange={this.handleOnChange}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            addIngredient(parentIndex, this.state.moreIngredients);
                            this.setState({
                                moreIngredients: ""
                            })
                        }
                    }} />
            </div>
        )
    }
}