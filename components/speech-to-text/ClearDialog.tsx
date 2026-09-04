import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface ClearDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ClearDialog({
  open,
  onOpenChange,
  onConfirm,
}: ClearDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-xl p-8 border border-border shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-center">
            Clear everything?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-center max-w-xs mx-auto leading-relaxed">
            This will permanently delete your current transcript. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 gap-2 sm:gap-3 flex-col sm:flex-row">
          <AlertDialogCancel className="h-11 rounded-lg font-semibold border hover:bg-muted transition-colors w-full sm:w-auto">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="h-11 rounded-lg font-bold bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-auto shadow-xs shadow-destructive/20"
          >
            Yes, Clear All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
