import c from "../Users.module.scss";
import {NavLink} from "react-router-dom";
import initialPhoto from "../../../assets/images/avatar.png";
import {follow, unfollow} from "../../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {FC} from "react";
import {selectFollowingInProgress, selectUsersData} from "../../../redux/selectors/usersSelectors";

const UserProfile: FC = () => {
    const usersData = useSelector(selectUsersData)
    const followingInProgress = useSelector(selectFollowingInProgress)
    const dispatch = useDispatch()

    return (
        <div className={c.user}>
            {usersData.map(u => <div key={u.id}>
                <NavLink to={`/profile/${u.id}`}>
                    <img className={c.user__avatar}
                         src={u.photos.small !== null ? u.photos.small : initialPhoto}
                         alt='img'/>
                </NavLink>
                <div>
                    {u.followed
                        ? <button disabled={followingInProgress.includes(u.id)}
                                  onClick={() => {
                                      // @ts-ignore
                                      dispatch(unfollow(u.id))
                                  }}>Unfollow</button>
                        : <button disabled={followingInProgress.includes(u.id)}
                                  onClick={() => {
                                      // @ts-ignore
                                      dispatch(follow(u.id))
                                  }}>Follow</button>}
                </div>
                <div className={c.user__info}>
                    <div className={c.user__name}>{u.name}</div>
                    <div className={c.user__status}>{u.status}</div>
                </div>
            </div>)}
        </div>
    )
}

export default UserProfile