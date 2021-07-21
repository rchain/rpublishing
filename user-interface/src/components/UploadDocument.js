import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadDocument = () => {
  
    const [ state, setState] = useState('');
   
  const checkMimeType=(event)=>{
    //getting file object
    let files = event.target.files 
    //define message container
    let err = []
    // list allow mime type
   const types = ['image/png', 'image/jpeg', 'image/gif']
    // loop access array
    for(var x = 0; x<files.length; x++) {
     // compare file type find doesn't matach
         if (types.every(type => files[x].type !== type)) {
         // create error message and assign to container   
         err[x] = files[x].type+' is not a supported format\n';
       }
     };
     for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
         // discard selected file
        toast.error(err[z])
        event.target.value = null
    }
   return true;
  }
  const maxSelectFile=(event)=>{
    let files = event.target.files
        if (files.length > 3) { 
           const msg = 'Only 3 images can be uploaded at a time'
           event.target.value = null
           toast.warn(msg)
           return false;
      }
    return true;
 }
 const checkFileSize=(event)=>{
  let files = event.target.files
  let size = 2000000 
  let err = []; 
  for(var x = 0; x<files.length; x++) {
  if (files[x].size > size) {
   err[x] = files[x].type+'is too large, please pick a smaller file\n';
 }
};
for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
  // discard selected file
 toast.error(err[z])
 event.target.value = null
}
return true;
}
const onChangeHandler=event=>{
  var files = event.target.files
  if(maxSelectFile(event) && checkMimeType(event) && checkFileSize(event)){ 
  // if return true allow to setState
     setState({
     selectedFile: files,
     loaded:0
  })
}
}

const handleSubmit = (event) => {
    alert('Image Upload Successful, Kindly wait for the Image to be attested');
    event.preventDefault();
  }

const onClickHandler = () => {
    const data = new FormData() 
    for(var x = 0; x<state.selectedFile.length; x++) {
      data.append('file', state.selectedFile[x])
    }
}
    return (
    <form onSubmit={handleSubmit}>
      <div className="container">
	      <div className="row">
      	  <div className="offset-md-3 col-md-6">
               <div className="form-group files color">
                <label>Upload Image </label>
                <input type="file" className="form-control" multiple onChange={onChangeHandler}/>
              </div>  
              <div className="form-group">
              <ToastContainer />
        
              </div> 
              
              <button type="submit" className="btn btn-success btn-block">Upload</button>

	      </div>
      </div>
      </div>
      </form>
    );
}


export default UploadDocument;