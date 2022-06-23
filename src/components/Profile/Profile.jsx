import c from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import {useEffect} from "react";
import {setUserProfile} from "../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {useMatch} from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector(s=>s.profilePage.profile)
    let match = useMatch('/profile/:userId')

    useEffect(() => {
        dispatch(setUserProfile(match))
    }, [match])

    return <div className={c.content}>
        <ProfileInfo profile={profile}/>
        <MyPosts/>
    </div>
}

export default Profile