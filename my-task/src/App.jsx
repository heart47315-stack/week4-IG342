import { useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";

import recipes from "./data/recipes";

function App() {
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("ทั้งหมด");
	const [favorites, setFavorites] = useState([]);
	const [selectedRecipe, setSelectedRecipe] = useState(null);

	const categories = [
		"ทั้งหมด",
		...new Set(recipes.map((recipe) => recipe.category))
	];

	const filteredRecipes = recipes.filter((recipe) => {
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

	return (
		<div className="app">
			<Header favoriteCount={favorites.length} />

			<main className="container">
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