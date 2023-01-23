import Card from "../UI/Card";
import { useSelector } from "react-redux";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((value) => {
          return (
            <CartItem
              key={value.id}
              item={{ id:value.id , title: value.title, quantity: value.quantity, total: value.totalPrice, price: value.price }}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
