import MarketingHeader from "@/components/marketing/marketing-header";
import { getCurrentSession } from "@/lib/session";

const MarketingPage = async () => {
  const session = await getCurrentSession();
  return (
    <div>
      <MarketingHeader session={session} />
    </div>
  );
};

export default MarketingPage;
