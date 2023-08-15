import { redirect, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { DialogModal } from "./dialog-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useRemoveMemberModal } from "@/hooks/use-remove-member-modal";
import { deleteMember } from "@/lib/axios/member";
import { DEMO_ACCOUNTS } from "@/lib/demo-tickets";
import { AlertCircle } from "lucide-react";

const RemoveMemberModal = () => {
  const { onClose, isOpen, member, setMember } = useRemoveMemberModal();
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: deleteMember,
  });

  if (!member) return null;

  const handleSelectCancel = () => {
    onClose();
    setTimeout(() => {
      setMember(undefined);
    }, 1000);
  };

  const handleSelectAccept = () => {
    if (!session) redirect("/login");
    mutate(
      {
        access: session.user.backendSession.access,
        memberId: member.id,
      },
      {
        onSuccess: (values) => {
          if (!values) {
            toast({
              title: "Uh oh! Something went wrong.",
              description:
                "There was a problem with your request. Please try again later.",
            });
          } else {
            router.refresh();
            toast({
              description: "Member has been removed successfully.",
            });
            onClose();
          }
        },
      }
    );
  };

  const isDemoAccount = DEMO_ACCOUNTS.includes(member.user);

  return (
    <DialogModal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure you want to remove this member?"
      description="Keep in mind that removing members will result in the deletion of all data associated with this member within the team space."
    >
      <div className="space-y-6">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src={member.user_detail.image_url} />
            <AvatarFallback className="font-bold">
              {member.user_detail.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <p className="leading-none font-medium text-sm">
              {member.user_detail.first_name} {member.user_detail.last_name}
            </p>
            <p className="text-muted-foreground leading-none text-sm">
              {member.user_detail.email}
            </p>
          </div>
        </div>
        {isDemoAccount && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You are trying to delete a demo account. Demo accounts are not
              deletable.
            </AlertDescription>
          </Alert>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => handleSelectCancel()}>
            Cancel
          </Button>
          <Button
            onClick={() => handleSelectAccept()}
            variant="destructive"
            disabled={isDemoAccount}
          >
            Yes, Continue
          </Button>
        </DialogFooter>
      </div>
    </DialogModal>
  );
};

export default RemoveMemberModal;
