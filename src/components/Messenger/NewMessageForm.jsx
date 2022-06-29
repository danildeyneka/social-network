import c from "./Messenger.module.scss";
import {sendMessage} from "../../redux/messengerReducer";
import {Field, Form} from "react-final-form";
import {useDispatch, useSelector} from "react-redux";
import {Textarea} from "../common/Forms/Forms";
import {required} from "../../utils/validators/validators";

const NewMessageForm = () => {
    const dispatch = useDispatch()
    const messengerPage = useSelector(s => s.messengerPage)
    const onSubmit = values => {
        dispatch(sendMessage(values.newMessage)) // привязка к name у Field
        values.newMessage = ''
    }
    return <>
        <Form onSubmit={onSubmit}
              render={({handleSubmit, submitting}) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <Field name='newMessage'
                                 component={Textarea}
                                 value={messengerPage.newMessage}
                                 validate={required}
                          />
                      </div>
                      <div>
                          <button type='submit' disabled={submitting}>
                              Send message
                          </button>
                      </div>
                  </form>
              )}
        />
    </>
}

export default NewMessageForm

// <textarea
//     className={c.textarea}
//     value={messengerPage.newMessage}
//     onChange={(e) => dispatch(writeMessage(e.target.value))}/>
// <button
//     className={c.button}
//     onClick={() => dispatch(addMessage())}>
//     <span>Send</span>
// </button>