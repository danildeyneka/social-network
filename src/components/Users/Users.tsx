import {getUsers, UsersFilterType} from "../../redux/usersReducer";
import {FC, useEffect} from "react";
import Preloader from "../common/Preloader/Preloader";
import UserProfile from "./UserProfile/UserProfile";
import Pagination from "../common/Pagination/Pagination";
import {
    selectCurrentPage, selectFilter,
    selectIsFetching,
    selectPageSize,
    selectTotalUsersCount
} from "../../redux/selectors/usersSelectors"
import {useAppDispatch, useAppSelector} from "../../hooks/hooks"
import UserSearch from "./UserSearch"
import {createBrowserHistory} from "history";

const Users: FC = () => {
    const dispatch = useAppDispatch()
    const isFetching = useAppSelector(selectIsFetching)
    const pageSize = useAppSelector(selectPageSize)
    const currentPage = useAppSelector(selectCurrentPage)
    const totalUsersCount = useAppSelector(selectTotalUsersCount)
    const filter = useAppSelector(selectFilter)
    const history = createBrowserHistory()

    const onPageChanged = (currentPage: number) => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }
    const onFilterChange = (filter: UsersFilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [])
    // todo url sync ??
    useEffect(() => {
        history.push({
            pathname: '/#/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])


    return (<>
        {isFetching
            ? <Preloader/>
            : <div>
                <UserSearch onFilterChange={onFilterChange}/>
                <Pagination currentPage={currentPage} pageSize={pageSize} totalUsersCount={totalUsersCount}
                            onPageChanged={onPageChanged}/>
                <UserProfile/>
            </div>}
    </>)
}
export default Users
