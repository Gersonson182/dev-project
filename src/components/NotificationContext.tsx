// src/components/NotificationContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ToastType = 'success' | 'error' | 'confirm';

type Toast = {
  message: string;
  type: ToastType;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type ToastContextType = {
  showToast: (toast: Toast) => void;
  hideToast: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (toast: Toast) => {
    setToast(toast);

    // Solo autocerrar si no es confirm
    if (toast.type !== 'confirm') {
      setTimeout(() => {
        setToast(null);
      }, 5000);
    }
  };

  const hideToast = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      {/* Confirmación como Dialog */}
      {toast?.type === 'confirm' && (
        <Dialog open={true} onOpenChange={hideToast}>
          <DialogContent className="text-center">
            <DialogHeader>
              <DialogTitle>{toast.message}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => {
                  toast.onCancel?.();
                  hideToast();
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  toast.onConfirm?.();
                  hideToast();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Toasts normales */}
      {toast && toast.type !== "confirm" && (
        <div className="fixed top-6 right-6 max-w-sm z-50 transition-all duration-300 animate-fade-in">
          <div
            className={`rounded-lg shadow-md p-4 text-sm text-white ${
              toast.type === 'success'
                ? 'bg-green-600'
                : 'bg-red-600'
            }`}
          >
            <p>{toast.message}</p>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToastContext debe usarse dentro de ToastProvider');
  return context;
};

