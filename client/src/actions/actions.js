

export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST';
export const getQuestionRequest = words => ({
    type: GET_QUESTION,
    words
})

export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const getQuestionSuccess = words => ({
    type: GET_QUESTION_SUCCESS,
    words
})

export const GET_QUESTION_ERROR = 'GET_QUESTION_ERROR';
export const getQuestionError = words => ({
    type: GET_QUESTION_ERROR,
    words
})

//GET_SCORE 

export const PUT_QUESTION_REQUEST = 'PUT_QUESTION_REQUEST';
export const putQuestionRequest = (words, score) => ({
    type: PUT_QUESTION_REQUEST,
    words,
    score
})

export const PUT_QUESTION_SUCCESS = 'PUT_QUESTION_SUCCESS';
export const putQuestionSuccess = (words, score) => ({
    type: PUT_QUESTION_SUCCESS,
    words,
    score
})

export const PUT_QUESTION_ERROR = 'PUT_QUESTION_ERROR';
export const putQuestionError = (words, score) => ({
    type: PUT_QUESTION_ERROR,
    words,
    score
})

export const getQuestion = () => dispatch => {
    dispatch(getQuestionRequest());
    fetch('http://localhost:8080/api/questions')
        .then(res => {
            if(!res.ok) {
                console.log('its dead')
                return Promise.reject(res.statusText)
            }
            console.log('hello!')
            return res.json();
        })
}
