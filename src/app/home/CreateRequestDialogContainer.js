import { connect } from 'react-redux';
import { compose } from 'redux';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import CreateRequestDialogComponent from './CreateRequestDialogComponent';
import { homeSelectors, homeActions } from './duck';

const mapStateToProps = state => ({
    createMessage: homeSelectors.getCreateMessage(state),
});

const mapDispatchToProps = dispatch => ({
    onCreateRequest: (userId, leaveType, startDate, endDate, createdDate) => {
        dispatch(homeActions.doCreateLeaveRequest(userId, leaveType, startDate, endDate))
    },
    onClearCreateMessage: () => dispatch(homeActions.doClearCreateLeaveRequestError())
});

const enhance = compose(
    withMobileDialog(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)

export default enhance(CreateRequestDialogComponent);