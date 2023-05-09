import React, {useState, useEffect} from 'react';
import ImageCard from '../components/ImageCard';
import { serverBase } from '../util/serverApi';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../components/Pagination';

const DeleteImage = () => {
  const [images, setImages] = useState([]);
  const currentPage = useSelector(state => state.imagePage);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    serverBase.get(`images?page=${currentPage-1}&size=6`, localStorage.getItem('token'))
    .then(data => {
      setImages(data.content);
      // console.log(data.content);
      setTotalPages(data.totalPages);
      console.log(currentPage);
      dispatch({type: 'SET_PAGE_IMAGE', payload: currentPage});
    })
    .catch(error => {
      console.log(error);
    })

    // without pagination
    // serverBase.get('image/', localStorage.getItem('token'))
    // .then(data => {
    //   const filteredImages = data.filter(item => item.image_status !== 0);
    //   setImages(filteredImages);
    //   // console.log(filteredImages);
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }, [currentPage]);

  return (
    <div className='container mx-auto pt-4 pb-10 my-5 bg-white rounded-xl'>
      <div className='mx-12 flex justify-end text-xl'>
        <Pagination totalPages={totalPages} router='image' />
      </div>
      <div className="pt-5 px-2 flex flex-row flex-wrap justify-center">
        {images.map((image) => {
          return (
            <div key={image.image_id} className='my-3'>
              <ImageCard key={image.product_id} image={image} setImages={setImages} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeleteImage;
