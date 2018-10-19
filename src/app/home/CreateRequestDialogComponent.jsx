import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';

class CreateRequestDialogComponent extends Component {
	state = {
		leaveType: '',
		startDate: '',
		endDate: ''
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleCreate = () => {

	}

	render() {
		const { fullScreen, open, handleClose } = this.props;
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
        			<Grid item xs={12}>
						<FormControl required fullWidth>
							<InputLabel htmlFor="leave-type-native-required">Leave type</InputLabel>
							<Select
								native
								value={leaveType}
								onChange={this.handleChange('leaveType')}
								name="leaveType"
								inputProps={{
									id: 'leave-type-native-required',
								}}
							>
								<option value="" />
								<option value={"Leave type 1"}>Leave type 1</option>
								<option value={"Leave type 2"}>Leave type 2</option>
								<option value={"Leave type 3"}>Leave type 3</option>
							</Select>
						</FormControl>
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

export default withMobileDialog()(CreateRequestDialogComponent);
