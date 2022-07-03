import c from './MyPosts.module.scss'
import Post from './Post/Post'
import {useSelector} from "react-redux";
import NewPostForm from "./NewPostForm";

const MyPosts = () => {
    const postData = useSelector(s => s.profilePage.postData)
    const postElements = postData.map(post => <Post message={post.message} id={post.id} key={post.id}/>)

    return (<div className={c.posts__wrapper}>
        <h3>My posts</h3>
        <div>
            <NewPostForm/>
        </div>
        <div className={c.post}>
            {postElements}
        </div>
    </div>)
}

export default MyPosts