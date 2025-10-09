import toast from 'react-hot-toast';

export const toastSuccess = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#10b981',
      color: 'white',
      fontWeight: '500',
    },
    iconTheme: {
      primary: 'white',
      secondary: '#10b981',
    },
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    duration: 5000,
    position: 'top-right',
    style: {
      background: '#ef4444',
      color: 'white',
      fontWeight: '500',
    },
  });
};

export const toastWarning = (message: string) => {
  toast(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#f59e0b',
      color: 'white',
      fontWeight: '500',
    },
    icon: '⚠️',
  });
};

export const toastInfo = (message: string) => {
  toast(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#3b82f6',
      color: 'white',
      fontWeight: '500',
    },
    icon: 'ℹ️',
  });
};

export const toastLoading = (message: string) => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: '#6b7280',
      color: 'white',
      fontWeight: '500',
    },
  });
};

export const toastDismiss = (toastId: string) => {
  toast.dismiss(toastId);
};