import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { DELETE_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from '../../../../../redux/constants/Jira/CommentConstants';
import { Popconfirm } from 'antd';
import moment from 'moment';

export default function CommentItem(props) {
    const dispatch = useDispatch();
    const { comment } = props;
    const { taskDetailModal } = useSelector(state => state.TaskReducer);
    const [visibleTextareaEditComment, setVisibleTextareaEditComment] = useState(false);
    const formikEditComment = useFormik({
        enableReinitialize: true,
        initialValues: {
            contentComment: ''
        },
        onSubmit: async (values, { resetForm }) => {
            await dispatch({
                type: UPDATE_COMMENT_SAGA,
                editComment: {
                    ...values, 
                    id: comment.id
                },
                taskId: taskDetailModal.taskId
            })
            setVisibleTextareaEditComment(false);
        },
    });


    return (
        <div className="lastest-comment">
            <div className="comment-item">
                <div className="display-comment" style={{ display: 'flex' }}>
                    <div className="avatar">
                        <img src={comment.avatar} alt={comment.avatar} title={comment.name} />
                    </div>
                    <div className='comment-text'>
                        <p className='comment-text__name'>
                            {comment.name}
                            <span>{moment(comment?.createdAt).fromNow()}</span>
                        </p>
                        {visibleTextareaEditComment ?
                            <div className='comment-text__form'>
                                <form onSubmit={formikEditComment.handleSubmit} id="formEditComment" >
                                    <textarea type="text" value={formikEditComment.values.contentComment} name='contentComment' onChange={formikEditComment.handleChange} ></textarea>
                                </form>
                                <button type='submit' form="formEditComment" className="btn btn-primary mr-2" >Save</button>
                                <button className="btn btn-light m-2" onClick={() => {
                                    setVisibleTextareaEditComment(false);
                                }} >Close</button>
                            </div> :
                            <p className='comment-text__content'>
                                {comment.commentContent}
                            </p>
                        }
                        {visibleTextareaEditComment ? '' :
                            <div>
                                <button className='comment-text__btn-edit' onClick={() => {
                                    setVisibleTextareaEditComment(true);
                                    formikEditComment.setFieldValue('contentComment', comment.commentContent);
                                }}>Edit</button>
                                <Popconfirm
                                    title="Are you sure you want to delete this comment?"
                                    onConfirm={() => {
                                        dispatch({
                                            type: DELETE_COMMENT_SAGA,
                                            commentId: comment.id,
                                            taskId: taskDetailModal.taskId
                                        })
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <button className='comment-text__btn-del'>Delete</button>
                                </Popconfirm>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
