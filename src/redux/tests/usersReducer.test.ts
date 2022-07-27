import usersReducer, {actions, InitialStateType} from "../usersReducer";

let state: InitialStateType

beforeEach(() => { // remain original state
    state = {
        usersData: [
            {id: 0, status: 'status 0', photos: {large: null, small: null}, followed: false, name: 'user 0'},
            {id: 1, status: 'status 1', photos: {large: null, small: null}, followed: false, name: 'user 1'},
            {id: 2, status: 'status 2', photos: {large: null, small: null}, followed: true, name: 'user 2'},
        ],
        followingInProgress: [],
        currentPage: 1,
        isFetching: false,
        pageSize: 10,
        totalUsersCount: 0
    }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followUser(1))
    expect(newState.usersData[0].followed).toBeFalsy()
    expect(newState.usersData[1].followed).toBeTruthy()
})

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowUser(2))
    expect(newState.usersData[2].followed).toBeFalsy()
})