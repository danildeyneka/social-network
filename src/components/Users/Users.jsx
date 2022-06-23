import c from './Users.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {followThunk, getUsers, onPageChanged, unfollowThunk} from "../../redux/usersReducer";
import initialPhoto from '../../assets/images/avatar.png'
import {useEffect} from "react";
import Preloader from "../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";

const Users = () => {
    const dispatch = useDispatch()
    const usersPage = useSelector(s => s.usersPage)

    const pagesCount = Math.ceil(usersPage.totalUsersCount / usersPage.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const pageSize = usersPage.pageSize
    const currentPage = usersPage.currentPage
    let prevPage = ((currentPage - 5) < 0) ? 0 : currentPage - 5
    let nextPage = currentPage + 5
    let slicedPages = pages.slice(prevPage, nextPage)

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize))
    }, [])

    return (<>
        {usersPage.isFetching ? <Preloader/> : <div>
            <div className={c.pages}>
                {slicedPages.map(p => <span className={usersPage.currentPage === p ? c.selected : ''}
                                            onClick={() => dispatch(onPageChanged(p, pageSize))}>{`${p} `}</span>)}
            </div>
            <div className={c.user}>
                {usersPage.usersData.map(u => <div key={u.id}>
                    <NavLink to={`/profile/${u.id}`}>
                        <img className={c.user__avatar}
                             src={u.photos.small !== null ? u.photos.small : initialPhoto}
                             alt='img'/>
                    </NavLink>
                    <div>
                        {u.followed ? <button disabled={usersPage.isFollowingInProgress.includes(u.id)}
                                              onClick={() => {
                                                  dispatch(unfollowThunk(u.id))
                                              }}>Unfollow</button> :
                            <button disabled={usersPage.isFollowingInProgress.includes(u.id)}
                                    onClick={() => {
                                        dispatch(followThunk(u.id))
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
        </div>} {/*конец лоадера*/}
    </>)
}
export default Users


// ================== легаси классовый компонент - без хуков и в обертке контейнерного компонента

// ========== UsersContainer.jsx ===============

// let mapStateToProps = (state) => { // state приходит через пропсы с самого начала либо вызывается напрямую
//     return {
//         usersData: state.usersPage.usersData,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage
//     }
// }
//
// let mapDispatchToProps = (dispatch) => {
//     return {
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         toggleFollow: (userId) => {
//             dispatch(toggleFollowAC(userId))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalUsersCount) => {
//             dispatch(setTotalUsersCountAC(totalUsersCount))
//         }
//     }
// }

//
// export default connect(mapStateToProps, mapDispatchToProps)(Users)
//     коннект соединяет стейт и диспатч и закрепляет их за переданным компонентом в конце в виде его пропсов


//=========== еще большее сокращение кода=========
// mapDispatchToProps превращается в объект, передаваемый вторым параметром в connect, а в action creator удаляем -AC:
// connect(mapStateToProps, {setUsers, toggleFollow ...})(Users)


// ============ Users.jsx ======================


// class User extends React.Component {
//     componentDidMount() {
//         axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${usersPage.currentPage}&count=${usersPage.pageSize}`)
//             .then((response) => {
//                 setUsers(response.data.items)
//                 setTotalUsersCount(response.data.totalCount)
//             })
//     }
//
//     onPageChanged = (pageNumber) => {
//         setCurrentPage(pageNumber)
//         axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${usersPage.pageSize}`)
//             .then((response) => {
//                 setUsers(response.data.items)
//             })
//     }
//
//     render() {
//         html остальной. данные стейта идут через пропсы и this
//     }
// }

//====================== для большей чистоты презентационного компонента, аксиос запросы выносятся в контейнерный компонент