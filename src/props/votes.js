import PropTypes from 'prop-types';

const voteShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  position: PropTypes.bool.isRequired,
  billTitle: PropTypes.string.isRequired,
  billSlug: PropTypes.string.isRequired,
  billNumber: PropTypes.string.isRequired,
  billUri: PropTypes.string.isRequired,
});

export {voteShape};
