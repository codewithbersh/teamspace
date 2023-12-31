"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Member } from "@/types";

type MainNavProps = {
  member: Member;
};

const MainNav = ({ member }: MainNavProps) => {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/teamspace/${params.teamSpaceId}/tickets`,
      label: "Tickets",
      active: pathname.startsWith(`/teamspace/${params.teamSpaceId}/tickets`),
    },
    {
      href: `/teamspace/${params.teamSpaceId}/settings`,
      label: "Settings",
      active: pathname.startsWith(`/teamspace/${params.teamSpaceId}/settings`),
      hidden: member.role === "NA",
    },
  ];
  return (
    <nav className="items-center space-x-4 lg:space-x-6 ml-6 hidden sm:flex">
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-foreground",
            route.active ? "text-foreground " : "text-muted-foreground",
            route.hidden && "hidden"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export { MainNav };
