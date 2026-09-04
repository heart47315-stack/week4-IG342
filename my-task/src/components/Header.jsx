function Header({ favoriteCount }) {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon">🍳</span>

        <div>
          <h1>My Cooking</h1>
          <p>Cook something delicious</p>
        </div>
      </div>

      <div className="favorite-counter">
        ❤️ {favoriteCount} รายการโปรด
      </div>
    </header>
  );
}

export default Header;