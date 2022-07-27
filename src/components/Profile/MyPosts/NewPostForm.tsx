import {actions} from "../../../redux/profileReducer";
import {Form, Field} from 'react-final-form'
import {required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/Forms/Forms";
import {FormValuesType} from "../../../types/types";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {selectNewPost} from "../../../redux/selectors/profileSelectors";
import {FC} from "react";

const NewPostForm: FC = () => {
    const dispatch = useAppDispatch()
    const newPost = useAppSelector(selectNewPost)
    const onSubmit = (values: FormValuesType) => {
        dispatch(actions.addPost(values.newPost))
        values.newPost = ''
    }
    return <>
        <Form onSubmit={onSubmit}
              render={({handleSubmit, submitting}) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <Field name='newPost'
                                 component={Textarea}
                                 value={newPost}
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