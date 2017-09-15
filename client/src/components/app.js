import React from 'react';
// import * as Cookies from 'js-cookie';
import * as actions from '../actions/actions';
import {connect} from 'react-redux'

import QuestionPage from './question-page';
import LoginPage from './login-page';
import './app.css'

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         currentUser: null
    //     };
    // }

    componentDidMount() {
        // console.log(actions.authenticate());
        this.props.dispatch(actions.authenticate())
        // Job 4: Redux-ify all of the state and fetch calls to async actions.
        // const accessToken = Cookies.get('accessToken');
        // if (accessToken) {
        //     fetch('/api/me', {
        //         headers: {
        //             'Authorization': `Bearer ${accessToken}`
        //         }
        //     }).then(res => {
        //         if (!res.ok) {
        //             if (res.status !== 401) {
        //                 // Unauthorized, clear the cookie and go to
        //                 // the login page
        //                 Cookies.remove('accessToken');
        //                 return;
        //             }
        //             throw new Error(res.statusText);
        //         }
        //         return res.json();
        //     }).then(currentUser =>
        //         this.setState({
        //             currentUser
        //         })
        //     );
        // }
    }

    render() {
        const {currentUser} = this.props;
        // console.log(currentUser, 'test');
        if (!currentUser) {
            return <LoginPage />;
        }
        else {
        return <QuestionPage />;
        }
    }
}

const mapStateToProps = (state, props) => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps)(App);

