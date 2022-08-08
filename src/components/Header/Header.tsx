import {Link} from 'react-router-dom'
import {logOut} from '../../redux/authReducer'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {FC} from 'react'
import {selectIsAuth, selectMyId} from '../../redux/selectors/authSelectors'
import {Avatar, Button, Layout} from 'antd'

const {Header} = Layout

export const AppHeader: FC = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const myId = useAppSelector(selectMyId)
    const dispatch = useAppDispatch()
    const logout = () => {
        dispatch(logOut())
    }

    return <Header>
        {isAuth
            ? <><Button style={{marginLeft: 15}} onClick={logout}>Logout</Button>
                <Avatar style={{marginLeft: 50, height: 50, width: 50}}
                        src={`https://social-network.samuraijs.com/activecontent/images/users/${myId}/user.jpg?v=40`}/></>
            : <Button style={{marginLeft: 15}}><Link to="/login">Login</Link></Button>
        }
    </Header>
}