import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class CreateButtonComponent extends Component {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { children } = this.props;
        const { open } = this.state;
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
