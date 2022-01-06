import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './screens/Users';
import Landing from './screens/Landing';
import NavigationBar from './components/NavigationBar';
import Posts from './screens/Posts';
import Albums from './screens/Albums';
import Comments from './screens/Comments';
import Photos from './screens/Photos';
import Photo from './screens/Photo';

function App() {
    return (
        <div className="App" >
            <Router>
                <NavigationBar />
                <Routes>
                    <Route path='/' exact element={ <Landing /> } />
                    <Route path='/users' exact element={ <Users /> } />
                    <Route path='/users/:userId/posts' exact element={ <Posts /> } />
                    <Route path='/users/:userId/posts/:postId/comments' exact element={ <Comments /> } />
                    <Route path='/users/:userId/albums' exact element={ <Albums /> } />
                    <Route path='/users/:userId/albums/:albumId/photos' exact element={ <Photos /> } />
                    <Route path='/users/:userId/albums/:albumId/photos/:photoId' exact element={ <Photo /> } />
                </Routes>
            </Router>
        </div>
    );
}

export default App;