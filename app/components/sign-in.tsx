import { signIn } from "@/auth";

type Props = {
  callback?: string;
};
export default function SignIn({ callback }: Props) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: callback, redirect: true });
      }}
    >
      <button
        type="submit"
        className="bg-gray-700 text-gray-100 p-2 rounded-md"
      >
        Signin with GitHub
      </button>
    </form>
  );
}
