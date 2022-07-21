import ReactDOM from 'react-dom';

const ModalRoot = document.querySelector('#modal-root');

interface ModalProps {
  children: JSX.Element;
}

function Modal({ children }: ModalProps) {
  return ReactDOM.createPortal(children, ModalRoot!);
}

export default Modal;
