import './AddPost.css';

import { useState } from "react";

import axios from "axios";

const AddPost = (props) => {
  const [postContent, setPostContent] = useState("");

  // console.log(postContent);

  const addPost = (e) => {
    e.preventDefault();
 
    if(!postContent) {
      return
    };

    axios
      .post(
        "https://akademia108.pl/api/social-app/post/add",
        {
          content: postContent,
        }
      )
      .then((req) => {

        // console.log('jestem');
        let reqData = req.data;
        // console.log(reqData)
        props.getPrevPosts();
        setPostContent('');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  return (
    <form onSubmit={addPost} className='addPostForm'>
      <textarea placeholder="Add post..." onChange={(e)=>setPostContent(e.target.value)} value={postContent}></textarea>
      <button className="btn">Add</button>
    </form>
  );
};

export default AddPost;
