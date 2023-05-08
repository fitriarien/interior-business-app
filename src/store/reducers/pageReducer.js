const pageReducer = (state = 1, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return action.payload;
      break;
    default:
      return state;
      break;
  }
}

export default pageReducer;