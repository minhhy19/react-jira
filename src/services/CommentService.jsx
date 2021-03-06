import { baseService } from "./baseService";

export class CommentService extends baseService {
    constructor() {
        super();
    }

    insertComment = (newComment) => {
        return this.post(`comment/insertComment`, newComment);
    }

    deleteComment = (commentId) => {
        return this.delete(`comment/deleteComment?idComment=${commentId}`);
    }

    updateComment = (editComment) => {
        return this.put(`comment/updateComment`, editComment);
    }
}

export const commentService = new CommentService();