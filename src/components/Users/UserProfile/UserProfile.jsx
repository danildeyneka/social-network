import c from "../Users.module.scss";
import {NavLink} from "react-router-dom";
import initialPhoto from "../../../assets/images/avatar.png";
import {follow, unfollow} from "../../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import React from "react";

const UserProfile = () => {
    const usersPage = useSelector(s => s.usersPage)
    const dispatch = useDispatch()

    return (
        <div className={c.user}>
            {usersPage.usersData.map(u => <div key={u.id}>
                <NavLink to={`/profile/${u.id}`}>
                    <img className={c.user__avatar}
                         src={u.photos.small !== null ? u.photos.small : initialPhoto}
                         alt='img'/>
                </NavLink>
                <div>
                    {u.followed
                        ? <button disabled={usersPage.followingInProgress.includes(u.id)}
                                  onClick={() => {
                                      dispatch(unfollow(u.id))
                                  }}>Unfollow</button>
                        : <button disabled={usersPage.followingInProgress.includes(u.id)}
                                  onClick={() => {
                                      dispatch(follow(u.id))
                                  }}>Follow</button>}
                </div>
                <div className={c.user__info}>
                    <div className={c.user__name}>{u.name}</div>
                    <div className={c.user__status}>{u.status}</div>
                    <div className={c.user__location}>
                        <p className={c.user__country}>{'u.location.country'}</p>
                        <p className={c.user__city}>{'u.location.city'}</p>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default UserProfile