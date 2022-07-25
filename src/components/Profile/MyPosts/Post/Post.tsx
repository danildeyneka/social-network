import c from './Post.module.scss'
import {FC} from "react";

type PropsTypes = {
  message: string
}
const Post: FC<PropsTypes> = (props) => {
  return (
  <div className={c.content}>
    <div>
      {props.message}
    </div>
  </div>
  )
}

export default Post