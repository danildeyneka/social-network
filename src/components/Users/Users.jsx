import c from './Users.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setUsersAC, toggleFollowAC} from "../../redux/usersReducer";

const Users = () => {
    const dispatch = useDispatch()
    const usersData = useSelector(s => s.usersPage.usersData)

    const setUsers = (users) => {
        dispatch(setUsersAC(users))
    }
    const toggleFollow = (userId) => {
        dispatch(toggleFollowAC(userId))
    }

    if (usersData.length === 0) {
        setUsers([
            {id: 1, name: 'Dmitriy', photo: 'https://images.unsplash.com/photo-1599850929872-2dec3cbafd7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
                status: 'unique status', location: {city: 'Minsk', country: 'Belarus'}, following: false},
            {id: 2, name: 'Eugene', photo: 'https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
                status: 'unique status 2', location: {city: 'Warsaw', country: 'Poland'}, following: true},
            {id: 3, name: 'Sasha', photo: 'https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906&q=80',
                status: 'unique status 3', location: {city: 'Moscow', country: 'Russia'}, following: false}
        ])
    }

    return (
        <div className={c.user}>
            {
                usersData.map(user => <div key={user.id}>
                    <div>
                        <img className={c.user__avatar} src={user.photo}/>
                        <button onClick={() => toggleFollow(user.id)}>{user.following ? 'Unfollow' : 'Follow'}</button>
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