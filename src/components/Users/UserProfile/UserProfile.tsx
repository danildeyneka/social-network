import c from "../Users.module.scss";
import {NavLink} from "react-router-dom";
import initialPhoto from "../../../assets/images/avatar.png";
import {follow, unfollow} from "../../../redux/usersReducer";
import {FC} from "react";
import {selectFollowingInProgress, selectUsersData} from "../../../redux/selectors/usersSelectors";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {Button} from 'antd'

const UserProfile: FC = () => {
    const usersData = useAppSelector(selectUsersData)
    const followingInProgress = useAppSelector(selectFollowingInProgress)
    const dispatch = useAppDispatch()

    return (
        <div className={c.user}>
            {usersData.map(u => <div key={u.id} className={c.user__wrapper}>
                <div className={c.user__name}>{u.name}</div>
                <NavLink to={`/profile/${u.id}`}>
                    <img className={c.user__avatar}
                         src={u.photos.small !== null ? u.photos.small : initialPhoto}
                         alt='img'/>
                </NavLink>
                <div  className={c.user__btn}>
                    {u.followed
                        ? <Button disabled={followingInProgress.includes(u.id)}
                                  onClick={() => {
                                      dispatch(unfollow(u.id))
                                  }}>Unfollow</Button>
                        : <Button disabled={followingInProgress.includes(u.id)}
                                  onClick={() => {
                                      dispatch(follow(u.id))
                                  }}>Follow</Button>}
                </div>
            </div>)}
        </div>
    )
}

export default UserProfile