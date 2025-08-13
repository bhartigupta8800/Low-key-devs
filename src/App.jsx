import { useState } from 'react'
import './App.css'
import CartPage from './CartPage'
import ConfirmationPage from './ConfirmationPage'
import OrderHistoryPage from './OrderHistoryPage'
import ProfilePage from './ProfilePage'
import SettingsPage from './SettingsPage'
import ReviewsPage from './ReviewsPage'
import FavoritesPage from './FavoritesPage'
import pizzaImg from './assets/pizza.jpg.js'
import sushiImg from './assets/sushi.jpg.js'
import indianImg from './assets/indian.jpg.js'
import burgerImg from './assets/burger.jpg.js'

// Single restaurant data with food categories
const restaurantInfo = {
  name: "Lowkey Food Palace",
  tagline: "Delicious food, delivered to your doorstep",
  rating: 4.8,
  cuisines: "Italian, Indian, Japanese, American",
  openHours: "8:00 AM - 11:00 PM",
  deliveryTime: "25-35 min",
  address: "123 Main Street, New York, NY 10001",
  certifications: ["HACCP Certified", "Organic Sourcing", "Eco-Friendly Packaging"],
  foodSafety: {
    allergenInfo: "We provide detailed allergen information for all our dishes. Please inform our staff about any allergies.",
    qualityAssurance: "All ingredients are sourced from certified suppliers and undergo rigorous quality checks.",
    sanitationPractices: "Our kitchen follows the highest standards of sanitation with daily cleaning protocols and regular inspections.",
    temperatureControl: "Food is stored and served at appropriate temperatures to ensure safety and freshness."
  },
  authenticity: {
    description: "We pride ourselves on authentic recipes passed down through generations, prepared by chefs trained in traditional cooking methods.",
    ingredients: "We use only authentic, high-quality ingredients sourced directly from regions known for specific cuisines.",
    methods: "Our chefs follow traditional cooking methods to preserve the authentic taste of each dish."
  }
};

// Today's Special Menu
const todaysSpecials = [
  { 
    id: 101, 
    name: 'August Chef\'s Special Pasta', 
    price: 14.99, 
    img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=400&q=80", 
    desc: 'Homemade fettuccine with wild mushrooms, truffle oil and aged parmesan',
    discount: '15% off',
    badge: 'Chef\'s Special',
    isVeg: true,
    authenticity: 'Traditional Italian recipe from Tuscany, prepared with imported truffle oil',
    quality: 'Made with organic flour and free-range eggs',
    allergens: ['Gluten', 'Eggs', 'Dairy']
  },
  { 
    id: 102, 
    name: 'Summer Fusion Sushi Platter', 
    price: 18.99, 
    img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80", 
    desc: 'Selection of signature rolls with seasonal fish and mango',
    discount: '10% off',
    badge: 'Limited Time',
    isVeg: false,
    authenticity: 'Prepared by our Japanese-trained sushi chef using traditional techniques',
    quality: 'Premium grade fish sourced from sustainable fisheries',
    allergens: ['Fish', 'Shellfish', 'Soy', 'Sesame']
  },
  { 
    id: 103, 
    name: 'Truffle Wagyu Burger', 
    price: 16.99, 
    img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80", 
    desc: 'Premium wagyu beef with truffle mayo, caramelized onions and aged cheddar',
    badge: 'New',
    isVeg: false,
    authenticity: 'Japanese A5 wagyu beef prepared using American steakhouse techniques',
    quality: 'Ethically raised wagyu beef with a marbling score of 8+',
    allergens: ['Gluten', 'Dairy', 'Eggs', 'Mustard']
  },
  { 
    id: 104, 
    name: 'Garden Fresh Buddha Bowl', 
    price: 12.99, 
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80", 
    desc: 'Nutrient-rich bowl with quinoa, avocado, roasted vegetables and tahini dressing',
    discount: '10% off',
    badge: 'Healthy Choice',
    isVeg: true,
    authenticity: 'Inspired by traditional Buddhist temple cuisine',
    quality: 'Made with locally-sourced organic produce harvested daily',
    allergens: ['Sesame', 'Nuts']
  }
];

// Enhanced food categories with better food images
const foodCategories = [
  {
    id: 1,
    name: 'Pizza & Italian',
    image: pizzaImg,
    items: [
      { 
        id: 1, 
        name: 'Margherita Pizza', 
        price: 8.99, 
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80", 
        desc: 'Classic cheese and tomato pizza with fresh basil',
        isVeg: true,
        authenticity: 'Authentic Neapolitan recipe, hand-tossed',
        quality: 'Made with San Marzano tomatoes and fresh buffalo mozzarella',
        allergens: ['Gluten', 'Dairy']
      },
      { 
        id: 2, 
        name: 'Pepperoni Pizza', 
        price: 9.99, 
        img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80", 
        desc: 'Loaded with pepperoni and mozzarella',
        isVeg: false,
        authenticity: 'American-Italian style with crispy crust',
        quality: 'Premium pepperoni cured in-house with our signature spice blend',
        allergens: ['Gluten', 'Dairy']
      },
      { 
        id: 3, 
        name: 'Quattro Formaggi', 
        price: 11.99, 
        img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80", 
        desc: 'Four cheese blend with mozzarella, gorgonzola, parmesan and ricotta',
        isVeg: true,
        authenticity: 'Northern Italian specialty with imported cheeses',
        quality: 'Featuring DOP-certified cheeses from Italy',
        allergens: ['Gluten', 'Dairy']
      },
      { 
        id: 4, 
        name: 'Garlic Italian Noodles', 
        price: 4.99, 
        img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80", 
        desc: 'Pasta tossed with garlic, olive oil, and Italian herbs',
        isVeg: true,
        authenticity: 'Simple aglio e olio style preparation',
        quality: 'Made with bronze-die cut pasta and extra virgin olive oil'
      },
      { 
        id: 17, 
        name: 'Mushroom Truffle Risotto', 
        price: 13.99, 
        img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=400&q=80", 
        desc: 'Creamy arborio rice with wild mushrooms and truffle',
        isVeg: true,
        authenticity: 'Northern Italian risotto prepared with traditional slow-cooking method',
        quality: 'Made with imported Carnaroli rice and seasonal wild mushrooms',
        allergens: ['Dairy']
      },
    ],
  },
  {
    id: 2,
    name: 'Sushi & Japanese',
    image: sushiImg,
    items: [
      { 
        id: 5, 
        name: 'Salmon Sushi', 
        price: 12.99, 
        img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80", 
        desc: 'Fresh salmon on seasoned rice',
        isVeg: false,
        authenticity: 'Traditional Edomae-style nigiri sushi',
        quality: 'Wild-caught Atlantic salmon, served within 24 hours of delivery',
        allergens: ['Fish', 'Soy']
      },
      { 
        id: 6, 
        name: 'Tuna Roll', 
        price: 10.99, 
        img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=400&q=80", 
        desc: 'Tuna, cucumber and avocado roll',
        isVeg: false,
        authenticity: 'Modern Japanese maki roll',
        quality: 'Line-caught sustainable yellowfin tuna',
        allergens: ['Fish', 'Soy', 'Sesame']
      },
      { 
        id: 7, 
        name: 'California Roll', 
        price: 9.99, 
        img: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&w=400&q=80", 
        desc: 'Crab, avocado and cucumber roll',
        isVeg: false,
        authenticity: 'American-Japanese fusion creation',
        quality: 'Premium imitation crab made from sustainable whitefish',
        allergens: ['Shellfish', 'Fish', 'Soy', 'Sesame']
      },
      { 
        id: 8, 
        name: 'Miso Soup', 
        price: 3.99, 
        img: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?auto=format&fit=crop&w=400&q=80", 
        desc: 'Traditional Japanese soup with tofu and seaweed',
        isVeg: true,
        authenticity: 'Authentic Japanese dashi-based soup',
        quality: 'Made with organic white miso paste and kombu seaweed',
        allergens: ['Soy']
      },
      { 
        id: 18, 
        name: 'Vegetable Tempura', 
        price: 7.99, 
        img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400&q=80", 
        desc: 'Assorted vegetables in light, crispy batter',
        isVeg: true,
        authenticity: 'Traditional Japanese tempura technique',
        quality: 'Seasonal vegetables in our house-made tempura batter',
        allergens: ['Gluten', 'Eggs']
      },
    ],
  },
  {
    id: 3,
    name: 'Indian Specialties',
    image: indianImg,
    items: [
      { 
        id: 9, 
        name: 'Butter Chicken', 
        price: 11.99, 
        img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&q=80", 
        desc: 'Tender chicken in a creamy tomato sauce',
        isVeg: false,
        authenticity: 'North Indian Punjabi recipe from Delhi',
        quality: 'Made with free-range chicken and our 24-hour marination process',
        allergens: ['Dairy']
      },
      { 
        id: 10, 
        name: 'Paneer Tikka', 
        price: 9.49, 
        img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80", 
        desc: 'Grilled cottage cheese with spices',
        isVeg: true,
        authenticity: 'Traditional Punjabi tandoor cooking method',
        quality: 'House-made paneer cheese marinated in yogurt and spices',
        allergens: ['Dairy']
      },
      { 
        id: 11, 
        name: 'Vegetable Biryani', 
        price: 10.49, 
        img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80", 
        desc: 'Fragrant rice with mixed vegetables and spices',
        isVeg: true,
        authenticity: 'Hyderabadi dum cooking method',
        quality: 'Made with aged basmati rice and our signature spice blend',
        allergens: ['Tree Nuts']
      },
      { 
        id: 12, 
        name: 'Garlic Naan', 
        price: 2.99, 
        img: "https://images.unsplash.com/photo-1617692855027-33b14f061079?auto=format&fit=crop&w=400&q=80", 
        desc: 'Freshly baked bread with garlic and butter',
        isVeg: true,
        authenticity: 'Traditional tandoor-baked flatbread',
        quality: 'Hand-stretched and baked to order in our clay tandoor'
      },
      { 
        id: 19, 
        name: 'Lamb Rogan Josh', 
        price: 13.99, 
        img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80", 
        desc: 'Tender lamb in an aromatic Kashmiri curry',
        isVeg: false,
        authenticity: 'Classic Kashmiri preparation with whole spices',
        quality: 'Grass-fed lamb slow-cooked for 6 hours'
      },
    ],
  },
  {
    id: 4,
    name: 'American Favorites',
    image: burgerImg,
    items: [
      { 
        id: 13, 
        name: 'Classic Cheeseburger', 
        price: 7.99, 
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80", 
        desc: 'Beef patty with cheese, lettuce, tomato and special sauce',
        isVeg: false,
        authenticity: 'Traditional American diner-style burger',
        quality: 'Made with freshly ground Angus beef, never frozen'
      },
      { 
        id: 14, 
        name: 'Double Bacon Burger', 
        price: 10.99, 
        img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=400&q=80", 
        desc: 'Double beef patty with bacon, cheese and BBQ sauce',
        isVeg: false,
        authenticity: 'Classic American smokehouse recipe',
        quality: 'House-smoked bacon and premium beef blend'
      },
      { 
        id: 15, 
        name: 'Veggie Burger', 
        price: 8.49, 
        img: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=400&q=80", 
        desc: 'Plant-based patty with lettuce, tomato and vegan mayo',
        isVeg: true,
        authenticity: 'Modern American plant-based cuisine',
        quality: 'House-made patty with 12 vegetables, legumes and spices'
      },
      { 
        id: 16, 
        name: 'French Fries', 
        price: 3.49, 
        img: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=400&q=80", 
        desc: 'Crispy golden fries with sea salt',
        isVeg: true,
        authenticity: 'Classic double-fried technique',
        quality: 'Hand-cut Idaho potatoes, fried in peanut oil'
      },
      { 
        id: 20, 
        name: 'Buffalo Chicken Wings', 
        price: 8.99, 
        img: "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=400&q=80", 
        desc: 'Spicy chicken wings with blue cheese dipping sauce',
        isVeg: false,
        authenticity: 'Original Buffalo, NY recipe',
        quality: 'Free-range chicken wings with our signature hot sauce'
      },
    ],
  },
]

function App() {
  const [search, setSearch] = useState('')
  const [orders, setOrders] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showOrderHistory, setShowOrderHistory] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showReviews, setShowReviews] = useState(false)
  const [dietFilter, setDietFilter] = useState('all') // 'all', 'veg', 'nonveg'
  const [showSidebar, setShowSidebar] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)

  // Filter food categories and items based on search and diet preference
  const filteredCategories = foodCategories
    .map(category => {
      const filteredItems = category.items.filter(item => {
        const searchText = search.trim().toLowerCase();
        // Always apply diet filter
        const dietMatch =
          dietFilter === 'all' ||
          (dietFilter === 'veg' && item.isVeg) ||
          (dietFilter === 'nonveg' && !item.isVeg);
        // If no search, just diet filter
        if (!searchText) return dietMatch;
        // If search, match name or desc, and diet
        return (
          (item.name && item.name.toLowerCase().includes(searchText)) ||
          (item.desc && item.desc.toLowerCase().includes(searchText))
        ) && dietMatch;
      });
      return {
        ...category,
        items: filteredItems
      };
    })
    .filter(category => category.items.length > 0);

  // Filter today's specials based on diet preference
  const filteredSpecials = todaysSpecials.filter(item => 
    (dietFilter === 'all' || 
     (dietFilter === 'veg' && item.isVeg) || 
     (dietFilter === 'nonveg' && !item.isVeg))
  );

  const handleOrder = (item) => {
    const existingItem = orders.find(order => order.id === item.id);
    
    if (existingItem) {
      setOrders(orders.map(order => 
        order.id === item.id 
          ? { ...order, quantity: order.quantity + 1 } 
          : order
      ));
    } else {
      setOrders([...orders, { ...item, quantity: 1 }]);
    }
  }

  const handleUpdateQuantity = (itemId, change) => {
    setOrders(orders.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean));
  }

  const handleRemove = (idx) => {
    setOrders(orders.filter((_, i) => i !== idx))
  }

  const calculateTotal = () => {
    return orders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  const toggleFavorite = (item) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === item.id);
    
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  }

  const isFavorite = (itemId) => {
    return favorites.some(fav => fav.id === itemId);
  }

  const handlePlaceOrder = () => {
    setShowCart(false);
    setShowConfirmation(true);
  }

  const handleBackToHome = () => {
    setShowConfirmation(false);
    setOrders([]);
  }

  if (showConfirmation) {
    return <ConfirmationPage 
             orders={orders} 
             totalAmount={calculateTotal()} 
             onBack={handleBackToHome} 
           />;
  }

  if (showCart) {
    return (
      <CartPage 
        orders={orders} 
        onBack={() => setShowCart(false)} 
        onRemove={handleRemove}
        onUpdateQuantity={handleUpdateQuantity}
        onPlaceOrder={handlePlaceOrder}
        total={calculateTotal()}
      />
    );
  }

  if (showOrderHistory) {
    return <OrderHistoryPage onBack={() => setShowOrderHistory(false)} />;
  }

  if (showProfile) {
    return <ProfilePage onBack={() => setShowProfile(false)} />;
  }

  if (showSettings) {
    return <SettingsPage onBack={() => setShowSettings(false)} />;
  }

  if (showReviews) {
    return <ReviewsPage onBack={() => setShowReviews(false)} />;
  }

  if (showFavorites) {
    return (
      <FavoritesPage 
        favorites={favorites} 
        onBack={() => setShowFavorites(false)}
        onRemoveFromFavorites={toggleFavorite}
        onAddToCart={handleOrder}
      />
    );
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-logo">
          {restaurantInfo.name}
        </div>
        {/* Removed search from header bar */}
        <div className="nav-actions">
          <button className="cart-btn" onClick={() => setShowCart(true)}>
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{orders.reduce((count, item) => count + item.quantity, 0)}</span>
          </button>
          <div className="profile-container">
            <button 
              className="profile-btn" 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              👤
            </button>
            {showProfileMenu && (
              <div className="profile-menu">
                <button onClick={() => setShowOrderHistory(true)}>Order History</button>
                <button onClick={() => setShowFavorites(true)}>My Favorites</button>
                <button onClick={() => setShowProfile(true)}>My Profile</button>
                <button onClick={() => setShowSettings(true)}>Settings</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="restaurant-banner">
        <div className="restaurant-details">
          <h1>{restaurantInfo.name}</h1>
          <p className="restaurant-tagline">{restaurantInfo.tagline}</p>
          <div className="restaurant-meta">
            <span className="cuisine-tag">{restaurantInfo.cuisines}</span>
            <span className="rating">⭐ {restaurantInfo.rating}</span>
            <span className="delivery-time">🕒 {restaurantInfo.deliveryTime}</span>
            <button className="reviews-btn" onClick={() => setShowReviews(true)}>
              See Reviews
            </button>
          </div>
          <p className="restaurant-address">{restaurantInfo.address}</p>
          <p className="restaurant-hours">Open: {restaurantInfo.openHours}</p>
          <div className="certification-badges">
            {restaurantInfo.certifications.map((cert, index) => (
              <span key={index} className="certification-badge">{cert}</span>
            ))}
          </div>
        </div>
      </div>

      <main className="main-content">
        {/* Diet Filter Controls */}
        <div className="diet-filter">
          <span className="filter-label">Dietary Preference:</span>
          <div className="filter-options">
            <button 
              className={`filter-btn ${dietFilter === 'all' ? 'active' : ''}`} 
              onClick={() => setDietFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${dietFilter === 'veg' ? 'active' : ''}`} 
              onClick={() => setDietFilter('veg')}
            >
              🥦 Vegetarian
            </button>
            <button 
              className={`filter-btn ${dietFilter === 'nonveg' ? 'active' : ''}`} 
              onClick={() => setDietFilter('nonveg')}
            >
              🍗 Non-Vegetarian
            </button>
          </div>
        </div>

        {/* Search bar above food list */}
        <div className="food-search-bar-wrapper">
          <input
            type="text"
            placeholder="Search for food items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-bar"
            style={{ maxWidth: 500, margin: '0 auto 24px', display: 'block' }}
          />
        </div>

        {/* Today's Special Section */}
        <section className="todays-special">
          <h2 className="special-title">Today's Special - August 6, 2025</h2>
          <div className="special-items">              {filteredSpecials.map(item => (
              <div key={item.id} className="special-item-card">
                {item.badge && <div className="special-badge">{item.badge}</div>}
                {item.isVeg ? <div className="veg-badge">🥦</div> : <div className="nonveg-badge">🍗</div>}
                <img src={item.img} alt={item.name} className="special-item-img" />
                <div className="special-item-details">
                  <h3>{item.name}</h3>
                  <p className="special-item-desc">{item.desc}</p>
                  <div className="special-item-price-container">
                    <div className="special-item-price">${item.price.toFixed(2)}</div>
                    {item.discount && <div className="special-discount">{item.discount}</div>}
                  </div>
                </div>
                <div className="item-actions">
                  <button 
                    className={`favorite-btn ${isFavorite(item.id) ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(item)}
                  >
                    {isFavorite(item.id) ? '❤️' : '🤍'}
                  </button>
                  <button 
                    className="info-btn" 
                    onClick={() => {
                      setSelectedItem(item);
                      setShowSidebar(true);
                    }}
                  >
                    ℹ️
                  </button>
                  {orders.find(order => order.id === item.id)?.quantity > 0 ? (
                    <div className="quantity-control">
                      <button 
                        className="quantity-btn" 
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="quantity">
                        {orders.find(order => order.id === item.id)?.quantity || 0}
                      </span>
                      <button 
                        className="quantity-btn" 
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => handleOrder(item)} className="order-btn special-order-btn">Order Now</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {filteredCategories.length === 0 && (
          <div className="no-results">
            <p>No food items found. Try a different search term.</p>
          </div>
        )}
        
        {filteredCategories.map(category => (
          <section key={category.id} className="food-category">
            <h2 className="category-title">{category.name}</h2>
            <div className="food-items">
              {category.items.map(item => (
                <div key={item.id} className="food-item-card">
                  {item.isVeg ? <div className="veg-badge">🥦</div> : <div className="nonveg-badge">🍗</div>}
                  <img src={item.img} alt={item.name} className="food-item-img" />
                  <div className="food-item-details">
                    <h3>{item.name}</h3>
                    <p className="food-item-desc">{item.desc}</p>
                    <div className="food-item-price">${item.price.toFixed(2)}</div>
                  </div>
                  <div className="item-actions">
                    <button 
                      className={`favorite-btn ${isFavorite(item.id) ? 'favorited' : ''}`}
                      onClick={() => toggleFavorite(item)}
                    >
                      {isFavorite(item.id) ? '❤️' : '🤍'}
                    </button>
                    <button 
                      className="info-btn" 
                      onClick={() => {
                        setSelectedItem(item);
                        setShowSidebar(true);
                      }}
                    >
                      ℹ️
                    </button>
                    {orders.find(order => order.id === item.id)?.quantity > 0 ? (
                      <div className="quantity-control">
                        <button 
                          className="quantity-btn" 
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="quantity">
                          {orders.find(order => order.id === item.id)?.quantity || 0}
                        </span>
                        <button 
                          className="quantity-btn" 
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleOrder(item)} className="order-btn">Order</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Food Authenticity & Quality Sidebar */}
      {showSidebar && selectedItem && (
        <div className="food-sidebar-overlay" onClick={() => setShowSidebar(false)}>
          <div className="food-sidebar" onClick={(e) => e.stopPropagation()}>
            <button className="close-sidebar" onClick={() => setShowSidebar(false)}>×</button>
            <div className="sidebar-content">
              <div className="sidebar-header">
                <img src={selectedItem.img} alt={selectedItem.name} className="sidebar-img" />
                <h2>{selectedItem.name}</h2>
                {selectedItem.isVeg ? 
                  <div className="sidebar-veg-badge">🥦 Vegetarian</div> : 
                  <div className="sidebar-nonveg-badge">🍗 Non-Vegetarian</div>
                }
              </div>
              
              <div className="sidebar-section">
                <h3>Authenticity</h3>
                <p>{selectedItem.authenticity}</p>
              </div>
              
              <div className="sidebar-section">
                <h3>Quality Assurance</h3>
                <p>{selectedItem.quality}</p>
              </div>
              
              <div className="sidebar-section">
                <h3>Description</h3>
                <p>{selectedItem.desc}</p>
              </div>
              
              <div className="sidebar-section allergens-section">
                <h3>Allergen Information</h3>
                {selectedItem.allergens && selectedItem.allergens.length > 0 ? (
                  <>
                    <p className="allergen-warning">This dish contains the following allergens:</p>
                    <div className="allergen-tags">
                      {selectedItem.allergens.map((allergen, index) => (
                        <span key={index} className="allergen-tag">
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <p>No common allergens reported for this dish.</p>
                )}
                <p className="allergen-note">
                  Please inform our staff if you have any specific allergies or dietary restrictions.
                </p>
              </div>
              
              <div className="sidebar-price">
                <span>Price: ${selectedItem.price.toFixed(2)}</span>
                {orders.find(order => order.id === selectedItem.id)?.quantity > 0 ? (
                  <div className="sidebar-quantity">
                    <button onClick={() => handleUpdateQuantity(selectedItem.id, -1)}>-</button>
                    <span>{orders.find(order => order.id === selectedItem.id)?.quantity || 0}</span>
                    <button onClick={() => handleUpdateQuantity(selectedItem.id, 1)}>+</button>
                  </div>
                ) : (
                  <button 
                    className="sidebar-order-btn" 
                    onClick={() => handleOrder(selectedItem)}
                  >
                    Add to Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© {new Date().getFullYear()} {restaurantInfo.name}. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
