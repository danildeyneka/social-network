import c from './Users.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setUsersAC, toggleFollowAC} from "../../redux/usersReducer";

const Users = () => {
    const dispatch = useDispatch()
    const usersData = useSelector(s => s.usersPage.usersData)

    const setUsers = (users) => {
        dispatch(setUsersAC(users))
    }
    const follow = (userId) => {
        dispatch(toggleFollowAC(userId))
    }
    return (
        <div className={c.user}>
            {
                usersData.map(user => <div key={user.id}>
                    <div>
                        <img className={c.user__avatar} src={user.photo}/>
                        <button></button>
                    </div>
                    <div className={c.user__info}>
                        <div className={c.user__name}>{user.name}</div>
                        <div className={c.user__status}>{user.status}</div>
                        <div className={c.user__location}>
                            <p className={c.user__country}>{user.location.country}</p>
                            <p className={c.user__city}>{user.location.city}</p>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}
export default Users