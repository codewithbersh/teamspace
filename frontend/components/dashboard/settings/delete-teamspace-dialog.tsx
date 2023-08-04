"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { MinusCircle } from "lucide-react";
import { deleteTeamSpace } from "@/lib/axios/teamspace";

type Props = {
  access: string;
  teamSpaceId: string;
};

const DeleteTeamSpaceDialog = ({ access, teamSpaceId }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: deleteTeamSpace,
  });

  const handleDelete = () => {
    mutate(
      { access, teamSpaceId },
      {
        onSuccess: (values) => {
          if (values) {
            router.push("/teamspace");
            toast({
              description: "Team Space has been deleted.",
            });
          } else {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          }
        },
      }
    );
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete team space</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">
            Are you sure you want to continue?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            Warning: This action cannot be undone.
          </AlertDialogDescription>
          <AlertDialogDescription className="flex flex-col gap-2 text-start">
            <span className="flex gap-2 items-start  mt-2">
              <MinusCircle className="w-4 h-4 translate-y-[2px] shrink-0" />
              All members will lose access to this team space
            </span>
            <span className="flex gap-2 items-start  ">
              <MinusCircle className="w-4 h-4 translate-y-[2px] shrink-0" />
              All comments and history will be destroyed
            </span>
            <span className="flex gap-2 items-start ">
              <MinusCircle className="w-4 h-4 translate-y-[2px] shrink-0" />
              All tickets will be deleted
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTeamSpaceDialog;
