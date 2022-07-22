import c from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import {FC, useEffect} from "react";
import {setUserProfile} from "../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {useMatch} from "react-router-dom";
import withRedirect from "../../hoc/withRedirect";
import {selectMyId} from "../../redux/authSelectors";

const Profile: FC = () => {
    const dispatch = useDispatch()
    const match = useMatch('/profile/:userId')
    const myId = useSelector(selectMyId)

    useEffect(() => {
        // @ts-ignore ============================ change
        dispatch(setUserProfile(match, myId))
    }, [match])

    return <div className={c.content}>
        <ProfileInfo notMyPage={match}/>
        <MyPosts/>
    </div>
}

const ProfileWithRedirect = withRedirect(Profile)

export default ProfileWithRedirect