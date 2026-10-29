import { useState, useEffect } from 'react'
import { supabase } from './utils/supabase'
import MealCard from './MealCard' 
import './App.css'
import "@picocss/pico/css/pico.css" 


function App() {
  const [meals, setMeals] = useState([])

  const loadMeals = async () => {
    const { data, error } = await supabase.from('meals').select()
    if (error) { 
      console.log(error.message)
      return
    }
    console.log(data)
    setMeals(data)
  }

    const addMeal = async (event) => {
      event.preventDefault()
      const form = event.target
      const meal = {
        name: form.name.value,
        guest: form.guest.value,
        servings: Number(form.servings.value),
    }
    const result = await supabase.from("meals").insert(meal)
    if (result.error) {
      console.log(result.error.message)
      return
    }
  }

  const [ingredients, setIngredients] = useState([])

  const loadIngredients = async () => {
    const { data, error } = await supabase.from('ingredients').select()
    if (error) { 
      console.log(error.message)
      return
    }
    console.log(data)
    setIngredients(data)
  }



  return (
    <div>
      <h1>Potluck</h1>
      <button onClick={loadMeals}>Load</button>
      {meals.map((meal) => <MealCard key={meal.id} meal={meal} />)}
      <br></br>
      <br></br>
        <form onSubmit={addMeal}>
          <h2>Want to add a meal?</h2>
          <input name="name" placeholder="Dish" />
          <input name="guest" placeholder="Your name" />
          <input name="servings" type="number" placeholder="Serves" />
          <button>Add</button>
        </form>

        <h2>Allergies?</h2>
        <button onClick={loadIngredients}>Load</button>
        {ingredients.map((ingredient) => <p key={ingredient.id}>{ingredient.name}</p>)}
      
    </div>
  )
}

export default App