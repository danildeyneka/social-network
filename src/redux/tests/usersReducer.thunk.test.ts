import {usersAPI} from "../../api/usersAPI";
import {ResponseType, ResultCodesEnum} from "../../api/api";
import {actions, follow, unfollow} from "../usersReducer";

const api = usersAPI as jest.Mocked<typeof usersAPI>
jest.mock('../../api/usersAPI')

const dispatch = jest.fn()
const getState = jest.fn()

const result: ResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}
test('following works', async () => {
    api.follow.mockResolvedValue(result)
    const thunk = follow(1)
    await thunk(dispatch, getState, {})

    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.followUser(1))
    expect(dispatch).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})

test('unfollowing works', async () => {
    api.unfollow.mockResolvedValue(result)
    const thunk = unfollow(1)
    await thunk(dispatch, getState, {})

    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.unfollowUser(1))
    expect(dispatch).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})

