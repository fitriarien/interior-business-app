const productPageReducer = (state = 1, action) => {
  switch (action.type) {
    case 'SET_PAGE_PRODUCT':
      return action.payload;
      break;
    default:
      return state;
      break;
  }
}

export default productPageReducer;