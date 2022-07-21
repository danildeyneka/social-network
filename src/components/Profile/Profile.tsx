import c from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import React, {useEffect} from "react";
import {setUserProfile} from "../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {useMatch} from "react-router-dom";
import withRedirect from "../../hoc/withRedirect";
import {getMyId} from "../../redux/authSelectors";

const Profile: React.FC = () => {
    const dispatch = useDispatch()
    const match = useMatch('/profile/:userId')
    const myId = useSelector(getMyId)

    useEffect(() => {
        // @ts-ignore
        dispatch(setUserProfile(match, myId))
    }, [match])

    return <div className={c.content}>
        <ProfileInfo notMyPage={match}/>
        {/* ??????????*/}
        <MyPosts/>
    </div>
}

const ProfileWithRedirect = withRedirect(Profile)

export default ProfileWithRedirect