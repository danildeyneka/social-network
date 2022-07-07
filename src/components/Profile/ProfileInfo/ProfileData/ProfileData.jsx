import {useDispatch, useSelector} from "react-redux";
import {saveProfile, uploadAvatar} from "../../../../redux/profileReducer";
import {Form, Field} from 'react-final-form'
import {useEffect, useMemo} from "react";

const ProfileData = (props) => {
    const profile = useSelector(s => s.profilePage.profile)

    return <>
        {!props.notMyPage && <div>
            <button onClick={() => props.setEditMode(true)}>Edit Profile</button>
        </div>}
        <div>
            {profile.lookingForAJob ? <h3>Looking for a job</h3> : ''}
        </div>
        <div>
            <b>Nickname :</b> {profile.fullName}
        </div>

        {profile.lookingForAJobDescription && <div>
            <b>Stack :</b>
            {profile.lookingForAJobDescription}
        </div>}

        {profile.aboutMe && <div>
            <b>About me :</b>
            {profile.aboutMe}
        </div>}

        { profile.contacts && <div>
            <b>Contacts :</b>
            {Object.keys(profile.contacts).map(key => <Contacts key={key}
                                                                title={key}
                                                                value={profile.contacts[key]}
            />)}
        </div>}
    </>
}

export const EditProfileData = (props) => {
    const profile = useSelector(s => s.profilePage.profile)
    const myId = useSelector(s => s.auth.id)
    const dispatch = useDispatch()
    const onInputChange = (e) => {
        if (e.target.files) {
            dispatch(uploadAvatar(e.target.files[0]))
        }
    }
    const onSubmit = (values) => {
        dispatch(saveProfile(values, myId))
        props.setEditMode(false)
    }

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
            render={({handleSubmit}) => (
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

                    {/*<div>*/}
                    {/*    <b>Contacts :</b>*/}
                    {/*    {Object.keys(profile.contacts).map(key => <Contacts key={key}*/}
                    {/*                                                        title={key}*/}
                    {/*                                                        value={profile.contacts[key]}*/}
                    {/*    />)}*/}
                    {/*</div>*/}

                    <div>
                        <button type='submit'>Save Profile</button>
                    </div>
                </form>)}
        />
    </>
}

const Contacts = ({title, value}) => {
    return <>
        {value && <div>
            <b>{title} :</b>
            {value}
        </div>}
    </>
}

export default ProfileData