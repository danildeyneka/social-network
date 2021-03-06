import {addPost} from "../../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {Form, Field} from 'react-final-form'
import {required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/Forms/Forms";

const NewPostForm = () => {
    const dispatch = useDispatch()
    const profilePage = useSelector(s => s.profilePage)
    const onSubmit = values => {
        dispatch(addPost(values.newPost))
        values.newPost = ''
    }
    return <>
        <Form onSubmit={onSubmit}
              render={({handleSubmit, submitting}) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <Field name='newPost'
                                 component={Textarea}
                                 value={profilePage.newPost}
                                 validate={required}
                          />
                      </div>
                      <div>
                          <button type='submit' disabled={submitting}>
                              Add post
                          </button>
                      </div>
                  </form>
              )}
        />
    </>
}

export default NewPostForm


//         <div>
//         <textarea
//             value={profilePage.newPost}
//             onChange={(e) => dispatch(writePost(e.target.value))}/>
//         </div>
//         <div>
//             <button onClick={() => dispatch(addPost())}>Add post</button>
//         </div>
