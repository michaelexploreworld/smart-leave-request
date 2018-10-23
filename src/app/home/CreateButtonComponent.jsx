import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class CreateButtonComponent extends Component {
    handleClickOpen = () => {
        this.props.history.push("/createLeaveRequest");
    };
    
    handleClose = () => {
        this.props.history.push("/");
    };

    render() {
        const { children, open } = this.props;
        const childrenWithProps = React.cloneElement(children, { open: open, handleClose: this.handleClose });

        return (
            <div>
                <Button variant="fab" color="primary" aria-label="Add" onClick={this.handleClickOpen}>
                    <AddIcon />
                </Button>
                {childrenWithProps}
            </div>
        );
    }
}

export default CreateButtonComponent;
