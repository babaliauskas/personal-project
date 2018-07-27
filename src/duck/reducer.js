

const initialState = {
    user: {},
    cart: [],
    total: [],
    gallery: [],
    tickets: [],
  };


  const TICKETS = "TICKETS";
  const GALLERY = "GALLERY";
  const EMPTY = "EMPTY";
  const QUANTITY = 'QUANTITY';
  const TOTAL = 'TOTAL';
  const CART = 'CART';
  const LOGIN = "LOGIN";
  const ADD_ITEM = 'ADD_ITEM';
  const DELETE_ITEM = 'DELETE_ITEM';

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {user: action.payload });
        case ADD_ITEM:
            return Object.assign({}, state, {cart: action.payload });
        case DELETE_ITEM:
            return Object.assign({}, state, {cart: action.payload});
        case CART:
            return Object.assign({}, state, {cart: action.payload});
        case TOTAL:
            return Object.assign({}, state, {total: action.payload})
        case QUANTITY:
            return Object.assign({}, state, {cart: action.payload});
        case EMPTY:
            return Object.assign({}, state, {cart: []});
        case GALLERY:
            return Object.assign({}, state, {gallery: action.payload}); 
        case TICKETS:
            return Object.assign({}, state, {tickets: action.payload});
        default:
            return state
    }
}

export function login(user ) {
    return {
      type: LOGIN,
      payload: user
    };
}

export function addItem(item) {
    return {
        type: ADD_ITEM,
        payload: item,
    }
}

export function deleteItem(dlt) {
    return {
        type: DELETE_ITEM,
        payload: dlt
    }
}

export function getCart(cart) {
    return {
        type: CART,
        payload: cart
    }
}

export function total(num) {
    return {
        type: TOTAL,
        payload: num
    }
}

export function quantity(qtn) {
    return {
        type: QUANTITY,
        payload: qtn
    }
}

export function empty() {
    return {
        type: EMPTY
    }
}

export function addGallery(gallery) {
    return {
        type: GALLERY,
        payload: gallery
    }
}

export function addTicket(tickets) {
    return {
        type: TICKETS,
        payload: tickets
    }
}