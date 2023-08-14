import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Fingerprint, Smartphone, Users, VenetianMask } from "lucide-react";
import Balancer from "react-wrap-balancer";
import TeamSpaceMockup from "@/public/teamspace-mockup.png";

export const metadata: Metadata = {
  title: "Team Space | Home",
  description: "Marketing Page",
};

const features = [
  {
    icon: VenetianMask,
    title: "Own a Space",
    description: "Create and manage your own team space",
  },
  {
    icon: Users,
    title: "Join a Space",
    description: "You can join and manage other team space",
  },
  {
    icon: Fingerprint,
    title: "Manage Authorizations",
    description: "Manage team space and ticket authorizations in one click.",
  },
  {
    icon: Smartphone,
    title: "Use Anywhere",
    description: "Manage everything and everywhere in your mobile.",
  },
];

const MarketingPage = async () => {
  return (
    <div className="text-center space-y-10 md:space-y-80 py-12">
      <section className="space-y-2 container !max-w-3xl ">
        <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground sm:text-base">
          Manage your team
        </p>
        <h1 className="font-bold text-3xl max-w-[500px] sm:max-w-none mx-auto sm:text-5xl md:text-6xl leading-none lg:leading-[1.1] ">
          <Balancer>Your Ultimate Project Management Tool</Balancer>
        </h1>
        <p className="text-sm sm:text-lg font-medium text-muted-foreground mt-2">
          Streamline Collaboration and Enhance Productivity
        </p>
        <Button className="!mt-4" asChild>
          <Link href="/login">
            Get Started — <span className="italic">it&apos;s free</span>
          </Link>
        </Button>
      </section>
      <section className="container  bg-slate-50 py-8 md:h-[650px]  ">
        <div className="space-y-8 md:-translate-y-60">
          <div className=" mx-auto !max-w-3xl">
            <Image
              src={TeamSpaceMockup}
              alt="Team Space Mockup"
              sizes="100vw"
              priority
              placeholder="blur"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 !max-w-3xl mx-auto">
            {features.map((feature) => (
              <Card key={feature.title} className="text-start">
                <CardContent className="p-4">
                  <div className="p-2 rounded-full bg-foreground w-fit">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h1 className="font-bold leading-normal mt-4">
                    {feature.title}
                  </h1>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="container !max-w-3xl md:-translate-y-60 space-y-4">
        <h1 className="font-bold text-3xl max-w-[500px] sm:max-w-none mx-auto sm:text-5xl md:text-6xl leading-none lg:leading-[1.1]">
          Fast. Secure. Reliable.
        </h1>
        <p className="text-sm sm:text-lg font-medium text-muted-foreground mt-2">
          <Balancer>
            Built with the latest technologies: NextJS, NextAuth, Django Rest
            Framework, TailwindCSS.
          </Balancer>
        </p>
        <Button asChild>
          <Link href="/login">Start Exploring</Link>
        </Button>
      </section>
    </div>
  );
};

export default MarketingPage;
