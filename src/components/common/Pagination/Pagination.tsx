import c from "./Pagination.module.scss";
import {FC} from "react";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Pagination: FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let prevPage = ((currentPage - 5) < 0) ? 0 : currentPage - 5
    let nextPage = currentPage + 5
    let slicedPages = pages.slice(prevPage, nextPage)

    return (
        <div className={c.pages}>
            {slicedPages.map(p => <span key={p} className={currentPage === p ? c.selected : ''}
                                        onClick={() => onPageChanged(p)}>{`${p} `}</span>)}
        </div>
    )
}

export default Pagination