export const required = value => (value ? undefined : 'Required')

export const maxLength = maxNum => value => {
    if (value.length > maxNum)
        return `Error. Max symbol length is ${maxNum}`
    return undefined
}