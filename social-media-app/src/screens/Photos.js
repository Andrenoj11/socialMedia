import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPhotos, setSpecificAlbum } from '../store/actions';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';

export default function Photos() {
    const specificAlbumData = useSelector(state => state.albumReducer.specificAlbum);
    const photosData = useSelector(state => state.albumReducer.photos);

    const dispatch = useDispatch();

    const location = useLocation();

    const userId = +location.pathname.split('/')[2];
    const albumId = +location.pathname.split('/')[4];

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setSpecificAlbum(albumId));
        dispatch(setPhotos(albumId));
    }, []);

    const handleClickSeePhotoDetail = (photoId) => {
        navigate(`/users/${ userId }/albums/${ albumId }/photos/${ photoId }`);
    };

    return (
        <div>
            <p onClick={ () => navigate(`/users/${ userId }/albums`) } className="card-subtitle mb-4 mt-2 text-muted clickable">Go to previous page</p>

            <div className="card user-card">
                <div className="card-body">
                    <h5 className="card-title mb-3">Album Title : { specificAlbumData.title }</h5>
                </div>
            </div>
            {
                photosData?.data?.map(photo => (
                    <div className="card user-card" key={ photo.id }>
                        <div className="card-body">
                            <h5 className="card-title mb-3">Title : { photo.title }</h5>
                            <img src={ `${ photo.thumbnailUrl }` } width='150' height='150' alt={ `photos-${ [photo.id] }` } />
                            <h6 onClick={ () => handleClickSeePhotoDetail(photo.id) } className="card-subtitle mb-2 mt-2 text-muted clickable">See Photo Details</h6>

                        </div>
                    </div>
                ))
            }
        </div>
    );
}
