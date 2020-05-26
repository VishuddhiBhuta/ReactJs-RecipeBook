import React from 'react'
import './recipe.css'
import RecipeBlock from '../components/RecipeBlock'

export default class Recipe extends React.Component {
    state = {
        recipesList: [
            {
                recipeText: "asdsad",
                ingredient: [
                    {
                        ingredientText: "asdhas"
                    },
                    {
                        ingredientText: "hsdkjf"
                    }
                ]
            }
        ],
        recipeText: '',
        ingredientText: "",
        moreIngredients: "",
        editedtext: "",
        isEditable: false
    }

    inputHandleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addRecipe = (Index) => {
        if (this.state.recipeText.length === 0 || this.state.ingredientText.length === 0) return

        let splittedValues = this.state.ingredientText.split(",")

        console.log("splitted Array", splittedValues)
        let newArr = []
        splittedValues.forEach((value) => {
            newArr.push({
                ingredientText: value
            })
        })


        console.log("mewArr", newArr)

        let newObj = {
            recipeText: this.state.recipeText,
            ingredient: [...newArr]
        }

        console.log("newObj", newObj)

        this.setState({
            recipesList: [...this.state.recipesList, newObj],
            recipeText: "",
            ingredientText: "",
        });

        // console.log(newObj)
    }

    removeRecipe = (removeIndex) => {
        let filterRecipes = this.state.recipesList.filter((list, index) => (index !== removeIndex))
        this.setState({
            recipesList: filterRecipes
        })
    }

    removeItem = (removeParentIndex, removeIndex) => {
        let removeItem = this.state.recipesList[removeParentIndex].ingredient;
        let filterItems = removeItem.filter((item, index) => (
            index !== removeIndex
        ));

        let newLists = [...this.state.recipesList];
        let filterLists = {
            ingredient: [
                {
                    ingredientText: filterItems
                }
            ]
        }

        console.log(filterLists.ingredient)

        newLists[removeParentIndex].ingredient = filterLists.ingredient[removeIndex].ingredientText

        this.setState({
            recipesList: newLists
        });

        console.log(newLists[removeParentIndex].ingredient)
    }

    addItem = (parentIndex, addIndex) => {

        if (this.state.moreIngredients.length === 0) return

        let newArr = [...this.state.recipesList]

        let splittedValues = this.state.moreIngredients.split(",")

        let indList = [...this.state.recipesList[parentIndex].ingredient]

        splittedValues.forEach((value) => {
            indList.push({
                ingredientText: value
            })
        })

        let newObj = {
            ingredient: [...indList]
        }

        newArr[parentIndex].ingredient = newObj.ingredient

        this.setState({
            recipesList: newArr,
            moreIngredients: ""
        });

        console.log(newArr)

    }

    editItem = (editIndex) => {
        console.log(editIndex)
        this.setState({
            isEditable: !this.state.isEditable,
        })
    }

    render() {
        return (
            <div className="recipe-wrapper">
                <h2>Add Recipes</h2>
                <div className="form-group">
                    <input type="text" className="form-control" name="recipeText" onChange={this.inputHandleChange} value={this.state.recipeText} placeholder="Enter recipe name" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="ingredientText" onChange={this.inputHandleChange} value={this.state.ingredientText} placeholder="Enter ingredients name seperated with commas" />
                </div>
                <button className="btn-primary" onClick={() => { this.addRecipe() }}>Add Recipe</button>
                <RecipeBlock
                    recipesList={this.state.recipesList}
                    removeRecipe={this.removeRecipe}
                    removeItem={this.removeItem}
                    inputHandleChange={this.inputHandleChange}
                    moreIngredients={this.state.moreIngredients}
                    addItem={this.addItem}
                    editedtext={this.state.editedtext}
                    editItem={this.editItem}
                    isEditable={this.state.isEditable} />

            </div>
        )
    }
}