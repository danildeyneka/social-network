export const mapUsersWithNewProperty = (array, userId, property, newProperty) => {
    return array.map(user => {
        if (user[property] === userId) {
            return {...user, ...newProperty}
        }
        return user
    })
}