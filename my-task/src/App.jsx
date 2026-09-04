import { useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";

import recipes from "./data/recipes";

function App() {
	const [recipeItems, setRecipeItems] = useState(recipes);
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("ทั้งหมด");
	const [favorites, setFavorites] = useState([]);
	const [selectedRecipe, setSelectedRecipe] = useState(null);
	const [isAddFormOpen, setIsAddFormOpen] = useState(false);
	const [newRecipe, setNewRecipe] = useState({
		name: "",
		category: "เมนูของฉัน",
		time: "15",
		difficulty: "ง่าย",
		emoji: "🍽️",
		description: "เมนูอาหารทำเองแสนอร่อย",
		ingredients: "",
		steps: ""
	});

	const categories = [
		"ทั้งหมด",
		...new Set(recipeItems.map((recipe) => recipe.category))
	];

	const filteredRecipes = recipeItems.filter((recipe) => {
		const matchesCategory =
			category === "ทั้งหมด" || recipe.category === category;
		const searchTerm = search.trim().toLowerCase();
		const matchesSearch =
			!searchTerm ||
			recipe.name.toLowerCase().includes(searchTerm) ||
			recipe.description.toLowerCase().includes(searchTerm);

		return matchesCategory && matchesSearch;
	});

	const toggleFavorite = (recipeId) => {
		setFavorites((currentFavorites) =>
			currentFavorites.includes(recipeId)
				? currentFavorites.filter((id) => id !== recipeId)
				: [...currentFavorites, recipeId]
		);
	};

	const handleAddRecipe = (event) => {
		event.preventDefault();
		if (!newRecipe.name.trim()) return;

		const recipe = {
			...newRecipe,
			id: Date.now(),
			time: Number(newRecipe.time) || 15,
			ingredients: newRecipe.ingredients
				.split("\n")
				.map((item) => item.trim())
				.filter(Boolean),
			steps: newRecipe.steps
				.split("\n")
				.map((step) => step.trim())
				.filter(Boolean)
		};

		setRecipeItems((currentRecipes) => [recipe, ...currentRecipes]);
		setNewRecipe({
			name: "",
			category: "เมนูของฉัน",
			time: "15",
			difficulty: "ง่าย",
			emoji: "🍽️",
			description: "เมนูอาหารทำเองแสนอร่อย",
			ingredients: "",
			steps: ""
		});
		setIsAddFormOpen(false);
	};

	const handleDeleteRecipe = (recipeId) => {
		setRecipeItems((currentRecipes) =>
			currentRecipes.filter((recipe) => recipe.id !== recipeId)
		);
		setFavorites((currentFavorites) =>
			currentFavorites.filter((id) => id !== recipeId)
		);
		setSelectedRecipe((currentRecipe) =>
			currentRecipe?.id === recipeId ? null : currentRecipe
		);
	};

	return (
		<div className="app">
			<Header favoriteCount={favorites.length} />

			<main className="container">
				<div className="recipe-toolbar">
					<div>
						<h2>เมนูของฉัน</h2>
						<p>จัดการสูตรอาหารที่อยากทำได้ในที่เดียว</p>
					</div>
					<button
						className="add-recipe-button"
						onClick={() => setIsAddFormOpen((isOpen) => !isOpen)}
					>
						{isAddFormOpen ? "✕ ปิดฟอร์ม" : "+ เพิ่มเมนู"}
					</button>
				</div>

				{isAddFormOpen && (
					<form className="add-recipe-form" onSubmit={handleAddRecipe}>
						<h3>เพิ่มเมนูอาหาร</h3>
						<div className="form-grid">
							<label>ชื่อเมนู<input required value={newRecipe.name} onChange={(event) => setNewRecipe({ ...newRecipe, name: event.target.value })} /></label>
							<label>หมวดหมู่<input value={newRecipe.category} onChange={(event) => setNewRecipe({ ...newRecipe, category: event.target.value })} /></label>
							<label>เวลา (นาที)<input required type="number" min="1" value={newRecipe.time} onChange={(event) => setNewRecipe({ ...newRecipe, time: event.target.value })} /></label>
							<label>อีโมจิ<input value={newRecipe.emoji} onChange={(event) => setNewRecipe({ ...newRecipe, emoji: event.target.value })} /></label>
						</div>
						<label>คำอธิบาย<input value={newRecipe.description} onChange={(event) => setNewRecipe({ ...newRecipe, description: event.target.value })} /></label>
						<div className="form-grid">
							<label>วัตถุดิบ <span>(แยกบรรทัด)</span><textarea value={newRecipe.ingredients} onChange={(event) => setNewRecipe({ ...newRecipe, ingredients: event.target.value })} /></label>
							<label>วิธีทำ <span>(แยกบรรทัด)</span><textarea value={newRecipe.steps} onChange={(event) => setNewRecipe({ ...newRecipe, steps: event.target.value })} /></label>
						</div>
						<button className="save-recipe-button" type="submit">บันทึกเมนู</button>
					</form>
				)}

				<SearchBar search={search} setSearch={setSearch} />
				<CategoryFilter
					categories={categories}
					category={category}
					setCategory={setCategory}
				/>
				<RecipeList
					recipes={filteredRecipes}
					favorites={favorites}
					onFavorite={toggleFavorite}
					onSelect={setSelectedRecipe}
					onDelete={handleDeleteRecipe}
				/>
			</main>

			<RecipeDetail
				recipe={selectedRecipe}
				isFavorite={selectedRecipe ? favorites.includes(selectedRecipe.id) : false}
				onFavorite={toggleFavorite}
				onClose={() => setSelectedRecipe(null)}
			/>
		</div>
	);
}

export default App;