import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';

import TypeSelectorComponent from './TypeSelectorComponent';
import { messageType, MessageBar } from '../common/MessageBar';

const styles = theme => ({
    hidden: {
		position: 'relative',
        visibility: 'hidden',
    },
    loading: {
		position: 'absolute',
		margin: 'auto',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		visibility: 'visible',
	},
	messageBar: {
		position:'absolute',
		zIndex: 10000
	}
});

class CreateRequestDialogComponent extends Component {
	state = {
		leaveType: '',
		startDate: '',
		endDate: '',
		loading: false,
		messageShow: false
	};

	handleChange = name => event => {
		if(name === "leaveType") {
			this.setState({ [name]: JSON.parse(event.target.value) });
		} else {
			this.setState({ [name]: event.target.value });
		}
	};

	handleCreate = (e) => {
		e.preventDefault();

		const { userId, onCreateRequest, onClearCreateMessage } = this.props;
		const { leaveType, startDate, endDate } = this.state;

		this.setState({ loading: true });
		onClearCreateMessage();
		onCreateRequest(userId, leaveType, startDate, endDate);
	}

	handleMessageBarOpen = () => {
        this.setState({ messageShow: true });
    }

    handleMessageBarClose = () => {
        this.setState({ messageShow: false });
	}

	componentDidUpdate(prevProps) {
		if(prevProps.createMessage !== this.props.createMessage) {
			// Close dialog when uer submit successfully.
			if(this.props.createMessage === 'success') {
				this.handleMessageBarOpen();
				this.setState({ loading: false });
				this.props.handleClose();
			} else if(this.props.createMessage) { // Show error message.
				this.handleMessageBarOpen();
				this.setState({ loading: false });
			}
		}
	}

	render() {
		const { fullScreen, open, handleClose, createMessage, classes } = this.props;
		const { leaveType, startDate, endDate, loading, messageShow } = this.state;
		let messageBar;


		if(createMessage && createMessage === 'success') {
			messageBar = 
				<MessageBar 
					className={classes.messageBar}
					open={messageShow} 
					variant={messageType.SUCCESS} 
					message="Create leave request successfully" 
					handleClose={this.handleMessageBarClose} />
		} else if(createMessage) {
			messageBar = 
				<MessageBar 
					className={classes.messageBar}
					open={messageShow} 
					variant={messageType.ERROR} 
					message={createMessage} 
					handleClose={this.handleMessageBarClose} />
		}

		return (
			<div>
				{messageBar}
				<Dialog
					fullScreen={fullScreen}
					open={open}
					onClose={handleClose}
					aria-labelledby="responsive-dialog-title"
				>
					<div className={(loading) ? classes.hidden : ''}>
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
							<Button onClick={this.handleCreate} color="primary" autoFocus>
								Create
							</Button>
						</DialogActions>
						{loading && <CircularProgress className={classes.loading}  size={50} color="primary" />}
					</div>
				</Dialog>
			</div>
		);
	}
}

CreateRequestDialogComponent.propTypes = {
  	fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(CreateRequestDialogComponent);
