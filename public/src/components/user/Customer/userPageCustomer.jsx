import React from 'react';

import { withTranslate } from 'react-redux-multilingual';
const Project = React.lazy(() => import('./project.jsx'));


const UserPageCustomer = (props) => {
    const { translate } = props;

    return (
        <div className="main-page">

            <Project {...props}/>
        </div>
    );
};

export default withTranslate(UserPageCustomer);
