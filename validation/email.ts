import prisma from "../db/prisma";

export async function IsEmailValid(email: any) {
  const isEmailExist = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (isEmailExist) return true;
  let check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  if (!check) {
    return 'Invalid';
  }
  else {
    return false;
  }
}
