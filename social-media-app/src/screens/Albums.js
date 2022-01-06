import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlbums } from '../store/actions';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';

export default function Albums() {
    const albumsData = useSelector(state => state.albumReducer.albums);

    const dispatch = useDispatch();

    const location = useLocation();

    const userId = +location.pathname.split('/')[2];

    const navigate = useNavigate();


    useEffect(() => {
        dispatch(setAlbums(userId));
    }, []);

    const handleClickSeePhotos = (albumId) => {
        navigate(`/users/${ userId }/albums/${ albumId }/photos`);
    };

    return (
        <div>
            <p onClick={ () => navigate(`/users`) } className="card-subtitle mb-4 mt-2 text-muted clickable">Go to previous page</p>
            {
                albumsData?.data?.map(album => (
                    <div className="card user-card" key={ album.id }>
                        <div className="card-body">
                            <h5 className="card-title mb-3">Album Title : { album.title }</h5>
                            <h6 onClick={ () => handleClickSeePhotos(album.id) } className="card-subtitle mb-2 text-muted clickable">See Photos</h6>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
