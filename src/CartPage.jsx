import React, { useState } from 'react';
import './App.css';

function CartPage({ orders, onBack, onRemove, onUpdateQuantity, onPlaceOrder, total }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryAddress, setDeliveryAddress] = useState('123 Main Street, Apt 4B, New York, NY 10001');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Calculate the final total after potential promo discount
  const finalTotal = promoApplied ? total + 2.99 - promoDiscount : total + 2.99;

  // Apply promo code
  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'welcome15') {
      const discount = total * 0.15; // 15% off
      setPromoDiscount(discount);
      setPromoApplied(true);
    } else if (promoCode.toLowerCase() === 'freeship') {
      setPromoDiscount(2.99); // Free shipping
      setPromoApplied(true);
    }
  };

  return (
    <div className="cart-page app-container">
      <nav className="navbar cart-navbar">
        <button className="back-btn" onClick={onBack}>← Back to Menu</button>
        <h1>Your Cart</h1>
        <div></div> {/* Empty div for flex spacing */}
      </nav>
      
      <main className="cart-main">
        {orders.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <p>Your cart is empty</p>
            <button className="primary-btn" onClick={onBack}>Browse Menu</button>
          </div>
        ) : (
          <>
            <div className="cart-sections">
              <div className="cart-items-section">
                <h2>Order Items</h2>
                <ul className="cart-list">
                  {orders.map((item, idx) => (
                    <li key={idx} className="cart-item">
                      {/* Replace image with dish name only */}
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <div className="item-price">${item.price.toFixed(2)}</div>
                      </div>
                      <div className="cart-quantity-control">
                        <button 
                          className="quantity-btn" 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn" 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="item-subtotal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button className="remove-btn" onClick={() => onRemove(idx)}>
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cart-checkout-section">
                <div className="delivery-address-section">
                  <h2>Delivery Address</h2>
                  <textarea 
                    className="address-input"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="promo-code-section">
                  <h2>Promo Code</h2>
                  <div className="promo-input-container">
                    <input 
                      type="text" 
                      className="promo-input"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <button 
                      className="apply-promo-btn"
                      onClick={handleApplyPromo}
                      disabled={promoApplied || !promoCode}
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <div className="promo-applied">
                      Promo code applied! You saved ${promoDiscount.toFixed(2)}
                    </div>
                  )}
                </div>

                <div className="payment-method-section">
                  <h2>Payment Method</h2>
                  <div className="payment-options">
                    <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                      <input 
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      <span className="payment-icon">💳</span>
                      <span>Credit/Debit Card</span>
                    </label>
                    
                    <label className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
                      <input 
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                      />
                      <span className="payment-icon">🔵</span>
                      <span>PayPal</span>
                    </label>
                    
                    <label className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`}>
                      <input 
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={() => setPaymentMethod('cash')}
                      />
                      <span className="payment-icon">💵</span>
                      <span>Cash on Delivery</span>
                    </label>
                  </div>
                </div>
                
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery Fee:</span>
                    <span>$2.99</span>
                  </div>
                  {promoApplied && (
                    <div className="summary-row discount-row">
                      <span>Promo Discount:</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="summary-row total-row">
                    <span>Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                  
                  <button 
                    className="primary-btn place-order-btn" 
                    onClick={onPlaceOrder}
                    disabled={orders.length === 0}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default CartPage;
