"use client";

import { Slash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { SelectWorkspace } from "./select-workspace";

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function Breadcrumbs() {
  const breadcrumbs = [
    // !isRoot ? page?.title : null,
    // "label",
  ].filter(notEmpty);

  return (
    <div className="flex items-center">
      <Link href="/app" className="shrink-0">
        <Image
          src="/icon.png"
          alt="OpenStatus"
          height={30}
          width={30}
          className="rounded-full border border-border"
        />
      </Link>
      <Slash className="-rotate-12 mr-0.5 ml-2.5 h-4 w-4 text-muted-foreground" />
      <div className="w-40">
        <SelectWorkspace />
      </div>

      {breadcrumbs.map((breadcrumb) => (
        <Fragment key={breadcrumb}>
          <Slash className="-rotate-12 mr-2.5 ml-0.5 h-4 w-4 text-muted-foreground" />
          <p className="rounded-md font-medium text-primary text-sm">
            {breadcrumb}
          </p>
        </Fragment>
      ))}
    </div>
  );
}
