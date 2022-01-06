import { ActionTypes } from "../constants/actionTypes";
import axios from 'axios';


export const setUsers = () => {
    return (dispatch, getState) => {
        axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users',
        })
            .then(res => {
                dispatch({
                    type: ActionTypes.SET_USERS,
                    payload: res
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};


export const setCurrentUserName = (userId) => {
    return (dispatch, getState) => {
        axios({
            method: 'get',
            url: `https://jsonplaceholder.typicode.com/users/${ userId }`,
        })
            .then(res => {
                dispatch({
                    type: ActionTypes.SET_CURRENT_USER_NAME,
                    payload: res.data.name
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};

export const setPosts = (userId) => {
    return (dispatch, getState) => {
        axios({
            method: 'get',
            url: `https://jsonplaceholder.typicode.com/users/${ userId }/posts`,
        })
            .then(res => {
                dispatch({
                    type: ActionTypes.SET_POSTS,
                    payload: res
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};

export const setSpecificPost = (postId) => {
    return (dispatch, getState) => {
        axios({
            method: 'get',
            url: `https://jsonplaceholder.typicode.com/posts/${ postId }`,
        })
            .then(res => {
                dispatch({
                    type: ActionTypes.SET_SPECIFIC_POST,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};

export const setAlbums = (userId) => {
    return (dispatch, getState) => {
        axios({
            method: 'get',
            url: `https://jsonplaceholder.typicode.com/users/${ userId }/albums`,
        })
            .then(res => {
                dispatch({
                    type: ActionTypes.SET_ALBUMS,
                    payload: res
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};

export const setSpecificAlbum = (albumId) => {
    return (dispatch, getState) => {
        axios({
            method: 'get',
            url: `https://jsonplaceholder.typicode.com/albums/${ albumId }`,
        })
            .then(res => {
                dispatch({
                    type: ActionTypes.SET_SPECIFIC_ALBUM,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};

export const setPhotos = (albumId) => {
    return (dispatch, getState) => {
        axios({
            method: 'get',
            url: `https://jsonplaceholder.typicode.com/albums/${ albumId }/photos`,
        })
            .then(res => {
                dispatch({
                    type: ActionTypes.SET_PHOTOS,
                    payload: res
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};

export const setSpecificPhoto = (photoId) => {
    return (dispatch, getState) => {
        axios({
            method: 'get',
            url: `https://jsonplaceholder.typicode.com/photos/${ photoId }`,
        })
            .then(res => {
                dispatch({
                    type: ActionTypes.SET_SPECIFIC_PHOTO,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};

export const setComments = (postId) => {
    return (dispatch, getState) => {
        axios({
            method: 'get',
            url: `https://jsonplaceholder.typicode.com/posts/${ postId }/comments`,
        })
            .then(res => {
                dispatch({
                    type: ActionTypes.SET_COMMENTS,
                    payload: res
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};

export const deletePost = (userId, postId, postsData) => {
    return (dispatch, getState) => {
        const updatePosts = postsData.data.filter(post => post.id !== postId);
        axios({
            method: 'delete',
            url: `https://jsonplaceholder.typicode.com/posts/${ postId }`,
        })
            .then(res => {
                dispatch({
                    type: ActionTypes.DELETE_POST,
                    payload: { data: updatePosts }
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};

export const addPost = (userId, newPost, postsData) => {
    return (dispatch, getState) => {
        axios({
            method: 'post',
            url: `https://jsonplaceholder.typicode.com/posts`,
            data: {
                title: newPost.title,
                body: newPost.body,
                userId
            }
        })
            .then(res => {
                const updateData = [res.data, ...postsData];
                dispatch({
                    type: ActionTypes.ADD_POST,
                    payload: { data: updateData }
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};

export const editPost = (userId, postId, newPost, postsData) => {
    return (dispatch, getState) => {
        axios({
            method: 'put',
            url: `https://jsonplaceholder.typicode.com/posts/${ postId }`,
            data: {
                id: postId,
                title: newPost.title,
                body: newPost.body,
                userId
            }
        })
            .then(res => {
                const updateData = postsData.map(post => post.id === postId ? res.data : post);
                dispatch({
                    type: ActionTypes.EDIT_POST,
                    payload: { data: updateData }
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};

export const deleteComment = (commentId, commentsData) => {
    return (dispatch, getState) => {
        const updateComment = commentsData.data.filter(comment => comment.id !== commentId);
        axios({
            method: 'delete',
            url: `https://jsonplaceholder.typicode.com/comments/${ commentId }`,
        })
            .then(res => {
                dispatch({
                    type: ActionTypes.DELETE_COMMENT,
                    payload: { data: updateComment }
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};

export const addComment = (userId, newComment, commendsData) => {
    return (dispatch, getState) => {
        axios({
            method: 'post',
            url: `https://jsonplaceholder.typicode.com/comments`,
            data: {
                email: newComment.email,
                name: newComment.name,
                body: newComment.body,
                userId
            }
        })
            .then(res => {
                const updateData = [res.data, ...commendsData];
                dispatch({
                    type: ActionTypes.ADD_COMMENT,
                    payload: { data: updateData }
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};

export const editComment = (userId, commentId, newComment, commentsData) => {
    return (dispatch, getState) => {
        axios({
            method: 'put',
            url: `https://jsonplaceholder.typicode.com/comments/${ commentId }`,
            data: {
                id: commentId,
                email: newComment.email,
                name: newComment.name,
                body: newComment.body,
                userId
            }
        })
            .then(res => {
                const updateData = commentsData.map(comment => comment.id === commentId ? res.data : comment);
                dispatch({
                    type: ActionTypes.EDIT_COMMENT,
                    payload: { data: updateData }
                });
            })
            .catch(err => {
                console.log(err, '[Error Message]');
            });
    };
};