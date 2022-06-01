import c from './Post.module.scss'

const Post = (props) => {
  return (
  <div className={c.content}>
    <div>
      {props.message}
    </div>
  </div>
  )
}

export default Post