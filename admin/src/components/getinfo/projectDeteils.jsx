import MaterialTable from 'material-table';
import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';
import { respons } from '../../servises';

import { forwardRef } from 'react';
import './index.css'

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Deteils from '@material-ui/icons/LibraryAdd';
import { withRouter } from 'react-router-dom';



const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    Deteils: forwardRef((props, ref) => <Deteils {...props} ref={ref} />)
};


export class projectDeteils extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Status: 0
        }
    }

    componentDidMount() {
        respons('get', '/projectStatus?' + new URLSearchParams({ id: this.props.match.params.id })).then((data) => {
            this.setState({ Status: data.Status })
        })
    }

    onRowDelete = (dat) => {
        const body = {
            id: dat.Id
        }
        respons('delete', '/offeredcontractors', JSON.stringify(body))
    }

    onRowUpdate = (dat) => {
        respons('put', '/offeredcontractors', JSON.stringify(dat))
    }

    ToCheck = () => {
        respons('put', '/projectCkeck', JSON.stringify({ id: this.props.match.params.id, status: 2 })).then(data => {
                this.props.history.push('/')
        })




    }
    Close = () => {
        respons('put', '/projectCkeck', JSON.stringify({ id: this.props.match.params.id, status: 5 }))
        this.props.history.push('/')
    }

    render() {
        const { translate } = this.props;
        const tableRef = React.createRef();

        const response = (query) => {
            const body = {
                orderDirection: query.orderDirection ? query.orderDirection : 'desc',
                orederFild: query.orderBy ? query.orderBy.field : 'Project_ID',
                pageSize: query.pageSize ? query.pageSize : 5,
                pageNumber: query.page ? query.page : 0,
                search: query.search ? query.search : '',
                searchFields: ['Project_ID', 'LoginContractor', 'LoginAdministrator', 'ContractorSuggestedPrice']
            }

            return new Promise((res, rej) => {
                Promise.all([
                    new Promise((res, rej) => {
                        res(respons('get', '/offeredcontractors?' + new URLSearchParams(body)).then(data => data))
                    }),
                    new Promise((res, rej) => {
                        res(respons('get', '/offeredcontractorsPage').then(data => data))
                    })
                ]).then((data) => {
                    res({
                        data: data[0],
                        page: query.page,
                        totalCount: data[1][0].pagesNumber
                    })
                })
            })
        }

        const responseListWork = (query) => {
            const body = {
                orderDirection: query.orderDirection ? query.orderDirection : 'desc',
                orederFild: query.orderBy ? query.orderBy.field : 'Project_ID',
                pageSize: query.pageSize ? query.pageSize : 5,
                pageNumber: query.page ? query.page : 0,
                search: query.search ? query.search : '',
                searchFields: ['Project_ID', 'DateCreation', 'TypeWork', 'ScopeWork', 'PlaceConstructionWorks', 'ApproximateConstructionEstimate'],
                projectId: this.props.match.params.id
            }

            return new Promise((res, rej) => {
                Promise.all([
                    new Promise((res, rej) => {
                        res(respons('get', '/listconstructionworks?' + new URLSearchParams(body)).then(data => data))
                    }),
                    new Promise((res, rej) => {
                        res(respons('get', '/listconstructionworksPage').then(data => data))
                    })
                ]).then((data) => {
                    res({
                        data: data[0],
                        page: query.page,
                        totalCount: data[1][0].pagesNumber
                    })
                })
            })
        }

        return (
            <div className="users">
                {(this.state.Status == 1 || this.state.Status == 4) && (
                <div className='button-send'>
                 {this.state.Status == 1 && (
                    <button className='btn btn-primary check' onClick={this.ToCheck}>{translate('ToCheck')}
                </button>
                 )}
                { this.state.Status == 4 && (
                    <button className='btn btn-primary check' onClick={this.Close}>{translate('Close')}
                </button>

                  )}
                </div>
                )}
                {(this.state.Status == 2) && (
                <div className="m-4">
                <MaterialTable
                    icons={tableIcons}
                    tableRef={tableRef}
                    title={translate('offerredContractor')}
                    columns={[
                        { title: translate('Project_ID'), field: "Project_ID", editable: 'never' },
                        { title: translate('loginContractor'), field: "LoginContractor", editable: 'never' },
                        { title: translate('loginAdmin'), field: "LoginAdministrator", editable: 'never' },
                        { title: translate('contractorSuggestedPrice'), field: "ContractorSuggestedPrice", editable: 'never', type: 'currency', currencySetting: { currencyCode: 'UAH' } }
                    ]}

                    data={
                        response
                    }
                    editable={
                        {
                            onRowDelete: (dat) =>
                                new Promise((res, rej) => {
                                    this.onRowDelete(dat);
                                    tableRef.current.onQueryChange()
                                    res();
                                })
                            }}
                        localization={
                            {
                                body: {
                                    addTooltip: translate('addTooltip'),
                                    editTooltip: translate('editTooltip'),
                                    deleteTooltip: translate('deleteTooltip'),
                                    editRow: {
                                        deleteText: translate('deleteText'),
                                        cancelTooltip: translate('deleteTooltipDelete'),
                                        saveTooltip: translate('saveTooltip'),
                                    }

                                },
                                header: {
                                    actions: translate('actions')
                                },
                                pagination: {
                                    firstTooltip: translate('firstTooltip'),
                                    lastTooltip: translate('lastTooltip'),
                                    nextTooltip: translate('nextTooltip'),
                                    previousTooltip: translate('previousTooltip')
                                },
                                toolbar: {
                                    exportTitle: translate('export'),
                                    searchTooltip: translate('search'),
                                    searchPlaceholder: translate('search')
                                }
                            }
                        }
                    options={{
                        sorting: true,
                        search: true,
                        exportButton: true,
                        actionsColumnIndex: -1,
                    }}
                    />
                    </div>
                 )}
                <div className="m-4">
                    <MaterialTable
                        icons={tableIcons}
                        tableRef={tableRef}
                        title={translate('ListWork')}
                        columns={[
                            { title: translate('Project_ID'), field: "Project_ID", editable: 'never' },
                            { title: translate('DateCreation'), field: "DateCreation", editable: 'never', type: 'datetime' },
                            { title: translate('TypeWork'), field: "TypeWork", editable: 'never' },
                            { title: translate('ScopeWork'), field: "ScopeWork", editable: 'never' },
                            { title: translate('PlaceConstructionWorks'), field: "PlaceConstructionWorks", editable: 'never' },
                            { title: translate('ApproximateConstructionEstimate'), field: "ApproximateConstructionEstimate", editable: 'never', type: 'currency', currencySetting: { currencyCode: 'UAH' } }
                        ]}

                        data={
                            responseListWork
                        }
                        editable={
                            {
                                onRowDelete: (dat) =>
                                    new Promise((res, rej) => {
                                        this.onRowDelete(dat);
                                        tableRef.current.onQueryChange()
                                        res();
                                    })
                            }}
                        localization={
                            {
                                body: {
                                    addTooltip: translate('addTooltip'),
                                    editTooltip: translate('editTooltip'),
                                    deleteTooltip: translate('deleteTooltip'),
                                    editRow: {
                                        deleteText: translate('deleteText'),
                                        cancelTooltip: translate('deleteTooltipDelete'),
                                        saveTooltip: translate('saveTooltip'),
                                    }

                                },
                                header: {
                                    actions: translate('actions')
                                },
                                pagination: {
                                    firstTooltip: translate('firstTooltip'),
                                    lastTooltip: translate('lastTooltip'),
                                    nextTooltip: translate('nextTooltip'),
                                    previousTooltip: translate('previousTooltip')
                                },
                                toolbar: {
                                    exportTitle: translate('export'),
                                    searchTooltip: translate('search'),
                                    searchPlaceholder: translate('search')
                                }
                            }
                        }
                        options={{
                            sorting: true,
                            search: true,
                            exportButton: true,
                            actionsColumnIndex: -1,
                        }}
                    />
                </div>
            </div>
        )
    };
}

export default withRouter(withTranslate(projectDeteils));