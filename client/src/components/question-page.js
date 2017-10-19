import React from 'react';
// import * as Cookies from 'js-cookie';
import * as actions from '../actions/actions'
import {connect} from 'react-redux'
class QuestionPage extends React.Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    componentDidMount() {
        this.props.dispatch(actions.getQuestion());
    }
    
    onSubmit(event) {
        event.preventDefault();
        this.props.dispatch(actions.putQuestion(this.state.value))
        // this.props.dispatch(actions.getQuestion());
    }

    onChange(event) {
        // boo = value.target.value;
        // console.log('boooo', boo)
        this.setState({value: event.target.value})
    }

    render() {
        // const questions = this.state.question.map((question, index) =>
        //     <li key={index}>{this.props.question}</li>
        // );

        return (
            <div>
            <ul className="question-list">
                {this.props.question}
            </ul>
            <p>Your Score is {this.props.score}</p>
            <form onSubmit={e => this.onSubmit(e)}>
                <input type='text' placeholder="Your answer here!" 
                onChange={e => this.onChange(e)}
                />
                <button type="submit">Submit Answer</button>
            </form> 

            <a href="/api/auth/logout">logout</a>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    question: state.question,
    currentAnswer: state.currentAnswer,
    score: state.score
});

export default connect(mapStateToProps)(QuestionPage);