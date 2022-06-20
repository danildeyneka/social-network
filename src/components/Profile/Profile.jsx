import c from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import {useEffect} from "react";
import axios from "axios";
import {setUserProfileAC} from "../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {useMatch} from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector(s=>s.profilePage.profile)
    const setUserProfile = (profile) => {
        dispatch(setUserProfileAC(profile))
    }
    let match = useMatch('/profile/:userId')

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${match ? match.params.userId : 2}`)
            .then((response) => {
                setUserProfile(response.data)
            })
    }, [match])

    return <div className={c.content}>
        <ProfileInfo profile={profile}/>
        <MyPosts/>
    </div>
}

export default Profile