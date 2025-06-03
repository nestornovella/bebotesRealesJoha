import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions: ToastOptions = {
  position: 'bottom-left',
  autoClose: 3000,
  theme:'dark'
};

export function showToast(
  message: string,
  type: 'success' | 'error' | 'info' | 'warning'
) {
  toast[type](message, toastOptions);
}