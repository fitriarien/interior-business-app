import { createStore } from 'redux';
import reducers from './reducers';

// const initialState = {
//   isLogin: !!localStorage.getItem('token') // convert null to false
// }

// const IsLogin = (state = initialState, action) => {
//   switch (action.type) {
//       case 'LOGIN':
//           return { ...state, isLogin: true };;
//           break;
//       case 'LOGOUT':
//           return { ...state, isLogin: false };;
//           break;
//       default:
//           return state;
//           break;
//   }
// }

const store = createStore(reducers);

export default store;