"use client";
import { useSession } from "next-auth/react";
import SubmitReview from "../review/components/submitReview";
import { useState } from "react";

export default function Page() {
  const [shopId, setShopId] = useState<string>("");
  const session = useSession();
  if (session.status !== "authenticated") {
    return <>Not allowed to reach here</>;
  }
  return (
    <div>
      <h1>Component Check</h1>
      <label>Shop ID</label>
      <input
        value={shopId}
        onChange={(e) => setShopId(e.target.value)}
        className="bg-gray-400"
      />
      <SubmitReview shopId={shopId} />
    </div>
  );
}
