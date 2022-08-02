import {getUsers, UsersFilterType} from "../../redux/usersReducer";
import {FC, useEffect} from "react";
import Preloader from "../common/Preloader/Preloader";
import UserProfile from "./UserProfile/UserProfile";
import Pagination from "../common/Pagination/Pagination";
import {
    selectCurrentPage,
    selectFilter,
    selectIsFetching,
    selectPageSize,
    selectTotalUsersCount
} from "../../redux/selectors/usersSelectors"
import {useAppDispatch, useAppSelector} from "../../hooks/hooks"
import UserSearch from "./UserSearch"
import {useSearchParams} from "react-router-dom";
import {Logger} from "sass";
import {logIn} from "../../redux/authReducer";

const Users: FC = () => {
    const dispatch = useAppDispatch()
    const isFetching = useAppSelector(selectIsFetching)
    const pageSize = useAppSelector(selectPageSize)
    const currentPage = useAppSelector(selectCurrentPage)
    const totalUsersCount = useAppSelector(selectTotalUsersCount)
    const filter = useAppSelector(selectFilter)
    const [searchParams, setSearchParams] = useSearchParams();

    const onPageChanged = (currentPage: number) => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }
    const onFilterChange = (filter: UsersFilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }

    useEffect(() => {
        if (currentPage !== 1 || filter.friend !== '' || filter.term !== '')
            setSearchParams(`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`)
        // console.log(searchParams.get('page'))
        // if (searchParams.get('page') !== String(currentPage))
        //     searchParams.set('page', '3')
        // console.log(searchParams.get('page'))
    }, [currentPage, searchParams])
    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [currentPage])
    // todo url sync ??

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
