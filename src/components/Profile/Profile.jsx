import c from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return <div className={c.content}>
        <ProfileInfo/>
        <MyPosts/>
    </div>
}

export default Profile