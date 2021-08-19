import PropTypes from 'prop-types';
import s from './Button.module.css';
export default function Button({ text }) {
  return <button className={s.button}>{text}</button>;
}
Button.propTypes = {
  text: PropTypes.string.isRequired,
};
