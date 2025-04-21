import { useToastContext } from './NotificationContext';

export const useNotification = () => {
  const { showToast, hideToast } = useToastContext();

  const notifySuccess = (message: string) =>
    showToast({ message, type: 'success' });

  const notifyError = (message: string) =>
    showToast({ message, type: 'error' });

  const notifyConfirm = (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) =>
    showToast({
      message,
      type: 'confirm',
      onConfirm,
      onCancel,
    });

  return {
    notifySuccess,
    notifyError,
    notifyConfirm,
    hideToast,
  };
};
