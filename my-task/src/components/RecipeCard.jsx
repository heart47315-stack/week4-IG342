function RecipeCard({
  recipe,
  isFavorite,
  onFavorite,
  onSelect
}) {
  return (
    <article className="recipe-card">
      <div className="recipe-image">
        <span>{recipe.emoji}</span>

        <button
          className={`heart ${isFavorite ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(recipe.id);
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="recipe-content">
        <div className="recipe-category">
          {recipe.category}
        </div>

        <h3>{recipe.name}</h3>

        <p>{recipe.description}</p>

        <div className="recipe-info">
          <span>⏱️ {recipe.time} นาที</span>
          <span>📊 {recipe.difficulty}</span>
        </div>

        <button
          className="view-button"
          onClick={() => onSelect(recipe)}
        >
          ดูสูตรอาหาร →
        </button>
      </div>
    </article>
  );
}

export default RecipeCard;