import classes from './CartButton.module.css';
import { useDispatch , useSelector} from 'react-redux';
import { uiAction } from '../../store/ui-slice';

const CartButton = (props) => {
 const cartQuantity= useSelector(state=>state.cart.totalQuantity)
  const dispatch=useDispatch()

  const onToggle=()=>{
    dispatch(uiAction.toggle())
  }
  return (
    <button className={classes.button} onClick={onToggle} >
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
