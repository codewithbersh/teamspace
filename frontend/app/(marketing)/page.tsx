import { getCurrentSession } from "@/lib/session";

import MarketingHeader from "@/components/marketing/marketing-header";

const MarketingPage = async () => {
  const session = await getCurrentSession();
  return (
    <div>
      <MarketingHeader session={session} />
    </div>
  );
};

export default MarketingPage;
