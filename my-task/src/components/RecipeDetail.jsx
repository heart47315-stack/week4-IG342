import CookingTimer from "./CookingTimer";

function RecipeDetail({
  recipe,
  isFavorite,
  onFavorite,
  onClose
}) {
  if (!recipe) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="recipe-detail"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-button"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="detail-header">
          <div className="detail-emoji">
            {recipe.emoji}
          </div>

          <div>
            <span className="detail-category">
              {recipe.category}
            </span>

            <h2>{recipe.name}</h2>

            <p>{recipe.description}</p>

            <div className="detail-info">
              <span>⏱️ {recipe.time} นาที</span>
              <span>📊 {recipe.difficulty}</span>
            </div>
          </div>
        </div>

        <button
          className={`favorite-button ${
            isFavorite ? "favorite-active" : ""
          }`}
          onClick={() => onFavorite(recipe.id)}
        >
          {isFavorite
            ? "❤️ ลบจากรายการโปรด"
            : "🤍 เพิ่มในรายการโปรด"}
        </button>

        <CookingTimer initialMinutes={recipe.time} />

        <div className="detail-section">
          <h3>🛒 วัตถุดิบ</h3>

          <ul className="ingredients">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <span>✓</span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="detail-section">
          <h3>👨‍🍳 วิธีทำ</h3>

          <div className="steps">
            {recipe.steps.map((step, index) => (
              <div className="step" key={index}>
                <div className="step-number">
                  {index + 1}
                </div>

                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;