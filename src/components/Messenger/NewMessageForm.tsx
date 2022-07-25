import c from "./Messenger.module.scss";
import {sendMessage} from "../../redux/messengerReducer";
import {Field, Form} from "react-final-form";
import {Textarea} from "../common/Forms/Forms";
import {required} from "../../utils/validators/validators";
import {FormValuesType} from "../../types/types";
import {selectNewMessage} from "../../redux/messengerSelectors";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {FC} from "react";

const NewMessageForm: FC = () => {
    const dispatch = useAppDispatch()
    const newMessage = useAppSelector(selectNewMessage)
    const onSubmit = (values: FormValuesType) => {
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
                                 value={newMessage}
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