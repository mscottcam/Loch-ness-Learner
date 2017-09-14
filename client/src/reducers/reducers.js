import * as actions from '../actions/actions'

console.log('weird: ', actions.authSuccess())

const initialState = {
  question: null,
  currentAnswer: null,
  currentUser: null,
  score: 0
};
export const reducer = (state, action) => {
  console.log(action, 'action')
   let copyState = state || initialState;
    state = Object.assign({}, copyState);
// if(action.type = AUTH_SUCCESS) {
//   action.test = 'whoopie'
//   console.log(action, 'haalllo')
//   state.currentUser = action.googleId
// }

  // switch (action.type) {  
  //       case actions.AUTH_SUCCESS:
  //       state.currentAnswer = 'henry'
  //     // return Object.assign({}, initialState, {
  //     //   initialState.currentUser = 'henry'
  //     // })
  //   case actions.GET_QUESTION_SUCCESS:
  //     return Object.assign({}, initialState, {
  //       question: action.word
  //     })
    // case actions.PUT_QUESTION_SUCCESS: 
    //   return Object.assign({}, initialState, {
    //     question: action.word,
    //     score: action.score
    //   })
    // default:
     return state;
  // }
}
