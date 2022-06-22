import c from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import {useEffect} from "react";
import axios from "axios";
import {setUserProfile} from "../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {useMatch} from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector(s=>s.profilePage.profile)
    let match = useMatch('/profile/:userId')

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${match ? match.params.userId : 24558}`)
            .then((response) => {
                dispatch(setUserProfile(response.data))
            })
    }, [match])

    return <div className={c.content}>
        <ProfileInfo profile={profile}/>
        <MyPosts/>
    </div>
}

export default Profile