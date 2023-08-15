import { redirect, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { DialogModal } from "./dialog-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { updateMember } from "@/lib/axios/member";
import { useAcceptMemberModal } from "@/hooks/use-accept-member-modal";
import { DEMO_ACCOUNTS } from "@/lib/demo-tickets";
import { AlertCircle } from "lucide-react";

const AcceptMemberModal = () => {
  const { onClose, isOpen, member, setMember } = useAcceptMemberModal();
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: updateMember,
  });
  if (!member) return null;

  const handleSelectCancel = () => {
    onClose();
    setTimeout(() => {
      setMember(undefined);
    }, 1000);
  };

  const title = member.is_verified ? "Mark member as pending" : "Accept member";
  const description = member.is_verified
    ? "Members on pending status will not be able to access the team space."
    : "Active members may view and can make changes on your team space.";
  const acceptButtonText = member.is_verified ? "Save changes" : "Continue";

  const handleSelectAccept = () => {
    if (!session) redirect("/login");
    mutate(
      {
        access: session.user.backendSession.access,
        memberId: member.id,
        values: { is_verified: !member.is_verified },
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
              description: values.is_verified
                ? "Member has been verified successfully."
                : "Member has been marked as pending.",
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
      title={title}
      description={description}
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
              You are trying to modify the role of a demo account. Demo accounts
              cannot be updated in this context.
            </AlertDescription>
          </Alert>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => handleSelectCancel()}>
            Cancel
          </Button>
          <Button onClick={() => handleSelectAccept()} disabled={isDemoAccount}>
            {acceptButtonText}
          </Button>
        </DialogFooter>
      </div>
    </DialogModal>
  );
};

export default AcceptMemberModal;
