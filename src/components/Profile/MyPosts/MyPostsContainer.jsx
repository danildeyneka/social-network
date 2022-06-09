import MyPosts from "./MyPosts";
import {addNewPostActionCreator, writeNewPostActionCreator} from "../../../redux/profileReducer";

const MyPostsContainer = (props) => {
    const state = props.store.getState().profilePage

    const onPostChange = (text) => {
        props.store.dispatch(writeNewPostActionCreator(text))
    }

    const addPost = () => {
        props.store.dispatch(addNewPostActionCreator())
    }

    return (
        <MyPosts
            writeNewPost={onPostChange}
            addNewPost={addPost}
            postData={state.postData}
            newPost={state.newPost}
        />
    )
}

export default MyPostsContainer