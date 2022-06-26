import c from './ProfileInfo.module.scss'
import Preloader from "../../common/Preloader/Preloader";
import avatar from '../../../assets/images/avatar.png'
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return <div>
        <div className={c.description}>
            <img className={c.img} src={props.profile.photos.large ? props.profile.photos.large : avatar} alt="avatar"/>
            <div>{props.profile.fullName}</div>
            <ProfileStatus match={props.match}/>
        </div>
    </div>
}

export default ProfileInfo