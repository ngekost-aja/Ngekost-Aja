"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ManagerDashboard from "./ManagerDashboard";
import OwnerDashboard from "./OwnerDashboard";

export default function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Decode the JWT token (client-side)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
    } catch (err) {
      console.error("Invalid token", err);
      router.push("/login");
    }
  }, [router]);

  if (!role) return <p>Loading...</p>;

  return (
    <div>
      {role === "manager" && <ManagerDashboard />}
      {role === "owner" && <OwnerDashboard />}
    </div>
  );
}
