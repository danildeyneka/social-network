import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStatus, setStatusAC, updateStatus} from "../../../../redux/profileReducer";

const ProfileStatus: React.FC = (props) => {
    const dispatch = useDispatch()
    const [toggleEdit, setToggleEdit] = useState(false)
    const status = useSelector(s => s.profilePage.status)
    const myId = useSelector(s => s.auth.id)
    const onKeyDown = (e: KeyboardEvent) => { // ????????? TS2345: Argument of type 'KeyboardEvent<HTMLInputElement>' is not assignable to parameter of type 'KeyboardEvent'.
        if (e.key === 'Enter') {
            // @ts-ignore
            dispatch(updateStatus(e.currentTarget.value))
            setToggleEdit(false)
        }
    }
    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        dispatch(updateStatus(e.currentTarget.value))
        setToggleEdit(false)
    }
    const id = props.notMyPage ? props.notMyPage.params.userId : myId
    useEffect(() => {
        // @ts-ignore
        dispatch(getStatus(id))
    }, [id]) // initial loading of status on page (connected to matched url)

    return (
        <>
            {!toggleEdit &&
                <div>
                    {props.notMyPage
                        ? <span>{status}</span>
                        : <span onClick={() => setToggleEdit(true)}>{status}</span>}
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