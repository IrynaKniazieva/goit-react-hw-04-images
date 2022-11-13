import PropTypes from 'prop-types';

const MessageError = ({ message }) => (
  <div>
    <p>{message}</p>
  </div>
);

MessageError.propTypes = {
  message: PropTypes.string.isRequired,
};

export default MessageError;
