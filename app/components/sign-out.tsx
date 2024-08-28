import { signOut } from "@/auth";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="bg-gray-700 text-gray-100 p-2 rounded-md"
      >
        サインアウト
      </button>
    </form>
  );
}
