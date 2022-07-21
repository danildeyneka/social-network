import c from './ProfileInfo.module.scss'
import Preloader from "../../common/Preloader/Preloader";
import avatar from '../../../assets/images/avatar.png'
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import {useSelector} from "react-redux";
import ProfileData, {EditProfileData} from "./ProfileData/ProfileData";
import {FC, useState} from "react";
import {selectUserProfile} from "../../../redux/profileSelectors";

type PropsType = {
    notMyPage: object | null // ????????????
}
const ProfileInfo: FC<PropsType> = (props) => {

    const profile = useSelector(selectUserProfile)

    const [isEditMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    return <div>

        <div className={c.description}>
            <img className={c.img} src={profile?.photos?.large
                ? profile.photos.large
                : avatar} alt="avatar"/>
            <ProfileStatus notMyPage={props.notMyPage}/>

            {isEditMode
                ? <EditProfileData notMyPage={props.notMyPage} setEditMode={setEditMode} isEditMode={isEditMode}/>
                : <ProfileData notMyPage={props.notMyPage} setEditMode={setEditMode} isEditMode={isEditMode}/>}
        </div>
    </div>
}

export default ProfileInfo