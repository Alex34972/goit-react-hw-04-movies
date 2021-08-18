import s from './Button.module.css';
export default function Button({ text }) {
  return <button className={s.button}>{text}</button>;
}
