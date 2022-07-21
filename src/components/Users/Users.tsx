import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/usersReducer";
import {FC, useEffect} from "react";
import Preloader from "../common/Preloader/Preloader";
import UserProfile from "./UserProfile/UserProfile";
import Pagination from "../common/Pagination/Pagination";
import {selectCurrentPage, selectIsFetching, selectPageSize, selectTotalUsersCount} from "../../redux/usersSelectors";

const Users: FC = () => {
    const dispatch = useDispatch()
    const isFetching = useSelector(selectIsFetching)
    const pageSize = useSelector(selectPageSize)
    const currentPage = useSelector(selectCurrentPage)
    const totalUsersCount = useSelector(selectTotalUsersCount)
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
