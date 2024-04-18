import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "../Checkout/Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)


  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandelr = (id) => {
    cartCtx.removeItem(id)
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const checkoutHandler = () => {
    setShowCheckout(true);
  };
  const cartitems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.key}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandelr.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const hasItems = cartCtx.items.length > 0;

  const cartButtons = (!isSubmitting && <div className={classes.actions}>
    <button className={classes["button--alt"]} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button className={classes.button} onClick={checkoutHandler}>Order</button>}
  </div>);

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)
    const response = await fetch('https://react-http-post-method-c5d25-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items
        })
      });

    if (!response.ok) {
      throw new Error('something went wrong')
    };

    setIsSubmitting(false);
  };

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && cartitems}
      {!isSubmitting && <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>}
      {isSubmitting && <p>Order Is Submitted successfully</p>}
      {showCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      {!showCheckout && cartButtons}

    </Modal>
  );
};

export default Cart;
