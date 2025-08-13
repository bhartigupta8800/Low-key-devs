import React, { useState } from 'react';
import './App.css';

// Sample review data
const sampleReviews = [
  {
    id: 1,
    userName: "Alex Johnson",
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    date: "2023-08-15",
    comment: "The food was amazing! I especially loved the Truffle Wagyu Burger. Will definitely order again.",
    dishes: ["Truffle Wagyu Burger", "French Fries"],
    helpful: 24,
    images: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80"]
  },
  {
    id: 2,
    userName: "Sarah Miller",
    userImage: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    date: "2023-08-10",
    comment: "Great food and quick delivery. The pasta was a bit cold but still delicious. The Margherita pizza is to die for!",
    dishes: ["Margherita Pizza", "Garlic Italian Noodles"],
    helpful: 15,
    images: []
  },
  {
    id: 3,
    userName: "Mike Chen",
    userImage: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
    date: "2023-08-05",
    comment: "Best sushi in town! The Summer Fusion Sushi Platter was fresh and beautifully presented. Highly recommend.",
    dishes: ["Summer Fusion Sushi Platter", "Miso Soup"],
    helpful: 32,
    images: ["https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=300&q=80"]
  },
  {
    id: 4,
    userName: "Emma Wilson",
    userImage: "https://randomuser.me/api/portraits/women/29.jpg",
    rating: 3,
    date: "2023-07-28",
    comment: "The food was good but delivery took longer than expected. The Vegetable Biryani was flavorful though.",
    dishes: ["Vegetable Biryani", "Garlic Naan"],
    helpful: 8,
    images: []
  },
  {
    id: 5,
    userName: "David Garcia",
    userImage: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    date: "2023-07-20",
    comment: "I've ordered from Lowkey Food Palace several times and have never been disappointed. The Butter Chicken is fantastic!",
    dishes: ["Butter Chicken", "Garlic Naan"],
    helpful: 27,
    images: ["https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=300&q=80"]
  }
];

function ReviewsPage({ onBack }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [reviews, setReviews] = useState(sampleReviews);
  const [expandedReview, setExpandedReview] = useState(null);
  
  // Calculate the average rating
  const averageRating = (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1);
  
  // Filter reviews based on rating
  const filteredReviews = activeFilter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(activeFilter));
  
  // Handle marking a review as helpful
  const handleMarkHelpful = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 } 
        : review
    ));
  };

  return (
    <div className="reviews-page app-container">
      <nav className="navbar reviews-navbar">
        <button className="back-btn" onClick={onBack}>← Back to Menu</button>
        <h1>Customer Reviews</h1>
        <div></div> {/* Empty div for flex spacing */}
      </nav>
      
      <main className="reviews-main">
        <div className="reviews-summary">
          <div className="average-rating">
            <span className="rating-number">{averageRating}</span>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <span key={star} className={averageRating >= star ? "star filled" : "star"}>★</span>
              ))}
            </div>
            <span className="rating-count">Based on {reviews.length} reviews</span>
          </div>
          
          <div className="rating-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map(rating => (
              <button 
                key={rating}
                className={`filter-btn ${activeFilter === rating.toString() ? 'active' : ''}`}
                onClick={() => setActiveFilter(rating.toString())}
              >
                {rating} ★
              </button>
            ))}
          </div>
        </div>
        
        <div className="reviews-list">
          {filteredReviews.length === 0 ? (
            <div className="no-reviews">
              <p>No reviews with this rating yet.</p>
            </div>
          ) : (
            filteredReviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <img src={review.userImage} alt={review.userName} className="reviewer-img" />
                  <div className="reviewer-info">
                    <div className="reviewer-name">{review.userName}</div>
                    <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
                  </div>
                  <div className="review-rating">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={review.rating >= star ? "star filled" : "star"}>★</span>
                    ))}
                  </div>
                </div>
                
                <div className="review-content">
                  <p className={expandedReview === review.id ? "expanded" : ""}>
                    {review.comment}
                  </p>
                  {review.comment.length > 150 && expandedReview !== review.id && (
                    <button 
                      className="read-more-btn"
                      onClick={() => setExpandedReview(review.id)}
                    >
                      Read more
                    </button>
                  )}
                </div>
                
                {review.dishes.length > 0 && (
                  <div className="review-dishes">
                    <span className="dishes-label">Ordered:</span>
                    {review.dishes.map((dish, idx) => (
                      <span key={idx} className="dish-tag">{dish}</span>
                    ))}
                  </div>
                )}
                
                {review.images.length > 0 && (
                  <div className="review-images">
                    {review.images.map((img, idx) => (
                      <img key={idx} src={img} alt="Food" className="review-img" />
                    ))}
                  </div>
                )}
                
                <div className="review-actions">
                  <button 
                    className="helpful-btn"
                    onClick={() => handleMarkHelpful(review.id)}
                  >
                    👍 Helpful ({review.helpful})
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default ReviewsPage;
