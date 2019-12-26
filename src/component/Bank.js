import React from 'react';
import Table from '../component/Table';
import Select from 'react-select';
const options = [
    { value: 'DELHI', label: 'DELHI' },
    { value: 'JAIPUR', label: 'JAIPUR' },
    { value: 'MUMBAI', label: 'MUMBAI' },
    { value: 'KOTA', label: 'KOTA' },
];
export default class Bank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            selectedOption: null,
            City: "MUMBAI",
            search: ''
        }
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        this.setState({ City: selectedOption.value })
    };
    handleSearchChange = (event) => {
        this.setState({ search: event.target.value }, () => {
            // this.handleSubmit(event)
        });
    }

    handleSubmit = (event) => {
        this.setState({
            searchKeyword: this.state.search
        })
        event.preventDefault();
    }
    render() {
        const { selectedOption } = this.state;
        return (
            <div className="main-ctr">
                <div className={"heading"}>
                    {'Fyle Bank Search'}
                </div>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                />
                <form  className={'search-form'} onSubmit={this.handleSubmit}>
                    <input className={'search-input'} 
                    placeholder={'Enter Your Search '}
                    type="text" value={this.state.search.toUpperCase()} 
                    onChange={this.handleSearchChange} />
                </form>
                <div className={'banks-ctr'}>
                    <Table
                        key={'table'}
                        data={this.state.data}
                        City={this.state.City}
                        searchKeyword={this.state.searchKeyword}
                    />
                </div>
            </div>

        )
    }
}
