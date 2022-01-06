import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../store/actions';
import { useNavigate } from 'react-router';

export default function Users() {
    const usersData = useSelector(state => state.userReducer.users);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setUsers());
    }, []);

    const handleClickAlbumsAndPosts = (type, id) => {
        if (type === 'posts' && id) {
            navigate(`/users/${ id }/posts`);
        } else if (type === 'albums' && id) {
            navigate(`/users/${ id }/albums`);
        }
    };

    const renderUserCard = () => {
        if (usersData && usersData?.data) {
            return usersData.data.map(user => {
                return (
                    <div className="card user-card" key={ user.id }>
                        <div className="card-body">
                            <h5 className="card-title">{ user.name }</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{ user.username }</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{ user.email }</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{ user.phone }</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{ user.website }</h6>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Company :</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{ user.company.name }</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{ user.company.catchPhrase }</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{ user.company.bs }</h6>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Address :</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{ user.address.street }</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{ user.address.suite }</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{ user.address.city }</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{ user.address.zipcode }</h6>
                        </div>
                        <div>
                            <span onClick={ () => handleClickAlbumsAndPosts('posts', user.id) } className="card-subtitle mb-2 text-muted clickable me-4">See Posts</span>
                            <span onClick={ () => handleClickAlbumsAndPosts('albums', user.id) } className="card-subtitle mb-2 text-muted clickable">See Albums</span>
                        </div>
                    </div>
                );
            });
        }
        return;
    };

    return (
        <div>
            { renderUserCard() }
        </div>
    );
}
