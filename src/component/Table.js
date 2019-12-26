import React from 'react';
import axios from "axios";
import Select from 'react-select';

const Rows = [
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '50', label: '50' },
    { value: '100', label: '100' }
];
export default class Table extends React.Component {

    data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 9]
    constructor(props) {
        super(props);
        this.state = {
            rowsPerPage: 10,
            fromPage: 0,
            toPage: 10,
            totalPage: 10,
            currentPage: 1,
            totalRow: 100,
            data: null,
            selectedOption: null,
            shimmerCls: false,
            actualData: null

        }
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        this.setState({
            toPage: 0
        }, () => {
            var UpdateToPage = this.state.toPage + parseInt(selectedOption.value);
            this.setState({
                fromPage: 0,
                rowsPerPage: parseInt(selectedOption.value),
                toPage: UpdateToPage,
            }, () => {
                this.LoadData();
            })
        });
    };
    componentDidMount() {
        this.LoadData();
    }
    componentDidUpdate(prevProps) {
        if (this.props.City !== prevProps.City) {
            this.LoadData();
        }
        if (this.props.searchKeyword !== prevProps.searchKeyword) {
            if (this.props.searchKeyword === '') {
                this.LoadData()
            } else {
                this.UpdateSearchData(this.props.searchKeyword)
            }
        }
    }
    UpdateSearchData = (keyword) => {
        var obj = this.state.actualData;
        var NewData = []
        // iterate over each element in the array
        for (var i = 0; i < obj.length; i++) {
            if (has(obj[i], keyword.toUpperCase())) {
                NewData = [...NewData, obj[i]]
            }
        }
        function has(obj, value) {
            for (var id in obj) {
                obj[id] = obj[id].toString();
                if (obj[id] === value) {
                    return true;
                } else {
                    if (obj[id].includes(value)) {
                        return true
                    }
                }

            }
            return false;
        }
        this.setState({
            actualData: NewData
        }, () => { this.UpdateData() })

    }
    LoadData = () => {
        this.setState({
            shimmerCls: true
        })
        var me = this;
        axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=${this.props.City} `)
            .then(function (response) {
                // handle success
                var formateData = response.data.slice(me.state.fromPage, me.state.toPage);
                me.setState({
                    actualData: response.data,
                    data: formateData,
                    shimmerCls: false,
                    totalRow: response.data.length
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    rowSelect = (value) => {
        this.setState({
            shimmerCls: true,
            rowsPerPage: parseInt(value.value),
            page: 1,
            fromPage: 1,
            toPage: parseInt(value.value),

        }, () => {
            if (this.state.FilterView) {
                this.FilteredData();
            } else {
                this.LoadData();
            }
        })
    }
    UpdateData = () => {
        this.setState({
            data: this.state.actualData.slice(this.state.fromPage, this.state.toPage),
            totalRow: this.state.actualData.length
        })
    }
    next = () => {
        this.setState({
            toPage: this.state.toPage + this.state.rowsPerPage,
            fromPage: this.state.fromPage + this.state.rowsPerPage
        }, () => {
            this.UpdateData();
        })
    }
    previous = () => {
        this.setState({
            toPage: this.state.toPage - this.state.rowsPerPage,
            fromPage: this.state.fromPage - this.state.rowsPerPage
        }, () => {
            this.UpdateData();
        })
    }

    render() {
        const { selectedOption } = this.state;
        return (
            <div className={'table-ctr'}>
                <table >
                    <thead>
                        <tr>
                            <th className={'name'}>{'ID'}</th>
                            <th className={'name'}>{'Name'}</th>
                            <th className={'name'}>{'Branch'}</th>
                            <th className={'name'}>{'IFSC'}</th>
                            <th className={'name'}>{'City'}</th>
                            <th className={'name'}>{'district'}</th>
                            <th className={'name'}>{'State'}</th>
                            <th className={'name'}>{'Address'}</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.data !== null ?
                            this.state.data.map((value, index) => {
                                return <tr key={index}>
                                    <td className={`names `}>
                                        <div >
                                            {value.bank_id}
                                        </div>
                                    </td>
                                    <td className={`names `}>
                                        <div >
                                            {value.bank_name}
                                        </div>
                                    </td>
                                    <td className={`names `}>
                                        <div>
                                            {value.branch}
                                        </div>
                                    </td>
                                    <td className={`names `}>
                                        <div>
                                            {value.ifsc}
                                        </div>
                                    </td>
                                    <td className={`names `}>
                                        <div >
                                            {value.city}
                                        </div>
                                    </td>
                                    <td className={`names `}>
                                        <div >
                                            {value.district}
                                        </div>
                                    </td>
                                    <td className={`names `}>
                                        <div>
                                            {value.state}
                                        </div>
                                    </td>
                                    <td className={`address `}>
                                        <div>
                                            {value.address}
                                        </div>
                                    </td>
                                </tr>
                            })
                            : this.data.map((value, index) => {
                                return <tr key={index}>
                                    <td className={`names `}>
                                        <div className={`${this.state.shimmerCls ? 'shimmer' : ''}`}>{'nZCD'}</div>
                                    </td>
                                    <td className={`names `}>
                                        <div className={`${this.state.shimmerCls ? 'shimmer' : ''}`}>{'nX'}</div>
                                    </td>
                                    <td className={`names `}>
                                        <div className={`${this.state.shimmerCls ? 'shimmer' : ''}`}>{'n'}</div>
                                    </td>
                                    <td className={`names `}>
                                        <div className={`${this.state.shimmerCls ? 'shimmer' : ''}`}>{'n'}</div>
                                    </td>
                                    <td className={`names `}>
                                        <div className={`${this.state.shimmerCls ? 'shimmer' : ''}`}>{'n'}</div>
                                    </td>
                                    <td className={`names `}>
                                        <div className={`${this.state.shimmerCls ? 'shimmer' : ''}`}>{'n'}</div>
                                    </td>
                                    <td className={`names `}>
                                        <div className={`${this.state.shimmerCls ? 'shimmer' : ''}`}>{'n'}</div>
                                    </td>
                                    <td className={`address `}>
                                        <div className={`${this.state.shimmerCls ? 'shimmer' : ''}`}>{'n'}</div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <div className={'footer'}>
                                    <div className={'results'}>
                                        <div className={'arrows'}>
                                            <Select
                                                value={selectedOption}
                                                onChange={this.handleChange}
                                                options={Rows}
                                            />
                                        </div>
                                        <div>
                                            {this.state.fromPage + ' To'}
                                        </div>
                                        <div>
                                            {this.state.toPage}
                                        </div>
                                        <div className={'total-row'}>
                                            {'of  ' + this.state.totalRow}
                                        </div>
                                        <div className={'left'} onClick={this.previous}>{'<  '}</div>
                                        <div className={'right'} onClick={this.next}>{' >'}</div>
                                    </div>
                                </div>
                            </td>

                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}
Table.defaultProps = {
    searchKeyword: null
}
