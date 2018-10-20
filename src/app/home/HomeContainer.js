import { connect } from 'react-redux';
import { compose } from 'redux';

import { loginSelectors } from '../login/duck';
import HomeComponent from './HomeComponent';
import withAuthentication from '../common/withAuthenticationHOC';

const mapStateToProps = state => ({
    user: loginSelectors.getUser(state),
});

const enhance = compose(
    withAuthentication,
    connect(
        mapStateToProps,
    )
)

export default enhance(HomeComponent);