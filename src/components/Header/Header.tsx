import c from './Header.module.scss'
import {Link} from "react-router-dom";
import {logOut} from "../../redux/authReducer";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {FC} from "react";
import {selectIsAuth, selectMyId} from "../../redux/selectors/authSelectors";
import {Avatar, Button, Col, Layout, Row} from "antd";
import initialPhoto from "../../assets/images/avatar.png";

const {Header} = Layout

export const AppHeader: FC = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const myId = useAppSelector(selectMyId)
    const dispatch = useAppDispatch()
    const logout = () => {
        dispatch(logOut())
    }

    return <Header>
        <Row>
            <Col span={15}>
                <div>logo</div>
            </Col>
            <Col>
                {isAuth
                    ? <><Avatar style={{height: 50, width: 50}} src={`https://social-network.samuraijs.com/activecontent/images/users/${myId}/user.jpg?v=40`}/>
                        <Button style={{marginLeft: 50}} onClick={logout}>Logout</Button></>
                    : <Button style={{marginLeft: 50}}><Link to='/login'></Link></Button>
                }
            </Col>
        </Row>
    </Header>


    // <header className={c.header}>
    //     <img alt='logo' src='https://png.pngtree.com/element_pic/16/11/02/bd886d7ccc6f8dd8db17e841233c9656.jpg'></img>
    //     <div className={c.login}>
    //         {isAuth
    //             ? <button onClick={() => logout()}>Logout</button>
    //             : <NavLink className={(nav) => nav.isActive ? c.active : ''} to='/login'>Login</NavLink>
    //         }
    //     </div>
    // </header>
}