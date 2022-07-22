import {useDispatch, useSelector} from "react-redux";
import {saveProfile, uploadAvatar} from "../../../../redux/profileReducer";
import {Form, Field} from 'react-final-form'
import c from './ProfileData.module.scss'
import {ChangeEvent, FC} from "react";
import {selectUserProfile} from "../../../../redux/profileSelectors";
import {selectMyId} from "../../../../redux/authSelectors";

type PropsType = {
    notMyPage: object | null
    isEditMode: boolean
    setEditMode: (value: boolean) => void
}
const ProfileData: FC<PropsType> = (props) => {
    const profile = useSelector(selectUserProfile) // ! in selector file to specify !null + contacts[key]
    console.log(profile.contacts)
    const contacts = Object.values(profile!.contacts)
    let contactsArr = []
    contacts.forEach((contact) => {
        if (contact) {
            contactsArr.push(contact)
        }
    })

    return <>
        {!props.notMyPage && <div>
            <button onClick={() => props.setEditMode(true)}>Edit Profile</button>
        </div>}
        <div>
            {profile.lookingForAJob ? <h3>Looking for a job</h3> : ''}
        </div>
        <div>
            <b>Nickname: </b> {profile.fullName}
        </div>

        {profile.lookingForAJobDescription && <div>
            <b>Stack: </b>
            {profile.lookingForAJobDescription}
        </div>}

        {profile.aboutMe && <div>
            <b>About me: </b>
            {profile.aboutMe}
        </div>}

        {(contactsArr.length !== 0) && <div>
            <b>Contacts</b>
            {Object.keys(profile.contacts).map(key => <Contacts key={key}
                                                                title={key}
                                                                value={profile.contacts[key]}
            />)}
        </div>
        }
    </>
}

export const EditProfileData: FC<PropsType> = (props) => {
    const profile = useSelector(selectUserProfile) // ???? same err
    const myId = useSelector(selectMyId)
    const dispatch = useDispatch()
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // @ts-ignore
            dispatch(uploadAvatar(e.target.files[0]))
        }
    }
    const onSubmit = (values: any) => {
        console.log(values) // =================================change
        // @ts-ignore
        dispatch(saveProfile(values, myId))
        props.setEditMode(false)
    }
    const cancelSubmit = () => props.setEditMode(false)

    return <>
        <h2>Modifying profile</h2>
        <h3>Avatar</h3>
        <div>
            <b>Click to upload new avatar</b><br/>
            {!props.notMyPage && <input type="file" onChange={onInputChange}/>}
        </div>
        <h3>Profile info</h3>
        <Form
            onSubmit={onSubmit}
            initialValues={profile}
            render={({handleSubmit, submitting}) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Looking for a job</label>
                        <Field name='lookingForAJob' type='checkbox' component='input'/>
                    </div>
                    <div>
                        <label>Full Name</label>
                        <Field name='fullName' component='input'/>
                    </div>
                    <div>
                        <label>Stack</label>
                        <Field name='lookingForAJobDescription' type='textarea' component='input'/>
                    </div>
                    <div>
                        <label>aboutMe</label>
                        <Field name='aboutMe' type='textarea' component='input'/>
                    </div>

                    <div>
                        <b>Contacts</b>
                        {Object.keys(profile.contacts).map(key =>
                            <div className={c.contact} key={key}>
                                <b>{key}: </b>
                                <Field name={`contacts.${key}`} component='input'/>
                            </div>
                        )}
                    </div>
                    <div>
                        <button type='submit' disabled={submitting}>Save Profile</button>
                        <button onClick={cancelSubmit}>Cancel</button>
                    </div>
                </form>)}
        />
    </>
}

type ContactsType = {
    key: string
    title: string
    value: string
}

const Contacts: FC<ContactsType> = ({title, value}) => {
    console.log(value)
    return <>
        {value && <div>
            <b>{title}: </b>
            {value}
        </div>}
    </>
}

export default ProfileData