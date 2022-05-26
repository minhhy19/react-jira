import React from 'react'
import { useSelector } from 'react-redux';
import CommentItem from '../CommentItem/CommentItem';

export default function CommentList() {
    const { taskDetailModal } = useSelector(state => state.TaskReducer);

    const renderComment = () => {
        const { lstComment } = taskDetailModal;
        return lstComment?.map((comment) => {
            return <CommentItem key={comment.id} comment={comment} />
        })
    }

    return (
        <>
            {renderComment()}
        </>
    )
}
