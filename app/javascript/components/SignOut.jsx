import React from 'react';
import Axios from "axios";

export default class SignOut extends React.Component {
    constructor(props) {
        super(props);
        this.state ={ hasError: false };
    }

    componentDidMount() {
            Axios({
                method: 'delete',
                url: '/auth/sign_out',
                data: JSON.parse(sessionStorage.user)
            }).then(response => {
                this.props.history.push('/');
            }).catch(error => {
                this.setState({ hasError: true })
            })
        };

    render() {
        if (this.state.hasError) {
            return <p>You must login at first</p>;
        } else {
            return 'Success sign out';
        }
    }

}
