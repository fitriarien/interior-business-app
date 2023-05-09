const imagePageReducer = (state = 1, action) => {
  switch (action.type) {
    case 'SET_PAGE_IMAGE':
      return action.payload;
      break;
    default:
      return state;
      break;
  }
}

export default imagePageReducer;