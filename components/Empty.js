import React from "react";
import { EmptyState } from "./ui/empty-state";

const Empty = ({ icon, title, description }) => {
  return <EmptyState icon={icon} title={title} description={description} />;
};

export default Empty;
