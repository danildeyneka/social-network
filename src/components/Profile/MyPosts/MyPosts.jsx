import c from './MyPosts.module.scss'
import Post from './Post/Post'
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addNewPostActionCreator, writeNewPostActionCreator} from "../../../redux/profileReducer";

const MyPosts = () => {
    const dispatch = useDispatch()
    const profilePage = useSelector(s => s.profilePage)
    const newPost = React.createRef();

    const onPostChange = (e) => {
        let text = e.target.value
        dispatch(writeNewPostActionCreator(text))
    }

    const addPost = () => {
        dispatch(addNewPostActionCreator())
    }

    const postElements = profilePage.postData.map(post => <Post message={post.message} id={post.id}/>)

    return (<div className={c.posts__wrapper}>
        <h3>My posts</h3>
        <div>
            <div>
                <textarea ref={newPost}
                          value={profilePage.newPost}
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