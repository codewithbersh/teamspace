import { redirect, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { DialogModal } from "./dialog-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { updateMember } from "@/lib/axios/member";
import { useUpdateRoleModal } from "@/hooks/use-update-role-modal";

const UpdateRoleModal = () => {
  const { onClose, isOpen, member, setMember } = useUpdateRoleModal();
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

  const title =
    member.role === "AD" ? "Remove as admin" : "Add member as admin";
  const description =
    "Admins can create/update tickets & accept/remove team space members.";
  const acceptButtonText = "Save changes";

  const handleSelectAccept = () => {
    if (!session) redirect("/login");
    mutate(
      {
        access: session.user.backendSession.access,
        values: { role: member.role === "AD" ? "NA" : "AD" },
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
              description: "Member role has been updated.",
            });
            onClose();
          }
        },
      }
    );
  };
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
        <DialogFooter>
          <Button variant="outline" onClick={() => handleSelectCancel()}>
            Cancel
          </Button>
          <Button onClick={() => handleSelectAccept()}>
            {acceptButtonText}
          </Button>
        </DialogFooter>
      </div>
    </DialogModal>
  );
};

export default UpdateRoleModal;
