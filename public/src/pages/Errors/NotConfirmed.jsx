import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';
import './NotConfirmed.css';

export class NotConfirmed extends Component {
    render() {
        const { translate } = this.props;

        return (
            <div className="notConfirmed flex">
                {translate('notConfirmed')}
            </div>
        );
    }
}

export default withTranslate(NotConfirmed);
