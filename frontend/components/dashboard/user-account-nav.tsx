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

import { User } from "lucide-react";

type Props = {
  session: Session;
};

const UserAccountNav = ({ session }: Props) => {
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
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.image} />
          <AvatarFallback>
            <User />
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
            <Link href={route.href}>{route.label}</Link>
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
