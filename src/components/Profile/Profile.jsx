import c from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import {useEffect} from "react";
import {setUserProfile} from "../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {useMatch} from "react-router-dom";
import withRedirect from "../../hoc/withRedirect";

const Profile = () => {
    const dispatch = useDispatch()
    const match = useMatch('/profile/:userId')
    const myId = useSelector(s=>s.auth.id)

    useEffect(() => {
        dispatch(setUserProfile(match, myId))
    }, [match])

    return <div className={c.content}>
        <ProfileInfo match={match}/>
        <MyPosts/>
    </div>
}

const ProfileWithRedirect = withRedirect(Profile)

export default ProfileWithRedirect