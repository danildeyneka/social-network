import {FC} from 'react'
import {Field, Form, Formik} from 'formik'
import {UsersFilterType} from '../../redux/usersReducer'


type PropsType = {
    onFilterChange: (filter: UsersFilterType) => void
}

const UserSearch: FC<PropsType> = (props) => {

    const validateUsers = (values: any) => {
        return {}
    }

    const onSubmit = (values: UsersFilterType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        props.onFilterChange(values)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik initialValues={{term: '', friend: ''}} onSubmit={onSubmit} validate={validateUsers}>
                {({isSubmitting}) => (
                    <Form>
                        <Field className="ant-input" style={{width: 200, marginRight: 10, marginBottom: 10}} type="text" name="term"/>
                        <Field style={{borderColor: '#1890ff'}} name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button className="ant-btn ant-btn-primary" type="submit" style={{marginLeft: 10}}
                                disabled={isSubmitting}>Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UserSearch