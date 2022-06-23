import c from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import {useEffect} from "react";
import {setUserProfile} from "../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {useMatch, useNavigate} from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector(s=>s.profilePage.profile)
    let match = useMatch('/profile/:userId')

    useEffect(() => {
        dispatch(setUserProfile(match))
    }, [match])

    const isAuth = useSelector(s=>s.auth.isAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            return navigate('/login')
        }
    }, [isAuth])

    return <div className={c.content}>
        <ProfileInfo profile={profile}/>
        <MyPosts/>
    </div>
}

export default Profile