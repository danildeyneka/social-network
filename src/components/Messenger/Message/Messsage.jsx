import c from './../Messenger.module.scss'

const Message = (props) => {

    return (<div>
        <div className={c.messages__item}>
            <div>
                {props.message}
            </div>
        </div>
    </div>);
};

export default Message