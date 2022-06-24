import {useState} from "react";

const ProfileStatus = () => {

    const [status, setStatus] = useState('edit status')
    const [toggleStatus, setToggleStatus] = useState(false)
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {setToggleStatus(false)}
    }

    return (
        <div>
            {!toggleStatus &&
                <div>
                    <span onClick={() => setToggleStatus(true)}>{status}</span>
                </div>
            }
            {toggleStatus &&
                <div>
                    <input onChange={(e) => setStatus(e.currentTarget.value)}
                           onBlur={() => setToggleStatus(false)}
                           onKeyDown={(e) => onKeyDown(e)}
                           type="text"
                           autoFocus={true}
                           value={status}
                    />
                </div>
            }
        </div>
    )
}

export default ProfileStatus