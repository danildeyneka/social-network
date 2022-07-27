import c from './ProfileInfo.module.scss'
import Preloader from "../../common/Preloader/Preloader";
import avatar from '../../../assets/images/avatar.png'
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileData, {EditProfileData} from "./ProfileData/ProfileData";
import {FC, useState} from "react";
import {selectUserProfile} from "../../../redux/selectors/profileSelectors";
import {useAppSelector} from "../../../hooks/hooks";

type PropsType = {
    notMyPage: object | null
}
const ProfileInfo: FC<PropsType> = (props) => {
    const profile = useAppSelector(selectUserProfile)
    const [isEditMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    return <div>

        <div className={c.description}>
            <img className={c.img} src={profile.photos.large ?? avatar} alt="avatar"/>
            <ProfileStatus notMyPage={props.notMyPage}/>

            {isEditMode
                ? <EditProfileData notMyPage={props.notMyPage} isEditMode={isEditMode} setEditMode={setEditMode}/>
                : <ProfileData notMyPage={props.notMyPage} isEditMode={isEditMode} setEditMode={setEditMode}/>}
        </div>
    </div>
}

export default ProfileInfo