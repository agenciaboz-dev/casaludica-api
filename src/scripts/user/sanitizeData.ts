import { User } from "../../class/User"

const sanitizeData = async () => {
    const users = await User.list()
    users.forEach((user) => {
        console.log(`sanitizing all data from ${user.id} - ${user.email}`)
        user.update(user.sanitizeData(user)).catch((e) => console.log(e))
    })
}

sanitizeData()
