import React from 'react';
import './App.css';

function FavoritesPage({ favorites, onBack, onRemoveFromFavorites, onAddToCart }) {
  return (
    <div className="favorites-page app-container">
      <nav className="navbar favorites-navbar">
        <button className="back-btn" onClick={onBack}>← Back to Menu</button>
        <h1>Your Favorites</h1>
        <div></div> {/* Empty div for flex spacing */}
      </nav>
      
      <main className="favorites-main">
        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-favorites-icon">❤️</div>
            <p>You haven't added any favorites yet</p>
            <button className="primary-btn" onClick={onBack}>Browse Menu</button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map(item => (
              <div key={item.id} className="favorite-item-card">
                {item.isVeg ? <div className="veg-badge">🥦</div> : <div className="nonveg-badge">🍗</div>}
                <button 
                  className="remove-favorite-btn" 
                  onClick={() => onRemoveFromFavorites(item)}
                >
                  ❌
                </button>
                <img src={item.img} alt={item.name} className="favorite-item-img" />
                <div className="favorite-item-details">
                  <h3>{item.name}</h3>
                  <p className="favorite-item-desc">{item.desc}</p>
                  <div className="favorite-item-price">${item.price.toFixed(2)}</div>
                </div>
                <button 
                  className="add-to-cart-btn" 
                  onClick={() => onAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default FavoritesPage;
