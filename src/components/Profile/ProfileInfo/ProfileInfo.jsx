import c from './ProfileInfo.module.scss'
import Preloader from "../../common/Preloader/Preloader";
import avatar from '../../../assets/images/avatar.png'

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return <div>
        <div>
            <img alt="" src='https://www.ukinbound.org/wp-content/uploads/2019/08/Northumberland-National-Park-875x350.jpg'></img>
        </div>
        <div className={c.description}>
            <img className={c.img} src={props.profile.photos.large ? props.profile.photos.large : avatar} alt="avatar"/>
            <div>{props.profile.fullName}</div>
        </div>
    </div>
}

export default ProfileInfo