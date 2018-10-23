import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Query } from "react-apollo";

import { getLeaveTypesQuery } from '../queries/queries';
import { readClient } from '../../apolloClients'

class TypeSelectorComponent extends Component {
    displayLeaveTypes(loading, error, data) {
        if(loading) {
            return (<option disabled>Loading types...</option>);
        } else if(error) {
            return (<option disabled>Error! {error.message}</option>);
        } else {
            return data.LeaveTypes.map((type => {
                const value = {
                    id: type.id,
                    label: type.label
                };
                return (<option key={type.id} value={JSON.stringify(value)}>{type.label}</option>);
            }));
        }
    }

    render() {
        const { leaveType, handleTypeChange } = this.props;
        return (
            <Query query={getLeaveTypesQuery} client={readClient}>
                {({ loading, error, data }) => {
                    return (<FormControl required fullWidth>
                        <InputLabel htmlFor="leave-type">Leave type</InputLabel>
                        <Select
                            native
                            value={JSON.stringify(leaveType)}
                            onChange={handleTypeChange}
                            name="leaveType"
                            inputProps={{
                                id: 'leave-type',
                            }}
                        >
                            <option value="" />
                            {this.displayLeaveTypes(loading, error, data)}
                        </Select>
                    </FormControl>);
                }}
            </Query>
        );
    }
};

export default TypeSelectorComponent;