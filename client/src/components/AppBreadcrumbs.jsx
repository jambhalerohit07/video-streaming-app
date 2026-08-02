import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

import { Link, useMatches } from "react-router-dom";

const AppBreadcrumbs = () => {
  const matches = useMatches();

  const crumbs = matches.filter((match) => match.handle?.breadcrumb);

  if (crumbs.length <= 1) return null;

  return (
    <Breadcrumbs size="md" variant="solid" underline="hover">
      {crumbs.map((match) => {
        const label =
          typeof match.handle.breadcrumb === "function"
            ? match.handle.breadcrumb(match)
            : match.handle.breadcrumb;

        const isLast = match.pathname === crumbs[crumbs.length - 1].pathname;

        return (
          <BreadcrumbItem key={match.pathname} isCurrent={isLast}>
            {isLast ? label : <Link to={match.pathname}>{label}</Link>}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
