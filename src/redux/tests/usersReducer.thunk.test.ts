import {usersAPI} from "../../api/usersAPI";
import {ResponseType, ResultCodesEnum} from "../../api/api";
import {actions, follow} from "../usersReducer";

const api = usersAPI as jest.Mocked<typeof usersAPI>


jest.mock('../../api/usersAPI')

const result: ResponseType = {
    resultCode: 0,
    messages: [],
    data: {}
}

test('thunk', async () => {
    const thunk = follow(1)
    const dispatch = jest.fn()
    const getState = jest.fn()
    await thunk(dispatch, getState, {})
        // api.follow.mockReturnValue(Promise.resolve(result))
    api.follow.mockResolvedValue(result)

    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.followUser(1))
    expect(dispatch).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})
