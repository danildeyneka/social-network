import c from './ProfileInfo.module.scss'
import Preloader from "../../common/Preloader/Preloader";
import avatar from '../../../assets/images/avatar.png'
import ProfileStatus from "./ProfileStatus";
import {useSelector} from "react-redux";

const ProfileInfo = (props) => {
    const profile = useSelector(s => s.profilePage.profile)

    if (!profile) {
        return <Preloader/>
    }

    return <div>
        <div className={c.description}>
            <img className={c.img} src={profile.photos.large ? profile.photos.large : avatar} alt="avatar"/>
            <div>{profile.fullName}</div>
            <ProfileStatus match={props.match}/>
        </div>
    </div>
}

export default ProfileInfo