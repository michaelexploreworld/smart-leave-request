import { connect } from 'react-redux';
import { compose } from 'redux';

import EnhancedTableComponent from './EnhancedTableComponent';
import { homeSelectors, homeActions } from './duck';

const mapStateToProps = state => ({
    deleteMessage: homeSelectors.getDeleteMessage(state),
});

const mapDispatchToProps = dispatch => ({
    onDeleteRequest: (ids) => {
        dispatch(homeActions.doDeleteLeaveRequests(ids));
    },
    onClearDeleteMessage: () => dispatch(homeActions.doClearDeleteLeaveRequestsError())
});

const enhance = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)

export default enhance(EnhancedTableComponent);