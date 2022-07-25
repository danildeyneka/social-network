import c from './Forms.module.scss'
import {FC} from "react";
import {FieldRenderProps} from "react-final-form";

type PropsType = FieldRenderProps<string, any>
export const Textarea: FC<PropsType> = ({input, meta}) => {
    return <div className={c.form}>
        <textarea {...input} className={(meta.error && meta.touched && c.error) || ''}/>
    </div>
}