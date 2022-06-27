import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStatus, setStatusAC, updateStatus} from "../../../redux/profileReducer";

const ProfileStatus = (props) => {
    const dispatch = useDispatch()
    const [toggleEdit, setToggleEdit] = useState(false)
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            dispatch(updateStatus(e.currentTarget.value))
            setToggleEdit(false)
        }
    }
    const onBlur = (e) => {
        dispatch(updateStatus(e.currentTarget.value))
        setToggleEdit(false)
    }
    const status = useSelector(s => s.profilePage.status)
    const userId = useSelector(s => s.auth.id)
    const id = props.match ? props.match.params.userId : userId
    useEffect(() => {
        dispatch(getStatus(id))
    }, [id]) // initial loading of status on page (connected to matched url)

    return (
        <>
            {!toggleEdit &&
                <div>
                    <span onClick={() => setToggleEdit(true)}>{status}</span>
                </div>
            }
            {toggleEdit &&
                <div>
                    <input onChange={(e) =>
                        dispatch(setStatusAC(e.currentTarget.value))}
                           onBlur={(e) => onBlur(e)}
                           onKeyDown={(e) => onKeyDown(e)}
                           type="text"
                           autoFocus={true}
                           value={status}
                    />
                </div>
            }
        </>
    )
}

export default ProfileStatus