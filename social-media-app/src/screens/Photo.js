import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSpecificPhoto } from '../store/actions';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';

export default function Photo() {
    const specificPhotoData = useSelector(state => state.albumReducer.specificPhoto);

    const dispatch = useDispatch();

    const location = useLocation();

    const userId = +location.pathname.split('/')[2];
    const albumId = +location.pathname.split('/')[4];
    const photoId = +location.pathname.split('/')[6];

    const navigate = useNavigate();


    useEffect(() => {
        dispatch(setSpecificPhoto(photoId));
    }, []);

    return (
        <div>
            <div className="card user-card">
                <div className="card-body">
                    <h5 className="card-title mb-3">Photo Title : { specificPhotoData.title }</h5>
                    <img src={ `${ specificPhotoData.url }` } width='300' height='300' alt={ `photos-${ [specificPhotoData.id] }` } />
                    <h6 onClick={ () => navigate(`/users/${ userId }/albums/${ albumId }/photos`) } className="card-subtitle mb-2 mt-2 text-muted clickable">Back</h6>
                </div>
            </div>
        </div>
    );
}
