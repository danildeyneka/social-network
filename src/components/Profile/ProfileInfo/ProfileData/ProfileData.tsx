import {saveProfile, uploadAvatar} from '../../../../redux/profileReducer'
import {Form, Field} from 'react-final-form'
import c from './ProfileData.module.scss'
import {ChangeEvent, FC} from 'react'
import {selectUserProfile} from '../../../../redux/selectors/profileSelectors'
import {selectMyId} from '../../../../redux/selectors/authSelectors'
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks'
import {ProfileContactsType} from '../../../../types/types'
import {Button} from 'antd'

type PropsType = {
    notMyPage: object | null
    isEditMode: boolean
    setEditMode: (value: boolean) => void
}
type ContactsType = {
    key: string
    title: string
    value: string
}

const Contacts: FC<ContactsType> = ({title, value}) => {
    return <>
        {value && <div>
            <b>{title}: </b>
            {value}
        </div>}
    </>
}

const ProfileData: FC<PropsType> = (props) => {
    const profile = useAppSelector(selectUserProfile) // ! in selector file to specify !null + contacts[key]
    const contacts = Object.values(profile!.contacts)
    let contactsArr = [] // check for full emptiness (to display or not al all)
    contacts.forEach((contact) => {
        if (contact) {
            contactsArr.push(contact)
        }
    })

    return <>
        {!props.notMyPage && <div>
            <Button onClick={() => props.setEditMode(true)}>Edit Profile</Button>
        </div>}
        <div>
            {profile.lookingForAJob ? <h3>Looking for a job</h3> : ''}
        </div>
        <div>
            <b>Name: </b> {profile.fullName}
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
            <b className={c.contacts}>Contacts</b>
            {Object.keys(profile.contacts).map(key => <Contacts key={key}
                                                                title={key}
                                                                value={profile.contacts[key as keyof ProfileContactsType]}
            />)}
        </div>
        }
    </>
}

export const EditProfileData: FC<PropsType> = (props) => {
    const profile = useAppSelector(selectUserProfile)
    const myId = useAppSelector(selectMyId)
    const dispatch = useAppDispatch()
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            dispatch(uploadAvatar(e.target.files[0]))
        }
    }
    const onSubmit = (values: any) => {
        dispatch(saveProfile(values, myId))
        props.setEditMode(false)
    }
    const cancelSubmit = () => props.setEditMode(false)

    return <div className={c.form}>
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
                        <Field className="ant-checkbox" name="lookingForAJob" type="checkbox" component="input"/>
                    </div>
                    <div>
                        <label>Full Name</label>
                        <Field className={`ant-input ${c.input}`} name="fullName" component="input"/>
                    </div>
                    <div>
                        <label>Stack</label>
                        <Field className={`ant-input ${c.input}`} name="lookingForAJobDescription" type="textarea"
                               component="input"/>
                    </div>
                    <div>
                        <label>About me</label>
                        <Field className={`ant-input ${c.input + ' ' + c.textarea}`} name="aboutMe" type="textarea" component="textarea"/>
                    </div>

                    <div>
                        <b className={c.contacts}>Contacts</b>
                        {Object.keys(profile.contacts).map(key =>
                            <div className={c.contact} key={key}>
                                <b>{key}: </b>
                                <Field className={`ant-input ${c.input}`} name={`contacts.${key}`} component="input"/>
                            </div>
                        )}
                    </div>
                    <div>
                        <button className="ant-btn ant-btn-primary" type="submit" disabled={submitting}>
                            Save Profile
                        </button>
                        <button style={{marginLeft: 6}} className="ant-btn ant-btn-primary" onClick={cancelSubmit}>
                            Cancel
                        </button>
                    </div>
                </form>)}
        />
    </div>
}

export default ProfileData