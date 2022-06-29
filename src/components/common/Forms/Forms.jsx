import c from './Forms.module.scss'

export const Textarea = ({input, meta}) => {
    return <div className={c.form}>
        <textarea {...input} {...meta} className={ meta.error && meta.touched && c.error}/>
    </div>
}