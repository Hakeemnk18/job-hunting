import User from "@/models/user"

export const register = async (name: string, email: string, password: string) => {
    console.log("inside register")
    const user = await User.findOne({ email: email })
    if(!user){
        const newUser = new User({
            name:name,
            email:email,
            password:password
        })

        const addedUser = await newUser.save()
        console.log("user added succesfully")
        return addedUser
    }
    return null
}