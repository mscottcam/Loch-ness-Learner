export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST';
export const getQuestionRequest = () => ({
  type: GET_QUESTION
});

export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const getQuestionSuccess = words => ({
  type: GET_QUESTION_SUCCESS,
  words
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
export const putQuestionSuccess = (words, score) => ({
  type: PUT_QUESTION_SUCCESS,
  words,
  score
});

export const PUT_QUESTION_ERROR = 'PUT_QUESTION_ERROR';
export const putQuestionError = message => ({
  type: PUT_QUESTION_ERROR,
  message
});

// AUTH REQUEST

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = googleId => ({
  type: AUTH_SUCCESS, 
  googleId
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = message => ({
  type: AUTH_ERROR, 
  message
});

export const authenticate = () => dispatch => {
  const accessToken = Cookies.get('accessToken');
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
            Cookies.remove('accessToken');
            return;
          }
          throw new Error(res.statusText);
        }
        return res.json();
        //change under this to redux
      })
      .then(currentUser => authSuccess(currentUser));
  }
};

export const getQuestion = () => dispatch => {
  dispatch(getQuestionRequest());
  fetch('http://localhost:8080/api/questions')
    .then(res => {
      if (!res.ok) {
        console.log('its dead');
        return Promise.reject(res.statusText);
      }
      console.log('hello!');
      return res.json();
    })
    .then(question => {
      dispatch(getQuestionSuccess(question));
      console.log(question);
    })
    .catch(error => dispatch(getQuestionError(error.message)));
};

//PUT QUESTION