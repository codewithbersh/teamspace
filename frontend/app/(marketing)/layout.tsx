import MarketingHeader from "@/components/marketing/marketing-header";

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <section>
      <MarketingHeader />
      {children}
    </section>
  );
};

export default MarketingLayout;
