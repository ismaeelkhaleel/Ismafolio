"use client";

import dynamic from "next/dynamic";

const RTE = dynamic(() => import("./RTE"), { ssr: false });

export default function RTEWrapper(props) {
  return <RTE {...props} />;
}
