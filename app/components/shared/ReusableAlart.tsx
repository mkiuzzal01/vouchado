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

interface ReusableAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: "default" | "danger";
}

export default function ReusableAlert({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  variant = "default",
}: ReusableAlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white border border-slate-100 rounded-2xl max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base font-bold text-slate-800">
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-xs text-slate-400 font-medium leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2 sm:gap-0 mt-4">
          <AlertDialogCancel className="text-xs font-bold rounded-xl border-slate-200 text-slate-500 hover:bg-slate-50">
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className={`text-xs font-bold rounded-xl text-white transition ${
              variant === "danger"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-slate-800 hover:bg-slate-900"
            }`}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
