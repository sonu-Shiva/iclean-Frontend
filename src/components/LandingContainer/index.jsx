import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  Table,
  Icon,
} from 'semantic-ui-react';

import { USER_SELECTED } from '../../store/actions';
// import { userSelector } from '../../store/selectors';

import './landingStyles.css';

class LandingContainer extends Component {

  static propTypes = {
    type: PropTypes.string,
    match: PropTypes.object,
    data: PropTypes.array,
    hasStatus: PropTypes.bool,
    redirectTo: PropTypes.string,
    hasDateAndTime: PropTypes.bool,
    history: PropTypes.object,
    // handleUsersWashSettings: PropTypes.func,
    selectedUserOrder: PropTypes.func,
  };

  handleRedirection = (item) => {
    const { redirectTo, history, selectedUserOrder, type } = this.props;
    if (redirectTo) {
      if (type === 'driver') {
        history.push( `${redirectTo}${item.driver_id}/` );
      } else {
        selectedUserOrder(item.id);
        history.push( `${redirectTo}${item.user_id}/` );
      }
    }
  };

  render(){
    const { data, hasStatus, hasDateAndTime, type } = this.props;
    const entity = type === 'driver' ? 'drivers' : 'items';
    return (
      <div className="landing-container">
        {
          (data && data.length > 0) ?
          <Table padded selectable>
            <Table.Body>
              { data.map((item, i) => {
                const dateTime = item.drop_off_date;

                return (
                  <Table.Row key={i + 1} onClick={() => this.handleRedirection(item)}>
                    <Table.Cell>{item.name ? item.name : item.customer_name}</Table.Cell>
                    {hasStatus && <Table.Cell>Status - {item.hasStatus}</Table.Cell>}
                    {hasDateAndTime && <Table.Cell textAlign='right'>{moment(dateTime).format('dddd, MMMM Do, YYYY')}</Table.Cell>}
                    <Table.Cell textAlign='right'>
                      <Icon name='arrow right' />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table> : (<h4>No { entity } to display.</h4>)
        }
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   usersList: userSelector.allUsersList(state),
// });

const mapDispatchToProps = (dispatch) => ({
  selectedUserOrder: async (id) => {
    return dispatch(USER_SELECTED(id));
  },
});

export default connect(null, mapDispatchToProps)(withRouter(LandingContainer));

// export default LandingContainer;
