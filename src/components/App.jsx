import React from "react"
import css from './styles.module.css'
import { CheckboxGroup } from './common';
import { FILTER_STATUSES, filterOptions} from './constants';
import { Modal } from "./Modal";
import { ErrorBoundary } from "./ErrorBoundary";
import { Context } from "./Context";

export class App extends React.Component {
    state = {
        values: {login: '', password: '', gender: FILTER_STATUSES.OTHER,},
        getNews: true,
        errorLogin: '', 
        errorPassword: '',
        isModalVisible: false,
    };

    inputChangeHandler = (e) => { 
        this.setState((prevState) => ({
            values: {
                ...prevState.values,
                [e.target.name]: e.target.value
            },
        }))
    }

    handleCheckbox = () => {
        this.setState({getNews: !this.state.getNews});
    };

    findGenderLabel = () => {
        return filterOptions.find(({value}) => {
          return value === this.state.values.gender;
        });
    };

    modalCloseBtn = () => {
        this.setState({ isModalVisible: false });
    };

    handleRedisterBtn = () => {
        if (this.state.values.login.length >= 5 && this.state.values.password.length >= 5) {
            this.setState({isModalVisible: true})
        }
        
        if (this.state.values.login.length < 5) {
            this.setState({errorLogin: 'Login must be at least 5 characters'})
        } else {
            this.setState({errorLogin: ''})
        }

        if (this.state.values.password.length < 5) {
            this.setState({errorPassword: 'Password must be at least 5 characters'})
        } else {
            this.setState({errorPassword: ''})
        }
    }
    
    render () {
        const {values, getNews, isModalVisible, errorLogin, errorPassword} = this.state
        
        return (
            <div className={css.container}>
                <Context.Provider value={this.state.values}>
                <span className={css.title}>Registration form</span>
                <form action="#">
                    <div className={css.user_details}>
                        <div>
                            <span className={css.details_input}>Login</span>
                            <input className={css.input_box}
                            value={values.login} 
                            type="text"
                            name="login" 
                            placeholder="Enter your login" 
                            onChange={this.inputChangeHandler}/>
                            {errorLogin}
                        </div>
                        <div className={css.details}>
                            <span className={css.details_input}>Password</span>
                            <input className={css.input_box} 
                            value={values.password} 
                            type="password"
                            name="password" 
                            placeholder="Enter your password"
                            onChange={this.inputChangeHandler}/>
                            {errorPassword}
                        </div>
                    </div>
                    <div className={css.gender}>
                        <span className={css.gender_title}>Gender</span>
                        <div className={css.checkbox}>
                        <CheckboxGroup options={filterOptions} 
                        value={values.gender}
                        name='gender'
                        onChange={this.inputChangeHandler} />
                        </div>
                    </div>
                    <div className={css.list}>
                        <input type='checkbox' checked = {getNews} onChange={this.handleCheckbox} />
                        <span>Subscribe to the news</span>
                    </div>
                    <div>
                        <button className={css.button} type="button" onClick={this.handleRedisterBtn}>Register</button>
                    </div>
                </form>
                {isModalVisible && (<ErrorBoundary><Modal gender={this.findGenderLabel().label} modalCloseBtn={this.modalCloseBtn}/></ErrorBoundary>)}
                </Context.Provider>
            </div>
        )
    }
}
