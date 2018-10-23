import { connect } from 'react-redux';
import { compose } from 'redux';

import { loginSelectors, loginActions } from '../login/duck';
import { homeSelectors, homeActions } from './duck';
import HomeComponent from './HomeComponent';
import withAuthentication from '../common/withAuthenticationHOC';
import withAppBar from '../common/withAppBarHOC';

const mapStateToProps = state => ({
    user: loginSelectors.getUser(state),
    loggingIn: loginSelectors.getLoggingIn(state),
    leaveRequests: homeSelectors.getLeaveRequests(state),
    fetchMessage: homeSelectors.getFetchMeaage(state)
});

const mapDispatchToProps = dispatch => ({
    onFetchRequest: () => dispatch(homeActions.doFetchLeaveRequests()),
    onClearFetchMessage: (message) => dispatch(homeActions.doClearFetchLeaveRequestsError(message)),
    onLogoutRequest: () => dispatch(loginActions.doLogout())
});

const enhance = compose(
    withAuthentication,
    withAppBar,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
)

export default enhance(HomeComponent);