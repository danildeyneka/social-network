import {Form, Field} from 'react-final-form'
import c from './Login.module.scss'
import {required, maxLength} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../../redux/authReducer";

const LoginForm = () => {
    const dispatch = useDispatch()
    const error = useSelector(s=>s.auth.error)
    const captchaUrl = useSelector(s=>s.auth.captchaUrl)
    const onSubmit = (values) => {
        dispatch(logIn(values))
    }
    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    return <Form
        onSubmit={onSubmit}
        initialFormValues={{
            remember: false,
            captchaUrl: null // ??
        }}
        render={({handleSubmit, form, submitting, pristine}) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field
                        name="email"
                        validate={required}
                    >
                        {({input, meta}) => (
                            <div>
                                <label>Email</label>
                                <input {...input} type="text" placeholder="Email"/>
                                {meta.error && meta.touched && <span className={c.error}>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                </div>

                <div>
                    <Field
                        name="password"
                        validate={composeValidators(required, maxLength(20))}
                    >
                        {({input, meta}) => (
                            <div>
                                <label>Password</label>
                                <input {...input} type="password" placeholder="Password"/>
                                {meta.error && meta.touched && <span className={c.error}>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                </div>

                <div>
                    <label>Remember me</label>
                    <Field name="remember" component="input" type="checkbox"/>
                </div>

                <div className={(c.loginError) + ' ' + (error === null ? '' : c.loginError__display)}
                >
                    {error}
                </div>

                { captchaUrl && <img alt='captchaImg' src={captchaUrl}/>}
                { captchaUrl && <Field name='captcha' validate={required}>
                    {({input, meta}) => (
                        <div>
                            <input {...input}/>
                            {meta.error && meta.touched && <span className={c.error}>{meta.error}</span>}
                        </div>
                        )}
                </Field>}

                <div className="buttons">
                    <button type="submit" disabled={submitting || pristine}>
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                    >
                        Reset
                    </button>
                </div>
            </form>
        )}
    />
}

export default LoginForm