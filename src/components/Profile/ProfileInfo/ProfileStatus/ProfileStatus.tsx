import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStatus, setStatusAC, updateStatus} from "../../../../redux/profileReducer";
import {selectMyId} from "../../../../redux/authSelectors";
import {selectStatus} from "../../../../redux/profileSelectors";

type PropTypes = {
    notMyPage: {
        params?: {
            userId?: number | null
        }
    } | null
}

const ProfileStatus: FC<PropTypes> = (props) => {
    const dispatch = useDispatch()
    const [editMode, toggleEditMode] = useState(false)
    const status = useSelector(selectStatus)
    const myId = useSelector(selectMyId)
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { // ????????? TS2345: Argument of type 'KeyboardEvent<HTMLInputElement>' is not assignable to parameter of type 'KeyboardEvent'.
        if (e.key === 'Enter') {
            // @ts-ignore
            dispatch(updateStatus(e.currentTarget.value))
            toggleEditMode(false)
        }
    }
    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        dispatch(updateStatus(e.currentTarget.value))
        toggleEditMode(false)
    }
    // const id = props.notMyPage ? props.notMyPage.params.userId : myId
    const id = props.notMyPage?.params?.userId ?? myId
    useEffect(() => {
        // @ts-ignore
        dispatch(getStatus(id))
    }, [id]) // initial loading of status on page (connected to matched url)

    return (
        <>
            {!editMode &&
                <div>
                    {props.notMyPage
                        ? <span>{status}</span>
                        : <span onClick={() => toggleEditMode(true)}>{status}</span>}
                </div>
            }
            {editMode &&
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