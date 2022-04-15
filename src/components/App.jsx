import React from "react"
import css from './styles.module.css'
import { CheckboxGroup } from './common';
import { FILTER_STATUSES, filterOptions} from './constants';
import { Modal } from "./Modal";
import { ErrorBoundary } from "./ErrorBoundary";

export class App extends React.Component {
    state = {
        login: '',
        password: '',
        getNews: true,
    };

    inputLoginChangeHandler = (e) => {
        this.setState({login: e.target.value});
    };

    inputPasswordChangeHandler = (e) => {
        this.setState({password: e.target.value});
    };

    changeFilterHandler = (e) => {
        this.setState({gender: e.target.value})
    };

    handleCheckbox = () => {
        this.setState({getNews: !this.state.getNews});
    };

    render () {
        const {login, password, getNews, gender} = this.state
        
        return (
            <div className={css.container}>
                <span className={css.title}>Registration form</span>
                <form action="#">
                    <div className={css.user_details}>
                        <div>
                            <span className={css.details_input}>Login</span>
                            <input className={css.input_box}
                            value={login} 
                            type="text" 
                            placeholder="Enter your login" 
                            onChange={this.inputLoginChangeHandler}/>
                        </div>
                        <div className={css.details}>
                            <span className={css.details_input}>Password</span>
                            <input className={css.input_box} 
                            value={password} 
                            type="password" 
                            placeholder="Enter your password"
                            onChange={this.inputPasswordChangeHandler}/>
                        </div>
                    </div>
                    <div className={css.gender}>
                        <span className={css.gender_title}>Gender</span>
                        <div className={css.checkbox}>
                        <CheckboxGroup options={filterOptions} 
                        value={gender}
                        onChange={this.changeFilterHandler} />
                        </div>
                    </div>
                    <div className={css.list}>
                        <input type='checkbox' checked = {getNews} onChange={this.handleCheckbox} />
                        <span>Subscribe to the news</span>
                    </div>
                    <div>
                        <button className={css.button} type="button">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}
