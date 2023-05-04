import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import UpdateOrder from './pages/UpdateOrder';
import Product from './pages/Product';
import Image from './pages/Image';
import UpdateProduct from './pages/UpdateProduct';
import AddProduct from './pages/AddProduct';
import UploadImage from './pages/UploadImage';
import DeleteImage from './pages/DeleteImage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/product' element={
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        }>
          <Route path='add' element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }/>
          <Route path='update' element={
            <PrivateRoute>
              <UpdateProduct />
            </PrivateRoute>
          }/>
        </Route>
        <Route path='/image' element={
          <PrivateRoute>
            <Image />
          </PrivateRoute>
        }>
          <Route path='upload' element={
            <PrivateRoute>
              <UploadImage />
            </PrivateRoute>
          }/>
          <Route path='delete' element={
            <PrivateRoute>
              <DeleteImage />
            </PrivateRoute>
          }/>
        </Route>
        <Route path='/order' element={
          <PrivateRoute>
            <UpdateOrder />
          </PrivateRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;
