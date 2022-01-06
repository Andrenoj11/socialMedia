import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { setPosts, deletePost, addPost, editPost } from '../store/actions';
import { useNavigate } from 'react-router';

export default function Posts() {
    const [addPostInput, setAddPostInput] = useState({
        title: '',
        body: ''
    });
    const [editPostInput, setEditPostInput] = useState({
        title: '',
        body: ''
    });
    const [idEditPost, setIdEditPost] = useState(0);
    const [showInputs, setShowInputs] = useState(false);

    const postsData = useSelector(state => state.postReducer.posts);

    const dispatch = useDispatch();

    const location = useLocation();

    const navigate = useNavigate();

    const userId = +location.pathname.split('/')[2];

    useEffect(() => {
        dispatch(setPosts(userId));
    }, []);

    const handleClickDetails = (postId) => {
        navigate(`/users/${ userId }/posts/${ postId }/comments`);
    };

    const handleClickDeletePost = async (postId) => {
        dispatch(deletePost(userId, postId, postsData));
    };

    const handleSubmitAddPost = (e) => {
        e.preventDefault();
        dispatch(addPost(userId, addPostInput, postsData.data));
        setShowInputs(false);
    };
    const handleClickEdit = (post) => {
        setIdEditPost(+post.id);
        setEditPostInput({ title: post.title, body: post.body });
    };

    const handleSubmitEditPost = (e, postId) => {
        e.preventDefault();
        dispatch(editPost(userId, postId, editPostInput, postsData.data));
        setIdEditPost(0);
    };

    return (
        <div>
            <p className='clickable' onClick={ () => setShowInputs(true) }>Add Post</p>

            {
                showInputs ?
                    <form onSubmit={ e => handleSubmitAddPost(e) }>
                        <div className="card user-card">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Title</span>
                                <input value={ addPostInput.title } onChange={ e => setAddPostInput({ ...addPostInput, title: e.target.value }) } type="text" className="form-control" placeholder="Input Title" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Body</span>
                                <textarea value={ addPostInput.body } onChange={ e => setAddPostInput({ ...addPostInput, body: e.target.value }) } className="form-control" aria-label="Input Body"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">Submit</button>
                        </div>
                    </form>
                    : null
            }
            <p onClick={ () => navigate(`/users`) } className="card-subtitle mb-4 mt-2 text-muted clickable">Go to previous page</p>

            {
                postsData?.data?.map(post => post.id === idEditPost ?
                    (
                        <form onSubmit={ e => handleSubmitEditPost(e, post.id) } key={ post.id }>
                            <div className="card user-card">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">Title</span>
                                    <input value={ editPostInput.title } onChange={ e => setEditPostInput({ ...editPostInput, title: e.target.value }) } type="text" className="form-control" placeholder="Input Title" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Body</span>
                                    <textarea value={ editPostInput.body } onChange={ e => setEditPostInput({ ...editPostInput, body: e.target.value }) } className="form-control" aria-label="Input Body"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                                    <button type="button" onClick={ () => setIdEditPost(0) } className="btn btn-danger mt-3">Cancel</button>
                                </div>
                            </div>
                        </form>
                    )
                    : (
                        <div className="card user-card" key={ post.id }>
                            <div className="card-body">
                                <h5 className="card-title mb-3">Title : { post.title }</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Body : { post.body }</h6>
                                <h6 onClick={ () => handleClickDetails(post.id) } className="card-subtitle mb-2 text-muted clickable">See Details</h6>
                                <h6 onClick={ () => handleClickEdit(post) } className="card-subtitle mb-2 text-muted clickable">Edit</h6>
                                <h6 onClick={ () => handleClickDeletePost(post.id) } className="card-subtitle mb-2 text-muted clickable-red">Delete</h6>
                            </div>
                        </div>
                    ))
            }
        </div>
    );


}
