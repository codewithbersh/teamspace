import { Comment } from "@/types";
import { axiosApi } from "./axios";

type NewCommentType = Pick<Comment, "member" | "description" | "ticket">;

type AddCommentProps = {
  access: string;
  comment: NewCommentType;
};

export const addComment = async ({ access, comment }: AddCommentProps) => {
  try {
    const { data } = await axiosApi.post<Comment>(
      "comments/",
      { ...comment },
      { headers: { Authorization: `Bearer ${access}` } }
    );
    return data;
  } catch (error) {
    console.log("Add comment error: ", error);
    return null;
  }
};

type GetTicketCommentsProps = {
  access: string;
  ticketId: string;
};

export const getTicketComments = async ({
  access,
  ticketId,
}: GetTicketCommentsProps) => {
  try {
    const { data } = await axiosApi.get<Comment[]>(
      `tickets/${ticketId}/comments/`,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Get ticket comments error: ", error);
    return null;
  }
};

type UpdateCommentProps = {
  access: string;
  commentId: string;
  comment: {
    has_been_deleted?: boolean;
    has_been_edited?: boolean;
    description?: string;
  };
};

export const updateComment = async ({
  access,
  commentId,
  comment,
}: UpdateCommentProps) => {
  try {
    const { data } = await axiosApi.patch<Comment>(
      `comments/${commentId}/`,
      {
        ...comment,
      },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Update comment error: ", error);
    return null;
  }
};

type DeleteCommentProps = {
  access: string;
  commentId: string;
};

export const deleteComment = async ({
  access,
  commentId,
}: DeleteCommentProps) => {
  try {
    const { status } = await axiosApi.delete(`comments/${commentId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (status === 204) {
      return status;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Delete comment error: ", error);
    return null;
  }
};
