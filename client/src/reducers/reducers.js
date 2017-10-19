import * as actions from '../actions/actions'

// console.log('weird: ', actions.authSuccess())

const initialState = {
  question: null,
  currentAnswer: '',
  currentUser: null,
  score: 0
};
export const reducer = (state=initialState, action) => {
  // console.log(action, 'action')
   let copyState = state || initialState;
    state = Object.assign({}, copyState);
if(action.type === actions.AUTH_SUCCESS) {
  return ({
    ...state,
    currentUser: action.googleId
  })
}
else if (action.type === actions.GET_QUESTION_SUCCESS) {
  return ({
    ...state,
    question: action.word
  })
}
else if (action.type === actions.PUT_QUESTION_SUCCESS) {
  console.log('action word', action.word)
  return ({
    ...state,
    question: action.word.question,
    currentAnswer: action.word.answer,
    score: action.score
  })
}
console.log('STATE 2', state)

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
