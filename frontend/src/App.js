import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import ProfilePage from "main/pages/ProfilePage";
import AdminUsersPage from "main/pages/AdminUsersPage";

import TodosIndexPage from "main/pages/Todos/TodosIndexPage";
import TodosCreatePage from "main/pages/Todos/TodosCreatePage";
import TodosEditPage from "main/pages/Todos/TodosEditPage";

import MenuItemReviewsIndexPage from "main/pages/MenuItemReviews/MenuItemReviewsIndexPage";

import HelpRequestsIndexPage from "main/pages/HelpRequests/HelpRequestsIndexPage";

import DiningCommonsIndexPage from "main/pages/DiningCommons/DiningCommonsIndexPage";
import DiningCommonsCreatePage from "main/pages/DiningCommons/DiningCommonsCreatePage";
import DiningCommonsEditPage from "main/pages/DiningCommons/DiningCommonsEditPage";

import UCSBDiningCommonsMenuItemIndexPage from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemIndexPage";
import UCSBDatesIndexPage from "main/pages/UCSBDates/UCSBDatesIndexPage";
import UCSBDatesCreatePage from "main/pages/UCSBDates/UCSBDatesCreatePage";
import UCSBDatesEditPage from "main/pages/UCSBDates/UCSBDatesEditPage";

import OrganizationIndexPage from "./main/pages/Organization/OrganizationIndexPage";

import ArticlesCreatePage from "main/pages/Articles/ArticlesIndexPage.js";
import ArticlesListPage from "main/pages/Articles/ArticlesIndexPage.js";


import { hasRole, useCurrentUser } from "main/utils/currentUser";

import "bootstrap/dist/css/bootstrap.css";


function App() {

  const { data: currentUser } = useCurrentUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        {
          hasRole(currentUser, "ROLE_ADMIN") && <Route exact path="/admin/users" element={<AdminUsersPage />} />
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/todos/list" element={<TodosIndexPage />} />
              <Route exact path="/todos/create" element={<TodosCreatePage />} />
              <Route exact path="/todos/edit/:todoId" element={<TodosEditPage />} />
              <Route exact path="/articles/list" element={<ArticlesListPage />} />
              <Route exact path="/articles/create" element={<ArticlesCreatePage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/helpRequests/list" element={<HelpRequestsIndexPage />} />
            </>
          )
        }

        {
                  hasRole(currentUser, "ROLE_USER") && (
                    <>
                      <Route exact path="/menuitemreview/list" element={<MenuItemReviewsIndexPage />} />
                    </>
                  )
        }

        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/diningCommons/list" element={<DiningCommonsIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/diningCommons/create" element={<DiningCommonsCreatePage />} />
              <Route exact path="/diningCommons/edit/:code" element={<DiningCommonsEditPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/ucsbdates/list" element={<UCSBDatesIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/organization/list" element={<OrganizationIndexPage />} />
            </>
          )
        }
         {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/ucsbdiningcommonsmenuitem/list" element={<UCSBDiningCommonsMenuItemIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/ucsbdates/create" element={<UCSBDatesCreatePage />} />
              <Route exact path="/ucsbdates/edit/:id" element={<UCSBDatesEditPage />} />
            </>
          )
        }

      </Routes>
    </BrowserRouter>
  );
}

export default App;
