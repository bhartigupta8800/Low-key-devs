import React from 'react';
import './App.css';

function OrderHistoryPage({ onBack }) {
  const orderHistory = [
    {
      id: 12345,
      date: "August 5, 2025",
      time: "7:30 PM",
      status: "Delivered",
      total: 32.97,
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 8.99 },
        { name: "Butter Chicken", quantity: 1, price: 11.99 },
        { name: "California Roll", quantity: 1, price: 9.99 },
        { name: "Delivery Fee", price: 2.00 }
      ]
    },
    {
      id: 12340,
      date: "August 2, 2025",
      time: "1:15 PM",
      status: "Delivered",
      total: 27.47,
      items: [
        { name: "Double Bacon Burger", quantity: 1, price: 10.99 },
        { name: "French Fries", quantity: 2, price: 3.49 },
        { name: "Garlic Italian Noodles", quantity: 1, price: 4.99 },
        { name: "Veggie Burger", quantity: 1, price: 8.49 },
        { name: "Delivery Fee", price: 2.00 }
      ]
    },
    {
      id: 12335,
      date: "July 28, 2025",
      time: "8:20 PM",
      status: "Delivered",
      total: 20.48,
      items: [
        { name: "Paneer Tikka", quantity: 1, price: 9.49 },
        { name: "Garlic Naan", quantity: 3, price: 2.99 },
        { name: "Delivery Fee", price: 2.00 }
      ]
    }
  ];

  return (
    <div className="history-page app-container">
      <nav className="navbar history-navbar">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h1>Order History</h1>
        <div></div> {/* Empty div for flex spacing */}
      </nav>
      
      <main className="history-main">
        <div className="history-header">
          <p>Your past orders from <span className="restaurant-name">Lowkey Food Palace</span></p>
        </div>
        
        {orderHistory.length === 0 ? (
          <div className="empty-history">
            <div className="empty-history-icon">📋</div>
            <p>You haven't placed any orders yet</p>
            <button className="primary-btn" onClick={onBack}>Browse Menu</button>
          </div>
        ) : (
          <div className="order-history-list">
            {orderHistory.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <div className="order-number">Order #{order.id}</div>
                    <div className="order-date">{order.date} at {order.time}</div>
                  </div>
                  <div className="order-status">{order.status}</div>
                </div>
                
                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="history-item">
                      {item.quantity && <span className="item-quantity">{item.quantity}×</span>}
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="order-footer">
                  <div className="order-total">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <button className="reorder-btn">Reorder</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default OrderHistoryPage;
