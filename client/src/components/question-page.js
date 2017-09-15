import React from 'react';
// import * as Cookies from 'js-cookie';
import * as actions from '../actions/actions'
import {connect} from 'react-redux'
let boo;
class QuestionPage extends React.Component {

    componentDidMount() {
        this.props.dispatch(actions.getQuestion());
    }
    
    onSubmit(event) {
        event.preventDefault();
        //make compare action here
        //action makes the fetch to the database to see if userinput is the same as current answer
        // console.log("hellloooooooooo", boo)
        // console.log("hellloooooooooo props", this.props.value)
        // console.log('QUESTIONNN', this.props.currentAnswer)
        this.props.dispatch(actions.putQuestion(boo))
        // this.props.dispatch(actions.getQuestion());
    }

    onChange(value) {
        // console.log(value.target.value)
        boo = value.target.value;
        // console.log('boooo', boo)
        this.setState({value: value.target.value})
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