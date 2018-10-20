import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { Mutation } from "react-apollo";

import TypeSelectorComponent from './TypeSelectorComponent';
import { createLeaveRequestMutation } from '../queries/queries';

class CreateRequestDialogComponent extends Component {
	state = {
		leaveType: '',
		startDate: '',
		endDate: ''
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleCreate = (LeaveRequests) => (e) => {
		e.preventDefault();

		const { userId, handleClose } = this.props;
		const { leaveType, startDate, endDate } = this.state;

		if(userId && leaveType && startDate && endDate) {
			LeaveRequests({ 
				variables: {
					leave_request: {
						user: userId.toString(),
						leave_type: leaveType, 
						start_datetime: startDate,
						end_datetime: endDate
					} 
				}
			});
		}

		handleClose();
	}

	render() {
		const { fullScreen, open, handleClose } = this.props;
		const { leaveType, startDate, endDate } = this.state;

		return (
			<Mutation mutation={createLeaveRequestMutation}>
				{(LeaveRequests, { data }) => (
					<Dialog
						fullScreen={fullScreen}
						open={open}
						onClose={handleClose}
						aria-labelledby="responsive-dialog-title"
					>
						<DialogTitle id="responsive-dialog-title">Create Leave Request</DialogTitle>
						<DialogContent>
							<Grid container spacing={24}>
								<Grid item xs={12}>
									<TypeSelectorComponent leaveType={leaveType} handleTypeChange={this.handleChange('leaveType')}/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="startDate"
										label="Start date"
										type="date"
										defaultValue={startDate}
										InputLabelProps={{
											shrink: true,
										}}
										fullWidth
										required
										onChange={this.handleChange('startDate')}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="endDate"
										label="End date"
										type="date"
										defaultValue={endDate}
										InputLabelProps={{
											shrink: true,
										}}
										fullWidth
										required
										onChange={this.handleChange('endDate')}
									/>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button onClick={this.handleCreate(LeaveRequests)} color="primary" autoFocus>
								Create
							</Button>
						</DialogActions>
					</Dialog>
				)}
			</Mutation>
		);
	}
}

CreateRequestDialogComponent.propTypes = {
  	fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(CreateRequestDialogComponent);
