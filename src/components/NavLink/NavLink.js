import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavLink extends React.Component {
  render () {
    const pathname = this.context.router.route.location.pathname;
    const isActive = pathname === this.props.to || ('/' + pathname.split('/')[1] === this.props.to);
    const className = isActive ? 'active' : '';

    return (
      <li className={className}>
        <Link {...this.props}>
          {this.props.children}
        </Link>
      </li>
    );
  }
}

NavLink.contextTypes = {
  router: PropTypes.object,
};

export default NavLink;
