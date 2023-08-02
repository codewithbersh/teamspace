import { getCurrentSession } from "@/lib/session";

const MarketingPage = async () => {
  const session = await getCurrentSession();
  return <div></div>;
};

export default MarketingPage;
