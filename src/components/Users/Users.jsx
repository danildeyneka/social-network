import c from './Users.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setTotalUsersCountAC, setCurrentPageAC, setUsersAC, toggleFollowAC} from "../../redux/usersReducer";
import axios from "axios";
import initialPhoto from '../../assets/images/avatar.png'
import {useEffect} from "react";

const Users = () => {
    const dispatch = useDispatch()
    const usersPage = useSelector(s => s.usersPage)
    const pagesCount = Math.ceil(usersPage.totalUsersCount / usersPage.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let currentPage = usersPage.currentPage
    let prevPage = currentPage + 5
    let nextPage = ((currentPage - 5) < 0) ? 0 : currentPage - 5
    let slicedPages = pages.slice(nextPage, prevPage)

    const setUsers = (users) => {
        dispatch(setUsersAC(users))
    }
    const toggleFollow = (userId) => {
        dispatch(toggleFollowAC(userId))
    }
    const setCurrentPage = (pageNumber) => {
        dispatch(setCurrentPageAC(pageNumber))
    }
    const setTotalUsersCount = (totalUsersCount) => {
        dispatch(setTotalUsersCountAC(totalUsersCount))
    }

    useEffect(() => {
        console.log('raz')
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${usersPage.currentPage}&count=${usersPage.pageSize}`)
            .then((response) => {
                setUsers(response.data.items)
                console.log(response.data)
                setTotalUsersCount(response.data.totalCount)
            })
    }, [])

    const onPageChanged = (pageNumber) => {
        setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${usersPage.pageSize}`)
            .then((response) => {
                setUsers(response.data.items)
            })
    }

    return (
        <div>
            <div className={c.pages}>
                {slicedPages.map(p => <span className={usersPage.currentPage === p ? c.selected : ''}
                                            onClick={() => onPageChanged(p)}>{p}</span>)}
            </div>
            <div className={c.user}>
                {usersPage.usersData.map(u => <div key={u.id}>
                    <img className={c.user__avatar}
                         src={u.photos.small !== null ? u.photos.small : initialPhoto}
                         alt='img'/>
                    <div>
                        <button onClick={() => toggleFollow(u.id)}>{u.following ? 'Unfollow' : 'Follow'}</button>
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
        </div>
    )
}
export default Users


// ================== old code w/o api

// if (usersData.length === 0) { // хардкодим БД вместе с отрисовкой страницы, ка кбудто она приходит к нам извне
//     setUsers([...])
// }

// return (...)

// if (usersData.length === 0) {
//     axios.get('https://social-network.samuraijs.com/api/1.0/users')
//         .then((response) => {
//             setUsers(response.data.items)
//         })
// }
