import React from 'react'
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UCSBDiningCommonsMenuItemTable from 'main/components/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemTable';
import { useCurrentUser } from 'main/utils/currentUser' // use prefix indicates a React Hook

export default function UCSBDiningCommonsMenuItemIndexPage() {

  const currentUser = useCurrentUser();

  const { data: ucsbdiningcommonsmenuitem, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/ucsbdiningcommonsmenuitem/all"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/ucsbdiningcommonsmenuitem/all" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>UCSBDiningCommonsMenuItem</h1>
        <UCSBDiningCommonsMenuItemTable ucsbdiningcommonsmenuitem={ucsbdiningcommonsmenuitem} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}