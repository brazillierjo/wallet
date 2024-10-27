import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export async function sessionCheck(): Promise<any> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  // const user = await UserModel.findOne({ email: session.user.email }).populate("incomes").populate("expenses");

  // if (!user) {
  //   throw new Error("User not found");
  // }
  return true;
  // return user as IUser;
}
