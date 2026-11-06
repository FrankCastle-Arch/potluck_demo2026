import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";
import MealCard from "./MealCard";
import "./App.css";
import "@picocss/pico/css/pico.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const loadMeals = async () => {
    const { data, error } = await supabase.from("meals").select();
    if (error) {
      console.log(error.message);
      return;
    }
    console.log(data);
    setMeals(data);
  };

  const loadIngredients = async () => {
    const { data, error } = await supabase.from("ingredients").select();
    if (error) {
      console.log(error.message);
      return;
    }
    console.log(data);
    setIngredients(data);
  };

  const addMeal = async (event) => {
    event.preventDefault();
    const form = event.target;
    const meal = {
      name: form.name.value,
      guest: form.guest.value,
      servings: Number(form.servings.value),
    };
    const result = await supabase.from("meals").insert(meal);
    if (result.error) {
      console.log(result.error.message);
      return;
    }
    form.reset();
    loadMeals();
  };

  const removeMeal = async (id) => {
    const result = await supabase.from("meals").delete().eq("id", id);
    if (result.error) {
      console.log(result.error.message);
      return;
    }
    loadMeals();
  };

  const resetPage = () => {
  setMeals([]);
};

  return (
    <div>
      <h1>Plate Expectations</h1>
      <button onClick={loadMeals}>What are we eating?</button>
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} onRemove={removeMeal} />
      ))}

      <br></br>
      <br></br>
      <form onSubmit={addMeal}>
        <h3>Sign up below so we don't end up with eleven bags of chips.</h3>
        <input name="name" placeholder="Dish" />
        <input name="guest" placeholder="Your name" />
        <input name="servings" type="number" placeholder="Serves" />
        <button>Add</button>
      </form>
      <br></br>
      <button className="secondary" onClick={resetPage}>Reset</button>
    </div>
  );
}

export default App;