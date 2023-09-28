import bcrypt from "bcrypt"
export async function isValidPassword(password:string){
    let check = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
        password
      );
      if (check) {
        const saltRounds = 10;
        password = await bcrypt.hash(password, saltRounds);
        return password;
      }
      return false;
}

