import c from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return <div className={c.content}>
        <ProfileInfo/>
        <MyPostsContainer store={props.store}
        />
    </div>
}

export default Profile