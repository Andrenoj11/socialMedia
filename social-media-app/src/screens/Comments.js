import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { setComments, setSpecificPost, deleteComment, addComment, editComment } from '../store/actions';
import { useNavigate } from 'react-router';

export default function Comments() {
    const [showInputs, setShowInputs] = useState(false);
    const [commentInputs, setCommentInputs] = useState({
        email: '',
        name: '',
        body: ''
    });
    const [editCommentInputs, setEditCommentInputs] = useState({
        email: '',
        name: '',
        body: ''
    });
    const [idEditComment, setIdEditComment] = useState(0);

    const specificPostData = useSelector(state => state.postReducer.specificPost);
    const commentsData = useSelector(state => state.postReducer.comments);

    const dispatch = useDispatch();

    const location = useLocation();

    const navigate = useNavigate();

    const userId = +location.pathname.split('/')[2];
    const postId = +location.pathname.split('/')[4];

    useEffect(() => {
        dispatch(setSpecificPost(postId));
        dispatch(setComments(postId));
    }, []);

    const handleSubmitAddComment = e => {
        e.preventDefault();
        dispatch(addComment(userId, commentInputs, commentsData.data));
        setShowInputs(false);
    };

    const handlClickeDeleteComment = (commentId) => {
        dispatch(deleteComment(commentId, commentsData));
    };

    const handleEditComment = (comment) => {
        setIdEditComment(+comment.id);
        setEditCommentInputs({
            email: comment.email,
            name: comment.name,
            body: comment.body,
        });
    };

    const handleSubmitEditComment = (e, commentId) => {
        e.preventDefault();
        dispatch(editComment(userId, commentId, editCommentInputs, commentsData.data));
        setIdEditComment(0);
    };

    return (
        <div>
            <p onClick={ () => navigate(`/users/${ userId }/posts`) } className="card-subtitle mb-4 mt-2 text-muted clickable">Go to previous page</p>
            {
                <div className="card user-card">
                    POST
                    <div className="card-body">
                        <h5 className="card-title mb-3">Title : { specificPostData.title }</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Body : { specificPostData.body }</h6>
                    </div>
                </div>
            }
            <p className='clickable' onClick={ () => setShowInputs(true) }>Add Comment</p>
            {
                showInputs ?
                    <form onSubmit={ e => handleSubmitAddComment(e) }>
                        <div className="card user-card">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Title</span>
                                <input value={ commentInputs.email } onChange={ e => setCommentInputs({ ...commentInputs, email: e.target.value }) } type="text" className="form-control" placeholder="Input Email" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Title</span>
                                <input value={ commentInputs.name } onChange={ e => setCommentInputs({ ...commentInputs, name: e.target.value }) } type="text" className="form-control" placeholder="Input Name" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Body</span>
                                <textarea value={ commentInputs.body } onChange={ e => setCommentInputs({ ...commentInputs, body: e.target.value }) } className="form-control" aria-label="Input Body"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">Submit</button>
                        </div>
                    </form>
                    : null
            }
            {
                commentsData?.data?.map(comment => comment.id === idEditComment ?
                    <form onSubmit={ e => handleSubmitEditComment(e, comment.id) } key={ comment.id }>
                        <div className="card user-card">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Title</span>
                                <input value={ editCommentInputs.email } onChange={ e => setEditCommentInputs({ ...editCommentInputs, email: e.target.value }) } type="text" className="form-control" placeholder="Input Email" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Title</span>
                                <input value={ editCommentInputs.name } onChange={ e => setEditCommentInputs({ ...editCommentInputs, name: e.target.value }) } type="text" className="form-control" placeholder="Input Name" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Body</span>
                                <textarea value={ editCommentInputs.body } onChange={ e => setEditCommentInputs({ ...editCommentInputs, body: e.target.value }) } className="form-control" aria-label="Input Body"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                                <button type="button" onClick={ () => setIdEditComment(0) } className="btn btn-danger mt-3">Cancel</button>
                            </div>
                        </div>
                    </form>
                    :
                    (
                        <div className="card user-card" key={ comment.id }>
                            COMMENT
                            <div className="card-body">
                                <h5 className="card-title mb-3">Email : { comment.email }</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Name : { comment.name }</h6>
                                <h6 className="card-subtitle mb-2 text-muted">Body : { comment.body }</h6>
                                <h6 onClick={ () => handleEditComment(comment) } className="card-subtitle mb-2 text-muted clickable">Edit</h6>
                                <h6 onClick={ () => handlClickeDeleteComment(comment.id) } className="card-subtitle mb-2 text-muted clickable-red">Delete</h6>

                            </div>
                        </div>
                    ))
            }
        </div>
    );


}
