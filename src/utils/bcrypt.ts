import * as bcrypt from "bcrypt"
export const hashPassword = async (password:string):Promise<string>=>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt)
    return hash;
}

export const comparePassword = async(plainPassword: string,
    hashedPassword: string):Promise<boolean>=>{
        return await bcrypt.compare(plainPassword,hashedPassword);

}