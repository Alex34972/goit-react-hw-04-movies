import PropTypes from 'prop-types';

import s from './Error.module.css';

export default function ErrorComponent({ message }) {
  return (
    <div role="alert">
      <p text={message} className={s.Wrapper}>
        {message}
      </p>
    </div>
  );
}

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired,
};
