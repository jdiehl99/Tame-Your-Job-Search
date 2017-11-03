import React,{Component} from 'react';
import './main.css';

class Main extends Component {
    render() {
        return (
            <div>
                <img src="logo.png" alt="Tame Your Job Search"/><br/>
                <button type="button" className="btn btn-warning">Register</button>
                <button type="button" className="btn btn-warning">Login</button>
            </div>
        )
    }
}

export default Main;