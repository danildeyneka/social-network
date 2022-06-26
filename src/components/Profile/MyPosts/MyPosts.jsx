import c from './MyPosts.module.scss'
import Post from './Post/Post'
// import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPost, writePost} from "../../../redux/profileReducer";

const MyPosts = () => {
    const dispatch = useDispatch()
    const profilePage = useSelector(s => s.profilePage)
    // const newPost = useRef();
    const postElements = profilePage.postData.map(post => <Post message={post.message} id={post.id} key={post.id}/>)

    return (<div className={c.posts__wrapper}>
        <h3>My posts</h3>
        <div>
            <div>
                <textarea value={profilePage.newPost}
                          onChange={(e) => dispatch(writePost(e.target.value))}/>
            </div>
            <div>
                <button onClick={() => dispatch(addPost())}>Add post</button>
            </div>
        </div>
        <div className={c.post}>
            {postElements}
        </div>
    </div>)
}

export default MyPosts