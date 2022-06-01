import c from './Profile.module.scss'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return <div className={c.content}>
        <ProfileInfo/>
        <MyPosts postData={props.profilePage.postData} addPost={props.addPost}/>
    </div>
}

export default Profile
