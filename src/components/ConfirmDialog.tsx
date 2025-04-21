// components/ConfirmDialog.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  interface Props {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title?: string;
    message?: string;
  }
  
  export function ConfirmDialog({
    open,
    onConfirm,
    onCancel,
    title = "¿Estás seguro?",
    message = "Esta acción no se puede deshacer.",
  }: Props) {
    return (
      <Dialog open={open} onOpenChange={onCancel}>
        <DialogContent
          className="bg-white text-black p-6 rounded-lg shadow-lg border border-gray-300 max-w-md"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
            <DialogDescription className="text-sm text-gray-700 mt-1">
              {message}
            </DialogDescription>
          </DialogHeader>
  
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="border border-gray-400 text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </Button>
  
            <Button
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
