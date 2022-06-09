import c from './MyPosts.module.scss'
import Post from './Post/Post'
import React from "react";

const MyPosts = (props) => {
    const newPost = React.createRef();

    const onPostChange = (e) => {
        let text = e.target.value
        props.writeNewPost(text)
    }

    const addPost = () => {
        props.addNewPost()
    }

    const postElements = props.postData.map(post => <Post message={post.message} id={post.id}/>)

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