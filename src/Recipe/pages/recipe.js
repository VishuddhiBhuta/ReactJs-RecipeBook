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
                        ingredientText: "abcsds"
                    },
                    {
                        ingredientText: "fgrerkj"
                    }
                ]
            }
        ],
        recipeText: '',
        ingredientText: "",
        moreIngredients: "",
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
            ingredient: filterItems
        }

        newLists[removeParentIndex].ingredient = filterLists.ingredient

        this.setState({
            recipesList: newLists
        });
    }

    addItem = (parentIndex, moreIngredients) => {

        if (moreIngredients.length === 0) return

        // copy elements
        let newArr = [...this.state.recipesList]
        let currentRecipe = newArr[parentIndex]

        console.log(newArr[parentIndex])

        let splittedValues = moreIngredients.split(",")

        // copy existing ingt
        let inglist = [...currentRecipe.ingredient]
        splittedValues.forEach((value) => {
            inglist.push({
                ingredientText: value
            })
        })

        let object = {
            ...currentRecipe,
            ingredient: inglist
        }
        newArr.splice(parentIndex, 1, object)

        this.setState({
            recipesList: newArr,
        });

    }

    updateRecipeList = (updatedIndex, updatedRecipe) => {
        let updatedArr = [...this.state.recipesList]
        updatedArr.splice(updatedIndex, 1, updatedRecipe)
        this.setState({
            recipesList: updatedArr
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
                {this.state.recipesList.map((recipe, index) => {
                    return (
                        <RecipeBlock
                            recipe={recipe}
                            removeRecipe={this.removeRecipe}
                            addIngredient={this.addItem}
                            removeIngredient={this.removeItem}
                            key={index}
                            parentIndex={index}
                            recipesList={this.state.recipesList}
                            updateRecipeList={this.updateRecipeList} />
                    )
                })}
            </div>
        )
    }
}