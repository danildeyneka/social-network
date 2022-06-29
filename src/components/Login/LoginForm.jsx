import {Form, Field} from 'react-final-form'
import c from './Login.module.scss'
import {required, maxLength} from "../../utils/validators/validators";

const LoginForm = () => {
    const onSubmit = (values) => {
        console.log(values)
    }

    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)
    return <Form
        onSubmit={onSubmit}
        initialFormValues={{
            remember: false
        }}
        render={({handleSubmit, form, submitting, pristine}) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field
                        name="login"
                        validate={required}
                    >
                        {({input, meta}) => (
                            <div>
                                <label>Login</label>
                                <input {...input} type="text" placeholder="Login"/>
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