import { connect } from 'react-redux';
import { compose } from 'redux';

import { loginSelectors } from '../login/duck';
import { homeSelectors, homeActions } from './duck';
import HomeComponent from './HomeComponent';
import withAuthentication from '../common/withAuthenticationHOC';

const mapStateToProps = state => ({
    user: loginSelectors.getUser(state),
    leaveRequests: homeSelectors.getLeaveRequests(state),
    fetchMessage: homeSelectors.getFetchMeaage(state)
});

const mapDispatchToProps = dispatch => ({
    onFetchRequest: () => dispatch(homeActions.doFetchLeaveRequests()),
    onClearFetchMessage: (message) => dispatch(homeActions.doClearFetchLeaveRequestsError(message))
});

const enhance = compose(
    withAuthentication,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)

export default enhance(HomeComponent);