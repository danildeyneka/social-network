import c from './MyPosts.module.scss'
import Post from './Post/Post'
import NewPostForm from "./NewPostForm";
import React, {FC} from 'react'
import {useAppSelector} from "../../../hooks/hooks";
import {selectPostData} from "../../../redux/profileSelectors";

const MyPosts: FC = React.memo(() => {
    const postData = useAppSelector(selectPostData)
    const postElements =
        [...postData] // immutability - работать надо всегда с копией, не меняя истину
            .reverse() // либо вызвать реверс после мапа, тк он делает новый массив
            .map(post => <Post message={post.message} id={post.id} key={post.id}/>)

    return (<div className={c.posts__wrapper}>
        <h3>My posts</h3>
        <div>
            <NewPostForm/>
        </div>
        <div className={c.post}>
            {postElements}
        </div>
    </div>)
})

export default MyPosts