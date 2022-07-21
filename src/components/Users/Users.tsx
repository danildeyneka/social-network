import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/usersReducer";
import {useEffect} from "react";
import Preloader from "../common/Preloader/Preloader";
import UserProfile from "./UserProfile/UserProfile";
import Pagination from "../common/Pagination/Pagination";
import React from "react";
import {getCurrentPage, getIsFetching, getPageSize, getTotalUsersCount} from "../../redux/usersSelectors";

const Users: React.FC = () => {
    const dispatch = useDispatch()
    const isFetching = useSelector(getIsFetching)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const onPageChanged = (currentPage: number) => {
        // @ts-ignore потому что dispatch: any. фиксится в сторе
        dispatch(getUsers(currentPage, pageSize))
    }

    useEffect(() => {
        // @ts-ignore
        dispatch(getUsers(currentPage, pageSize))
    }, [pageSize])

    return (<>
        {isFetching
            ? <Preloader/>
            : <div>
                <Pagination currentPage={currentPage} pageSize={pageSize} totalUsersCount={totalUsersCount} onPageChanged={onPageChanged}/>
                <UserProfile/>
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