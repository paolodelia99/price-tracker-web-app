import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts, isFormDashBoard }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType} ${isFormDashBoard ? 'dashboard-alert': null}`} >
            {alert.msg}
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
    isFormDashBoard: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);