import React from "react";
import FormatPrice from "../Helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import {FaTrash} from "react-icons/fa"
import { useCartContext } from "../context/CartContext";

const CartItem = ({ id, name, image, color, price, amount }) => {

  const {removeItem, setDecrease, setIncrease}=useCartContext()
    
  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt="" />
          </figure>
        </div>
        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}
            >

            </div>
          </div>
        </div>
      </div>
      <div className="cart-hide">
        <p>
            <FormatPrice price={price}/>
        </p>
      </div>
       <CartAmountToggle
       amount={amount}
       setDecrease={()=>setDecrease(id)}
       setIncrease={()=>setIncrease(id)}
       />
       <div className="cart-hide">
        <p><FormatPrice price={price*amount}/></p>
       </div>
       <div>
        <FaTrash className="remove_icon" onClick={()=>removeItem(id)}/>
       </div>
    </div>
  );
};

export default CartItem;
