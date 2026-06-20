const CartSidebar = ({ cart, onClose, onUpdateQty, onRemove }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <aside className="cart-sidebar">
        {/* Header */}
        <div className="cart-header">
          <h2>🛒 Your Cart ({itemCount})</h2>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>Your cart is empty</p>
              <small>Add items to get started</small>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  className="cart-item-img"
                  src={item.image}
                  alt={item.title}
                />
                <div className="cart-item-info">
                  <p className="cart-item-title">{item.title}</p>
                  <p className="cart-item-price">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQty(item.id, item.qty - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-value">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => onRemove(item.id)}
                  aria-label="Remove item"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-price">${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">
              Proceed to Checkout →
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartSidebar;
