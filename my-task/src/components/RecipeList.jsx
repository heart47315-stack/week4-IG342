import RecipeCard from "./RecipeCard";

function RecipeList({
  recipes,
  favorites,
  onFavorite,
  onSelect,
  onDelete
}) {
  if (recipes.length === 0) {
    return (
      <div className="empty">
        <div>🍽️</div>
        <h2>ไม่พบเมนูอาหาร</h2>
        <p>ลองค้นหาด้วยชื่อเมนูอื่น</p>
      </div>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.includes(recipe.id)}
          onFavorite={onFavorite}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default RecipeList;