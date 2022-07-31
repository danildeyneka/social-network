import {FC} from "react";
import {Field, Form, Formik} from "formik";
import {UsersFilterType} from "../../redux/usersReducer";

type PropsType = {
    onFilterChange: (filter: UsersFilterType) => void
}

const UserSearch: FC<PropsType> = (props) => {

const validateUsers = (values: any) => {
    return {}
}

const onSubmit = (values: UsersFilterType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
    props.onFilterChange(values)
    setSubmitting(false)
}

    return (
        <div>
            <Formik initialValues={{term: '', friend: ''}} onSubmit={onSubmit} validate={validateUsers}>
            {({isSubmitting}) => (
                <Form>
                    <Field type='text' name='term'/>
                    <Field name='friend' as='select'>
                        <option value='null'>All</option>
                        <option value='true'>Only followed</option>
                        <option value='false'>Only unfollowed</option>
                    </Field>
                    <button type='submit' disabled={isSubmitting}>Find</button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default UserSearch