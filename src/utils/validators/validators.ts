export const required = (value: string) => (value ? undefined : 'Required')

export const maxLength = (maxNum: number) => (value: number) => {
    if (value > maxNum)
        return `Error. Max symbol length is ${maxNum}`
    return undefined
}