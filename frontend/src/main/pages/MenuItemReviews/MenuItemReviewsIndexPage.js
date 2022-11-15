import React from 'react'
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import MenuItemReviewsTable from 'main/components/MenuItemReviews/MenuItemReviewsTable';
import { useCurrentUser } from 'main/utils/currentUser' // use prefix indicates a React Hook

export default function MenuItemReviewsIndexPage() {

  const currentUser = useCurrentUser();

  const { data: menuitemreviews, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/MenuItemReview/all"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/MenuItemReview/all" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Menu Item Reviews</h1>
        <MenuItemReviewsTable menuitemreviews={menuitemreviews} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}