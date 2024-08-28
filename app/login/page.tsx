import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export type query = {
  callback: string;
};

// とりあえずデフォルトで/ にリダイレクトする
const LoginPage = () => {
  return (
    <div className="m-3 w-[16rem] rounded-md">
      <h1>Login Page</h1>
      <form
        action={async () => {
          "use server";
          await signIn("github");
          redirect("/");
        }}
      >
        <Button type="submit" className="">
          Signin with GitHub
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
