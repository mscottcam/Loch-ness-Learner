import React from 'react';
import * as Cookies from 'js-cookie';

export default class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            answer: ''
        };
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        fetch('/api/questions', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(questions =>
            this.setState({
                questions
            })
        );
    }

    onSubmit(event, state) {
        event.preventDefault();
        console.log(event)
    }

    // onChange(value) {
    //     console.log(value)
    //     this.setState({answer: value})
    //       {/* onChange={this.onChange} */}
    // }

    render() {
        const questions = this.state.questions.map((question, index) =>
            <li key={index}>{question}</li>
        );

        return (
            <div>
            <ul className="question-list">
                {questions}
            </ul>
            <form onSubmit={e => this.onSubmit(e)}>
                <input type='text' placeholder="Your answer here!" 
             
                />
                <button type="submit">Submit Answer</button>
            </form> 
            </div>
        );
    }
}
