import c from "./Pagination.module.scss";
import {onPageChanged} from "../../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";

const Pagination = () => {
    const dispatch = useDispatch()
    const pageSize = useSelector(s => s.usersPage.pageSize)
    const currentPage = useSelector(s => s.usersPage.currentPage)
    const totalUsersCount = useSelector(s => s.usersPage.totalUsersCount)
    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let prevPage = ((currentPage - 5) < 0) ? 0 : currentPage - 5
    let nextPage = currentPage + 5
    let slicedPages = pages.slice(prevPage, nextPage)

    return (
        <div className={c.pages}>
            {slicedPages.map(p => <span key={p} className={currentPage === p ? c.selected : ''}
                                        onClick={() => dispatch(onPageChanged(p, pageSize))}>{`${p} `}</span>)}
        </div>
    )
}

export default Pagination