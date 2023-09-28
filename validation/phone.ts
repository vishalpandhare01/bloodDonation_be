import prisma from "../db/prisma";

export async function IsPhoneValid(phone: any) {
  const isPhoneExist = await prisma.user.findFirst({
    where: {
      phone: phone,
    },
  });
  let check = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);

  if (isPhoneExist) return true;
  if (!check) {
    return "Invalid";
  }
  else {
    return false;
  }
}
