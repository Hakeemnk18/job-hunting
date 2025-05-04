import User from "@/models/user"
import connectDb from "@/lib/mongodb"

export const validate = async (password:string,email:string)=>{
    connectDb()
    
    const validateUser = await User.findOne({email : email})

    if(validateUser && validateUser.password === password){
        return validateUser
    }
    return null
}