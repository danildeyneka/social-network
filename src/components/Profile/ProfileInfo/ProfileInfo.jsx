import c from './ProfileInfo.module.scss'

const ProfileInfo = () => {
    return <div>
        <div>
            <img alt="" src='https://www.ukinbound.org/wp-content/uploads/2019/08/Northumberland-National-Park-875x350.jpg'></img>
        </div>
        <div className={c.description}>
            desc
        </div>
    </div>
}

export default ProfileInfo