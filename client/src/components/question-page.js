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
    console.log('componentDidMount ran')
    this.props.dispatch(actions.getQuestion());
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.dispatch(actions.putQuestion(this.state.value))
    document.getElementById("question-form").reset()
  }

  onChange(event) {
    this.setState({value: event.target.value})
  }

  render() {
    return (
      <div>
        <ul className="question-list">
          {this.props.question}
        </ul>
        <p>Your Score is {this.props.score}</p>
        <form id="question-form" onSubmit={e => this.onSubmit(e)}>
          <input type='text' placeholder="Your answer here!" onChange={e => this.onChange(e)}/>
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
