import * as Cookies from 'js-cookie';

export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST';
export const getQuestionRequest = () => ({
  type: GET_QUESTION_REQUEST
});

export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const getQuestionSuccess = word => ({
  type: GET_QUESTION_SUCCESS,
  word
});

export const GET_QUESTION_ERROR = 'GET_QUESTION_ERROR';
export const getQuestionError = message => ({
  type: GET_QUESTION_ERROR,
  message
});

//GET_SCORE

export const PUT_QUESTION_REQUEST = 'PUT_QUESTION_REQUEST';
export const putQuestionRequest = () => ({
  type: PUT_QUESTION_REQUEST
});

export const PUT_QUESTION_SUCCESS = 'PUT_QUESTION_SUCCESS';
export const putQuestionSuccess = (word, score) => ({
  type: PUT_QUESTION_SUCCESS,
  word,
  score
});

export const PUT_QUESTION_ERROR = 'PUT_QUESTION_ERROR';
export const putQuestionError = message => ({
  type: PUT_QUESTION_ERROR,
  message
});

// AUTH

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = (googleId) => ({
  type: AUTH_SUCCESS,
  googleId : googleId.googleId
});

// export const authSuccess = (googleId) => {
//   //console.log('googleId', googleId.googleId);
//   return {type: AUTH_SUCCESS, test: 'HIIIIIEEEE'}
 
// };

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = message => ({
  type: AUTH_ERROR,
  message
});

export const authenticate = () => dispatch => {
  const accessToken = Cookies.get('accessToken');
  console.log(accessToken);
  if (accessToken) {
    fetch('/api/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => {
        if (!res.ok) {
          if (res.status !== 401) {
            // Unauthorized, clear the cookie and go to
            // the login page
            console.log('hii')
            Cookies.remove('accessToken');
            return;
          }
          throw new Error(res.statusText);
        }
        return res.json();
        //change under this to redux
      })
      .then(currentUser => { 
        console.log(currentUser, 'user')
        return dispatch(authSuccess(currentUser)); 
      });
  }
};

export const getQuestion = () => dispatch => {
  const accessToken = Cookies.get('accessToken');
  //dispatch(getQuestionRequest());
  fetch('http://localhost:8080/api/questions', {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
  }).then(res => {
      if (!res.ok) {
        console.log('its dead');
        return Promise.reject(res.statusText);
      }
      console.log('hello!');
      return res.json();
    })
    .then(question => {
      console.log('QUES*)*)*)**)', question);
      return dispatch(getQuestionSuccess(question));
    })
    .catch(error => dispatch(getQuestionError(error.message)));
};

export const putQuestion = data => dispatch => {
  const opts = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  };
  dispatch(putQuestionRequest());
  fetch('http://localhost:8080/api/questions/update', opts)
    .then(res => {
      if (!res.ok) {
        console.log('it doesnt work');
        return Promise.reject(res.statusText);
      }
    })
    .then(userAnswer => {
      console.log('hullOOOO from PUT!');
      dispatch(putQuestionSuccess(userAnswer));
    })
    .catch(err => {
      dispatch(putQuestionError(err));
    });
};

// export const addPost = (data) => dispatch => {
//   // console.log('data', data);
//    const opts = {
//        method: "POST",
//        body: JSON.stringify(data),
//        headers: {
//        'Accept': 'application/json, text/plain, */*',
//        'Content-Type': 'application/json'
//    },
//    }
//    dispatch(addPostRequest());
//    fetch(`${REACT_APP_API_BASE_URL}/post`, opts)
//        .then(res => {
//            // if(!res.ok) {
//            //     return Promise.reject(res.statusText)
//            // }
//            return res.json()
//        })
//        .then((posts) => {
//            console.log('in then')
//            console.log('posts', posts);
//            dispatch(getPostsSuccess(posts))
//        })
//        .catch((err) => {
//            dispatch(addPostError(err))
//        })
// }

//PUT QUESTION



//new action sends INPUT word to the backend to be compared with the current answer and runs algorithm