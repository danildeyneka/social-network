import c from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import {FC, useEffect} from "react";
import {setUserProfile} from "../../redux/profileReducer";
import {useMatch} from "react-router-dom";
import withRedirect from "../../hoc/withRedirect";
import {selectMyId} from "../../redux/authSelectors";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

const Profile: FC = () => {
    const dispatch = useAppDispatch()
    const match: any = useMatch('/profile/:userId')
    const myId = useAppSelector(selectMyId)

    useEffect(() => {
        dispatch(setUserProfile(match, myId))
    }, [match])

    return <div className={c.content}>
        <ProfileInfo notMyPage={match}/>
        <MyPosts/>
    </div>
}

const ProfileWithRedirect = withRedirect(Profile)

export default ProfileWithRedirect