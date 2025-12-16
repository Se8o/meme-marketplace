import { useCart } from '../context/CartContext';

export function Cart() {
  const { cartItems, addItem, removeItem, decreaseCount, clearCart, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1>Nákupní košík</h1>
        <p className="empty-cart">Váš košík je prázdný</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Nákupní košík</h1>

      <div className="cart-items">
        {cartItems.map((item) => {
          const itemPrice = item.rating * 25;
          const totalItemPrice = itemPrice * item.count;

          return (
            <div key={item.id} className="cart-item">
              <img src={item.url} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-rating">
                  {'⭐'.repeat(item.rating)}
                </p>
                <p className="cart-item-price">
                  {itemPrice} Kč / kus
                </p>
              </div>

              <div className="cart-item-controls">
                <div className="cart-item-quantity">
                  <button
                    onClick={() => decreaseCount(item.id)}
                    className="quantity-button"
                  >
                    −
                  </button>
                  <span className="quantity-number">{item.count}</span>
                  <button
                    onClick={() => addItem(item)}
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>

                <p className="cart-item-total">
                  Celkem: {totalItemPrice} Kč
                </p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="remove-button"
                >
                  Odebrat
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <h2>Celková cena:</h2>
          <p className="total-price">{getTotalPrice()} Kč</p>
        </div>

        <button onClick={clearCart} className="clear-cart-button">
          Vyprázdnit košík
        </button>
      </div>
    </div>
  );
}
