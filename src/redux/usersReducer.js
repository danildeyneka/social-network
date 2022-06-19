const SET_USERS = 'SET_USERS'
const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'

const initialState = {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1

}

// const initialState = {
//     usersData: [
//         {id: 1, name: 'Dmitriy', photo: 'https://images.unsplash.com/photo-1599850929872-2dec3cbafd7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
//             status: 'unique status', location: {city: 'Minsk', country: 'Belarus'}, following: false},
//         {id: 2, name: 'Eugene', photo: 'https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
//             status: 'unique status 2', location: {city: 'Warsaw', country: 'Poland'}, following: true},
//         {id: 3, name: 'Sasha', photo: 'https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906&q=80',
//             status: 'unique status 3', location: {city: 'Moscow', country: 'Russia'}, following: false}
//     ]
// } // - хардкод для БД. в работе всегда api

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                usersData: [...action.usersData]
            }

        case TOGGLE_FOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(user => {
                    if (user.id === action.userId) {
                        return {...user, following: !user.following}
                    }
                    return user
                })
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }

        default:
            return state
    }
}

export const toggleFollowAC = (userId) => ({type: TOGGLE_FOLLOW, userId})
export const setUsersAC = (usersData) => ({type: SET_USERS, usersData})
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCountAC = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})

export default usersReducer
