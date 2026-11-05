function MealCard({ meal, onRemove }) {
  const remove = () => {
    onRemove(meal.id);
  };

  return (
    <div className="card">
      <h2>{meal.name}</h2>
      <p>Brought by {meal.guest}</p>
      <button onClick={remove}>Remove</button>
    </div>
  );
}

export default MealCard;
