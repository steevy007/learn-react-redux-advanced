import { uiAction } from "./ui-slice";
import { cartAction } from "./cart-slice";
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-c7657-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartAction.replaceCart({
        items:cartData.items || [],
        totalQuantity:cartData.totalQuantity
      }));
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetchingt data failed !",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiAction.showNotification({
        status: "pending",
        title: "Sending....",
        message: "Sending cart data !",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-c7657-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) throw new Error("Send cart data fail");
    };

    try {
      await sendRequest();

      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success!",
          message: "Send cart data successfully !",
        })
      );
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error!",
          message: "Send cart data failed !",
        })
      );
    }
  };
};
