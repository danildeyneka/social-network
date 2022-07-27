import {UsersDataType} from "../../types/types";

export const mapUsersWithNewProperty = (array: Array<UsersDataType>, userId: number, property: string, newProperty: any) => {
    return array.map((user: UsersDataType) => {
        if (user[property as keyof UsersDataType] === userId) {
            return {...user, ...newProperty}
        }
        return user
    })
}