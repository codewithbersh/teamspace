"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

type Props = {};

const LogoutBtn = (props: Props) => {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Button>
  );
};

export default LogoutBtn;
