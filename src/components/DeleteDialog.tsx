import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ReactNode } from 'react';
import { Button } from './ui/button';

interface DeleteDialogProps {
  trigger: string | ReactNode;
  title?: string;
  onDelete: () => void;
}

const DeleteDialog = ({
  trigger,
  title = 'Are you sure want to delete this todo?',
  onDelete,
}: DeleteDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              className="text-white hover:text-white bg-primary"
              variant="default"
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-transparent text-primary border border-primary hover:bg-transparent"
              onClick={onDelete}
            >
              Remove
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteDialog;
