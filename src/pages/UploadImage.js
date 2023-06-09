import React, {useState} from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2';
import { serverBase } from '../util/serverApi';

const UploadImage = () => {
  const [dataImage, setDataImage] = useState({
    name: "",
    path: ""
  });
  const [firebaseStatus, setFirebaseStatus] = useState(true);
  const [firebaseErrMsg, setFirebaseErrMsg] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setDataImage(curr => {
      return { ...curr, [e.target.id]: e.target.value};
    })
  }

  function handleUpload(e) {
    const fileName = e.target.files[0].name;
    const storageRef = ref(storage, `${fileName}`);

    uploadBytes(storageRef, e.target.files[0])
    .then(snapshot => {
      console.log("Successfully uploaded."); 
      return getDownloadURL(storageRef)
    })
    .then(downloadUrl => {
      console.log(downloadUrl);
      setDataImage(curr => {
        return { ...curr, path: downloadUrl }
      });
    })
    .catch(err => {
      setFirebaseStatus(false);
      setFirebaseErrMsg(err);
      console.log(err);
    })
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    
    serverBase.post(`image/${localStorage.getItem('id')}`, {
      image_name: dataImage.name,
      image: dataImage.path
    }, localStorage.getItem('token'))
    .then(status => {
      console.log(status);
      if (status === 201) {
        console.log("Upload Image Success.");
        Swal.fire(
          'Submitted!',
          'Your image has been submitted.',
          'success'
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
      }
      setDataImage({
        name: "",
        path: ""
      });
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
      console.log(err);
    })
  }

  return (
    <div className='container mx-auto pt-4 pb-10 my-5 bg-white opacity-80 rounded-xl'>
      <div className="mx-auto max-w-screen-md py-5 px-20">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px">
            <div className="mt-5">
            <label htmlFor="name">
              Alt Image
            </label>
            <input
              onChange={handleChange}
              value={dataImage.name}
              id="name"
              name="name"
              type="text"
              className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
              placeholder="TV Cabinet"
            />
            </div>
            <div className="mb-10">
              <label htmlFor="imageId" className="">
                Upload Image
              </label>
              <input
                onChange={handleUpload}
                id="path"
                name="path"
                type="file"
                className="my-2 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-black focus:z-10 sm:text-sm"
                accept='image/*'
                placeholder=""
              />
            </div>
            <button
              type="submit"
              className="submitButton group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadImage;
