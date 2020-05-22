import React from 'react'
import './RecipeDetails.css'

export default class RecipeDetails extends React.Component {
    render() {
        if (this.props.recipesList == undefined && this.props.recipesList.length === 0) {
            return null;
        }
        return (
            this.props.recipesList.map((list, index) => {
                console.log(this.props.recipesList)
                return (
                    <div className="recipe-details" key={this.list + index}>
                        <button className="close-btn">&times;</button>
                        <div className="recipe-title">{this.props.recipesList[index].recipeText}</div>
                        <ul className="ingredients-list">
                            <li>
                                Ingredients
                                <div className="action-buttons">
                                    <button className="edit">Edit</button>
                                    <button className="remove">Remove</button>
                                </div>
                            </li>
                        </ul>
                        <input type="text" placeholder="Add more Ingredients here.." className="form-control" />
                    </div>
                )
            })

        )
    }
}