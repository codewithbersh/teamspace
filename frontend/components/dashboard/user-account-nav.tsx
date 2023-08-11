"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GetMembersType } from "@/lib/axios/member";

type Props = {
  session: Session;
  member: GetMembersType;
};

const UserAccountNav = ({ session, member }: Props) => {
  const user = session.user;

  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/teamspace/${params.teamSpaceId}/tickets`,
      label: "Tickets",
      active: pathname === `/teamspace/${params.teamSpaceId}/tickets`,
    },
    {
      href: `/teamspace/${params.teamSpaceId}/settings`,
      label: "Settings",
      active: pathname === `/teamspace/${params.teamSpaceId}/settings`,
      hidden: member.role === "NA",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage className="bg-slate-100" src={member.user.image_url} />
          <AvatarFallback className="bg-foreground">
            <span className="text-lg font-bold text-accent">
              {user.backendSession.user.email[0].toUpperCase()}
            </span>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p>{user.name ? user.name : user.backendSession.user.first_name}</p>
          <p className="text-muted-foreground font-normal truncate max-w-[200px]">
            {user.backendSession.user.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {routes.map((route) => (
          <DropdownMenuItem key={route.href} asChild>
            <Link href={route.href} className={route.hidden ? "hidden" : ""}>
              {route.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserAccountNav };
