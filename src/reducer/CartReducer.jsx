export const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product } = action.payload;
    console.log(product);

    let existingProduct = state.cart.find(
      (curItem) => curItem.id == id + color
    );

    if (existingProduct) {
      let updatedProduct = state.cart.map((curElm) => {
        if (curElm.id == id + color) {
          let newAmount = curElm.amount + amount;
          if (newAmount >= curElm.max) {
            newAmount = curElm.max;
          }

          return {
            ...curElm,
            amount: newAmount,
          };
        } else {
          return curElm;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      let cartProduct;
      cartProduct = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      };
      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  if(action.type === "SET_DECREMENT"){
      let updatedProduct = state.cart.map((d)=>{
        if(d.id===action.payload){
            let decAmount = d.amount - 1;
            if(decAmount<= 1){
                decAmount = 1;

            }
            return {
                ...d,
                amount:decAmount,

            }
            

        }else{
                return d;
        }
      })
      return {...state, cart:updatedProduct}
  }
  if(action.type === "SET_INCREMENT"){
      let updatedProduct = state.cart.map((d)=>{
        if(d.id===action.payload){
            let incAmount = d.amount + 1;
            if(incAmount>= d.max){
                incAmount = d.max;

            }
            return {
                ...d,
                amount:incAmount,

            }
            

        }else{
                return d;
        }
      })
      return {...state, cart:updatedProduct}
  }


  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curElm) => curElm.id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }
 
  if(action.type === "CART_TOTAL_ITEM"){
   let updatedItemVal= state.cart.reduce((initialValue, curElem)=>{
    let {amount}=curElem;
    initialValue = initialValue+amount;
    return initialValue;
   },0)
   return{
    ...state,
    total_item:updatedItemVal,
   }
  }

  if(action.type === "CART_TOTAL_PRICE"){
    let total_price = state.cart.reduce((initialVal, curElem)=>{
        let {price, amount}=curElem;
        initialVal = initialVal+ price*amount;
        return initialVal;
    },0)
    return {
        ...state,
        total_amount:total_price,
    }
  }

  return state;
};
