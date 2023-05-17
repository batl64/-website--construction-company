import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { withTranslate } from 'react-redux-multilingual';

const OpenProject = React.lazy(() => import('./OpenProject.jsx'));
const OfferredProject = React.lazy(() => import('./offerredProject.jsx'));
const Project = React.lazy(() => import('./project.jsx'));
const userPageContractor = (props) => {
    const { translate } = props;

    return (
        <div className="main-page">
            <Tabs
                variant='pills'
                defaultActiveKey="OpenProject"
                id='user-tab'
                className='mb-3'
                justify
                {...props}
            >
                <Tab eventKey='OpenProject' title={translate('OpenProject')}> <OpenProject {...props} /></Tab>
                <Tab eventKey='offered' title={translate('offerredProject')}> <OfferredProject {...props} /></Tab>
                <Tab eventKey='project' title={translate('project')}> <Project {...props} /></Tab>

            </Tabs>

        </div>
    );
};

export default withTranslate(userPageContractor);
