import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {getStatus, actions, updateStatus} from "../../../../redux/profileReducer";
import {selectMyId} from "../../../../redux/selectors/authSelectors";
import {selectStatus} from "../../../../redux/selectors/profileSelectors";
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks'

type PropTypes = {
    notMyPage: {
        params?: {
            userId?: number | null
        }
    } | null
}

const ProfileStatus: FC<PropTypes> = (props) => {
    const dispatch = useAppDispatch()
    const [editMode, toggleEditMode] = useState(false)
    const status = useAppSelector(selectStatus)
    const myId = useAppSelector(selectMyId)
    const id = props.notMyPage?.params?.userId ?? myId
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(updateStatus(e.currentTarget.value))
            toggleEditMode(false)
        }
    }
    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateStatus(e.currentTarget.value))
        toggleEditMode(false)
    }
    const toggleEditHandler = () => toggleEditMode(true)
    useEffect(() => {
        dispatch(getStatus(id))
    }, [id])

    return (
        <>
            {!editMode &&
                <div>
                    <span style={{color: '#1890ff', fontSize: 22, cursor: 'pointer'}} onClick={!props.notMyPage ? toggleEditHandler : undefined}>{status}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={(e) =>
                        dispatch(actions.setStatusAC(e.currentTarget.value))}
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