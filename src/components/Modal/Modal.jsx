import React from "react";
import ReactDOM from "react-dom";
import { Context } from "../Context";
import PropTypes from "prop-types";
import css from './modal.module.css'

export class Modal extends React.Component {
    static contextType = Context;
        render () {
            const Modal = (
                <div className={css.container}>
                    <div className={css.modal}>
                        <span>Your login: {this.context.login}</span>
                        <span>Your password: {this.context.password}</span>
                        <span>Your gender: {this.props.gender}</span>
                        <button type="button" onClick={this.props.modalCloseBtn} className={css.close_btn}>OK</button>
                    </div>
                </div>
            )
        const body = document.querySelector("body");
        return ReactDOM.createPortal(Modal, body);
    }
}

Modal.propTypes = {
    onCloseModal: PropTypes.func,
};
