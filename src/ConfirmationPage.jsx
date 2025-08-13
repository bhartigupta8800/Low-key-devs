import React, { useState, useEffect } from 'react';
import './App.css';

function ConfirmationPage({ orders, totalAmount, onBack }) {
  const orderNumber = Math.floor(Math.random() * 10000);
  const estimatedTime = Math.floor(Math.random() * 30) + 15; // 15-45 minutes
  const [currentTime, setCurrentTime] = useState(0);
  const [orderStatus, setOrderStatus] = useState('preparing');
  
  // Simulate order progress
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 1;
        
        // Update order status based on time elapsed
        if (newTime >= estimatedTime * 0.25 && orderStatus === 'preparing') {
          setOrderStatus('cooking');
        } else if (newTime >= estimatedTime * 0.6 && orderStatus === 'cooking') {
          setOrderStatus('on-the-way');
        } else if (newTime >= estimatedTime * 0.9 && orderStatus === 'on-the-way') {
          setOrderStatus('arriving');
        }
        
        return newTime < estimatedTime ? newTime : estimatedTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [estimatedTime, orderStatus]);
  
  // Calculate progress percentage
  const progressPercentage = Math.min((currentTime / estimatedTime) * 100, 100);
  
  // Get status text and emoji
  const getStatusText = () => {
    switch (orderStatus) {
      case 'preparing':
        return { text: 'Order is being prepared', emoji: '👨‍🍳' };
      case 'cooking':
        return { text: 'Food is being cooked', emoji: '🍳' };
      case 'on-the-way':
        return { text: 'Order is on the way', emoji: '🛵' };
      case 'arriving':
        return { text: 'Arriving soon!', emoji: '📍' };
      default:
        return { text: 'Order confirmed', emoji: '✓' };
    }
  };
  
  const { text: statusText, emoji: statusEmoji } = getStatusText();
  
  return (
    <div className="confirmation-page app-container">
      <div className="confirmation-content">
        <div className="confirmation-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p className="confirmation-number">Order #{orderNumber}</p>
        
        <div className="delivery-tracking">
          <div className="tracking-status">
            <div className="status-emoji">{statusEmoji}</div>
            <div className="status-text">{statusText}</div>
          </div>
          
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="delivery-time">
            <span>Estimated delivery in: </span>
            <span className="time-remaining">
              {Math.max(0, estimatedTime - currentTime)} minutes
            </span>
          </div>
          
          <div className="delivery-map">
            <div className="map-placeholder">
              <div className="map-route">
                <div className="restaurant-point">
                  <span className="point-icon">🍽️</span>
                  <span className="point-label">Restaurant</span>
                </div>
                <div 
                  className="delivery-progress" 
                  style={{ width: `${progressPercentage}%` }}
                >
                  <span className="delivery-vehicle">{orderStatus === 'on-the-way' || orderStatus === 'arriving' ? '🛵' : ''}</span>
                </div>
                <div className="customer-point">
                  <span className="point-icon">🏠</span>
                  <span className="point-label">Your Location</span>
                </div>
              </div>
              <div className="map-background"></div>
            </div>
          </div>
        </div>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          <ul>
            {orders.map((item, idx) => (
              <li key={idx}>
                <span className="item-quantity">{item.quantity}x</span> {item.name} 
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="summary-total">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="delivery-address">
          <h3>Delivery Address</h3>
          <p>123 Main Street, Apt 4B</p>
          <p>New York, NY 10001</p>
        </div>
        
        <button className="primary-btn" onClick={onBack}>Return to Menu</button>
      </div>
    </div>
  );
}

export default ConfirmationPage;
