import Link from "next/link";

import { MarketingHeader } from "@/components/marketing/marketing-header";

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <section>
      <MarketingHeader />
      {children}
      <div className="container">
        <p className="text-muted-foreground text-center py-8">
          Visit{" "}
          <Link
            className="underline underline-offset-2"
            target="_blank"
            href="https://github.com/codewithbersh/teamspace"
          >
            Github
          </Link>
          . Uploaded on{" "}
          <Link
            className="underline underline-offset-2"
            target="_blank"
            href="https://vercel.com"
          >
            Vercel
          </Link>{" "}
          &{" "}
          <Link
            className="underline underline-offset-2"
            target="_blank"
            href="https://railway.app"
          >
            Railway
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default MarketingLayout;
