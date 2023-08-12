import { Assignee } from "@/types";
import { axiosApi } from "./axios";

type AddAssigneesProps = {
  access: string;
  assignees: Pick<Assignee, "member" | "ticket">[];
  ticketId: string;
};

export const addAssignees = async ({
  access,
  assignees,
  ticketId,
}: AddAssigneesProps) => {
  try {
    const { data } = await axiosApi.post<Assignee[]>(
      `assignees/ticket/${ticketId}/`,
      assignees,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Add assignees error: ", error);
    return null;
  }
};
