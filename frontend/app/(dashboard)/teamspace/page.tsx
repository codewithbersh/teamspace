import { redirect } from "next/navigation";

import LogoutBtn from "@/components/logoutbtn";

import { getCurrentSession } from "@/lib/session";

const DashboardPage = async () => {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  return (
    <div>
      <LogoutBtn />
    </div>
  );
};

export default DashboardPage;
