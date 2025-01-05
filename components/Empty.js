import React from "react";
import { EmptyState } from "./ui/empty-state";
import Link from "next/link";

const Empty = ({ icon, title, description, action, path }) => {
  return (
    <EmptyState icon={icon} title={title} description={description}>
      <Link
        href={path}
        style={{ textDecoration: "underline", color: "#20c997" }}
      >
        {action}
      </Link>
    </EmptyState>
  );
};

export default Empty;
