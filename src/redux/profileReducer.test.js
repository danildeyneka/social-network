import profileReducer, {addPost, deletePost} from "./profileReducer";

const state = {
    postData: [
        {id: 1, message: 'Hi there', likesCount: 4},
        {id: 2, message: 'Hi e3dq', likesCount: 6},
        {id: 3, message: 'Hi 23213', likesCount: 11},
        {id: 4, message: 'Hi', likesCount: 2},
    ]
}

it('new post should be added', () => {
    // initial test data
    const action = addPost('new post text')
    // action
    let newState = profileReducer(state, action)
    // output
    expect(newState.postData.length).toBe(5)
})

it('post should be removed', () => {
    const action = deletePost(4)
    let newState = profileReducer(state, action)
    expect(newState.postData.length).toBe(3)
})