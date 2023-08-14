"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Member } from "@/types";

type Props = {
  member: Member;
};

const UserAccountNav = ({ member }: Props) => {
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
        <Avatar className="bg-slate-100 border-2 border-slate-200">
          <AvatarImage src={member.user_detail.image_url} />
          <AvatarFallback>
            <span className="text-lg font-bold">
              {member.user_detail.email[0].toUpperCase()}
            </span>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p>{member.user_detail.first_name}</p>
          <p className="text-muted-foreground font-normal truncate max-w-[200px]">
            {member.user_detail.email}
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
