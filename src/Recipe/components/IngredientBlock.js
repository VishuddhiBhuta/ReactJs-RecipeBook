import React from 'react'
import './recipeBlock.css'


export default class IngredientBlock extends React.Component {
    state = {
        isEditable: false,
        editedText: "",
        editIndex: -1,
        // recipesList: this.props.recipesList
    }

    editIngredient = (pIndex, editIngIndex) => {

        console.log(this.props.recipesList)

        let { parentIndex, recipe } = this.props

        if (this.state.editIndex > -1) {
            //SaveMode

            // copy elements
            // let newArr = [...this.props.recipesList]
            // let currentRecipe = newArr[parentIndex]

            // console.log("Current Array", newArr, "Current Index", parentIndex, "Current Recipe", currentRecipe.ingredient)

            // copy existing ingt
            let inglist = [...recipe.ingredient]

            console.log("New ing LIst", inglist)

            let newingList = {
                ...inglist,
                ingredientText: this.state.editedText
            }

            console.log("New updated Text", newingList)

            inglist[editIngIndex] = newingList

            let newRecipe = {
                ...recipe,
                ingredient: inglist
            }

            console.log("Updated Recipe", newRecipe)

            //recipe.splice(parentIndex, 1, newRecipe)

            this.setState({
                editIndex: -1,
                // recipesList: newArr
            });

            this.props.updateRecipeList(parentIndex, newRecipe)

            // console.log("Old Array", this.props.recipesList)
            console.log("New Edited Array", recipe)

        } else {
            //Edit Mode
            this.setState({
                editIndex: editIngIndex,
                editedText: this.props.ingredients.ingredientText
            })
        }
    }

    editHandleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render = () => {

        let { ingredients, index, parentIndex, removeIngredient, editedText } = this.props

        return (
            <li>
                {this.state.isEditable ?
                    <input type="text" name="editedText" onChange={this.editHandleChange} defaultValue={editedText} value={this.state.editedText} />
                    :

                    <div>
                        {ingredients.ingredientText}
                    </div>
                }
                <div className="action-buttons">
                    <button className="edit"
                        onClick={() => {
                            this.editIngredient(parentIndex, index)
                            this.setState({
                                isEditable: !this.state.isEditable,
                            })
                        }}>
                        {this.state.isEditable ? "Save" : "Edit"}
                    </button>
                    <button className="remove" onClick={() => { removeIngredient(parentIndex, index) }}>Remove</button>
                </div>
            </li>
        )
    }
}