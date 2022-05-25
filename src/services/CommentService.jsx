import { baseService } from "./baseService";

export class CommentService extends baseService {
    constructor() {
        super();
    }

    insertComment = (newComment) => {
        return this.post(`comment/insertComment`, newComment);
    }
}

export const commentService = new CommentService();