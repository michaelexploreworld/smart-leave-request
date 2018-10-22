import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

import TypeSelectorComponent from './TypeSelectorComponent';

class CreateRequestDialogComponent extends Component {
	state = {
		leaveType: '',
		startDate: '',
		endDate: ''
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleCreate = (e) => {
		e.preventDefault();

		const { userId, onCreateRequest } = this.props;
		const { leaveType, startDate, endDate } = this.state;

		onCreateRequest(userId, leaveType, startDate, endDate);
	}

	componentDidUpdate(prevProps) {
		// Close dialog when uer submit successfully.
		if(this.props.createMessage === 'success') {
			this.props.handleClose();
			this.props.onClearCreateMessage();
			this.setState({
				leaveType: '',
				startDate: '',
				endDate: ''
			});
		}
	}

	render() {
		const { fullScreen, open, handleClose, createMessage } = this.props;
		const { leaveType, startDate, endDate } = this.state;

		return (
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">Create Leave Request</DialogTitle>
				<DialogContent>
					<Grid container spacing={24}>
						{createMessage && createMessage !== 'success' && 
							<Grid item xs={12}>
								<div id="createMessage">{createMessage}</div>
							</Grid>}
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
					<Button onClick={this.handleCreate} color="primary" autoFocus>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

CreateRequestDialogComponent.propTypes = {
  	fullScreen: PropTypes.bool.isRequired,
};

export default CreateRequestDialogComponent;
