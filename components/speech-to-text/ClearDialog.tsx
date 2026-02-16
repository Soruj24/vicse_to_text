import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
      <AlertDialogContent className="rounded-[2rem] p-8 border-white/10 bg-background/90 backdrop-blur-xl shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
              <span className="text-3xl">🗑️</span>
            </div>
            Clear everything?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg text-center max-w-[300px] mx-auto leading-relaxed">
            This will permanently delete your current transcript. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8 gap-3 sm:gap-4 flex-col sm:flex-row">
          <AlertDialogCancel className="h-12 rounded-xl font-semibold border-2 hover:bg-secondary/80 transition-colors w-full sm:w-auto">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="h-12 rounded-xl font-bold bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-auto shadow-lg shadow-destructive/20"
          >
            Yes, Clear All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
