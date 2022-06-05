import c from './MyPosts.module.scss'
import Post from './Post/Post'
import React from "react";
import {addPostActionCreator, updateNewPostActionCreator} from "../../../redux/state";

const MyPosts = (props) => {

    const postElements = props.postData.map(post => <Post message={post.message} id={post.id}/>)

    const newPost = React.createRef();

    const addPost = () => {
        props.dispatch(addPostActionCreator())
    }

    const onPostChange = () => {
        let text = newPost.current.value
        props.dispatch(updateNewPostActionCreator(text))
    }

    return (<div className={c.posts__wrapper}>
        <h3>My posts</h3>
        <div>
            <div>
                <textarea ref={newPost}
                          value={props.newPost}
                          onChange={onPostChange}/>
            </div>
            <div>
                <button onClick={addPost}>Add post</button>
            </div>
        </div>
        <div className={c.post}>
            {postElements}
        </div>
    </div>)
}

export default MyPosts