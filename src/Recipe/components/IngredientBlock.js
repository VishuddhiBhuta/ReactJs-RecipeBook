import React from 'react'
import './recipeBlock.css'


export default class IngredientBlock extends React.Component {
    state = {
        isEditable: false,
        editedText: "",
        editIndex: -1
    }

    editIngredient = (editIngIndex) => {

        let { parentIndex, recipe } = this.props

        if (this.state.editIndex > -1) {
            //SaveMode

            // copy elements
            let newList = [recipe]
            let newArr = [...newList]
            let currentRecipe = newArr[parentIndex]

            // copy existing ingt
            let inglist = [...currentRecipe.ingredient]

            let newingList = {
                ingredientText: this.state.editedText
            }

            inglist[editIngIndex] = newingList

            let object = {
                ...currentRecipe,
                ingredient: inglist
            }

            newArr.splice(parentIndex, 1, object)

            this.setState({
                editIndex: -1,
                //recipesList: [],
            });

            console.log(newArr)

        } else {
            //Edit Mode
            this.setState({
                editIndex: editIngIndex,
                editedText: this.props.ingredients.ingredientText
            })
            // console.log(this.state.editIndex)
        }
    }

    editHandleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render = () => {

        let { ingredients, index, parentIndex, removeIngredient, editIngredient, editedText } = this.props

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