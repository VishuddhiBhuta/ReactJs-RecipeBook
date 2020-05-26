import React from 'react'
import './recipeBlock.css'


export default class RecipeBlock extends React.Component {

    render() {
        if (this.props.recipesList == undefined && this.props.recipesList.length === 0) {
            return null;
        }

        let viewStyle = {}
        let editStyle = {}

        if (this.props.isEditable) {
            viewStyle.display = "none"
        } else {
            editStyle.display = "none"
        }

        return (
            this.props.recipesList.map((list, parentIndex) => {
                return (
                    <div className="recipe-details" key={list.recipeText + parentIndex}>
                        <button className="close-btn" onClick={() => { this.props.removeRecipe(parentIndex) }}>&times;</button>
                        <div className="recipe-title">{this.props.recipesList[parentIndex].recipeText}</div>
                        <ul className="ingredients-list">
                            {list.ingredient &&
                                list.ingredient.map((ingredients, index) => {
                                    return (
                                        <li key={ingredients + index}>

                                            <input type="text"
                                                name="editedtext"
                                                value={this.props.editedtext}
                                                isEditable={!this.props.isEditable}
                                                style={editStyle}
                                                onChange={this.props.inputHandleChange} />

                                            <div style={viewStyle}>
                                                {ingredients.ingredientText}
                                            </div>

                                            <div className="action-buttons">
                                                <button className="edit" onClick={() => this.props.editItem(index)}>
                                                    {this.props.isEditable ? "Save" : "Edit"}
                                                </button>
                                                <button className="remove" onClick={() => { this.props.removeItem(parentIndex, index) }}>Remove</button>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <input type="text"
                            name="moreIngredients"
                            value={this.props.moreIngredients}
                            placeholder="Add more Ingredients here.."
                            className="form-control"
                            onChange={this.props.inputHandleChange}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    this.props.addItem(parentIndex)
                                }
                            }} />
                    </div>
                )
            })

        )
    }
}