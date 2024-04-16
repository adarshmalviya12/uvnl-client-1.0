import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Loader from "./components/Loader.jsx";

// Import components using lazy loading
const App = React.lazy(() => import("./App.jsx"));
const AdminLogin = React.lazy(() => import("./pages/AdminLogin.jsx"));
const AdminLayout = React.lazy(() => import("./layout/AdminLayout.jsx"));
const AdminProfile = React.lazy(() =>
  import("./components/admin/AdminProfile.jsx")
);
const AdminSettings = React.lazy(() =>
  import("./components/admin/AdminSettings.jsx")
);
const UserLayout = React.lazy(() => import("./layout/UserLayout.jsx"));
const UserLeadsTable = React.lazy(() =>
  import("./components/user/UserLeadsTable.jsx")
);
const AdminUserTable = React.lazy(() =>
  import("./components/admin/AdminUserTable.jsx")
);
const ViewLead = React.lazy(() => import("./components/user/ViewLead.jsx"));
const EditLead = React.lazy(() => import("./components/user/EditLead.jsx"));
const ViewOpportunites = React.lazy(() =>
  import("./components/user/ViewOpportunites.jsx")
);
const ViewOpportunity = React.lazy(() =>
  import("./components/user/ViewOpportunity.jsx")
);
const EditOpportunity = React.lazy(() =>
  import("./components/user/EditOpportunity.jsx")
);
const ViewUser = React.lazy(() => import("./components/admin/ViewUser.jsx"));
const EditUserDetails = React.lazy(() =>
  import("./components/admin/EditUserDetails.jsx")
);
const Category = React.lazy(() => import("./components/admin/Category.jsx"));
const Products = React.lazy(() => import("./components/admin/Products.jsx"));
const AdminDashboard = React.lazy(() =>
  import("./components/admin/AdminDashboard.jsx")
);
const Opportunity = React.lazy(() =>
  import("./components/admin/Opportunity.jsx")
);
const OpportunityViewAdmin = React.lazy(() =>
  import("./components/admin/OpportunityViewAdmin.jsx")
);
const OpportunityEditAdmin = React.lazy(() =>
  import("./components/admin/OpportunityEditAdmin.jsx")
);
const Kyc = React.lazy(() => import("./components/admin/kyc/Kyc.jsx"));
const UserDashboard = React.lazy(() =>
  import("./components/user/UserDashboard.jsx")
);
const LeadPage = React.lazy(() => import("./pages/LeadPage.jsx"));
const UserProfile = React.lazy(() =>
  import("./components/user/UserProfile.jsx")
);
const UserFollowup = React.lazy(() =>
  import("./components/user/UserFollowup.jsx")
);
const UserSettings = React.lazy(() =>
  import("./components/user/UserSettings.jsx")
);
const CategoryView = React.lazy(() =>
  import("./components/admin/CategoryView.jsx")
);
const CategoryEdit = React.lazy(() =>
  import("./components/admin/CategoryEdit.jsx")
);
const ProductView = React.lazy(() =>
  import("./components/admin/ProductView.jsx")
);
const ProductEdit = React.lazy(() =>
  import("./components/admin/ProductEdit.jsx")
);
const ForgotPassword = React.lazy(() =>
  import("./components/ForgotPassword.jsx")
);
const UserKycs = React.lazy(() => import("./components/user/UserKycs.jsx"));

import { AuthProvider } from "./context/AuthContext.jsx";
import { UsersProvider } from "./context/UsersContext.jsx";
import { LeadProvider } from "./context/LeadContext.jsx";
import { OpportunityProvider } from "./context/OpportunityContext.jsx";
import { KycProvider } from "./context/KycContext.jsx";
import KycView from "./components/user/KycView.jsx";
import AdminViewKyc from "./components/admin/kyc/AdminViewKyc.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import AdminMembers from "./components/admin/AdminMembers.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  // admin routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <AdminUserTable />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "category/:categoryId",
        element: <CategoryView />,
      },
      {
        path: "category/edit/:categoryId",
        element: <CategoryEdit />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:productId",
        element: <ProductView />,
      },
      {
        path: "product/edit/:productId",
        element: <ProductEdit />,
      },
      {
        path: "opportunities",
        element: <Opportunity />,
      },
      {
        path: "opportunity/:opportunityId",
        element: <OpportunityViewAdmin />,
      },
      {
        path: "opportunity",
        element: <ViewOpportunites />,
      },
      {
        path: "opportunity/edit/:opportunityId",
        element: <OpportunityEditAdmin />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },

      {
        path: "user/:userId",
        element: <ViewUser />,
      },
      {
        path: "user/edit/:userId",
        element: <EditUserDetails />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
      // kyc
      {
        path: "kyc",
        element: <Kyc />,
      },
      {
        path: "kyc/:kycId",
        element: <AdminViewKyc />,
      },
      {
        path: "opportunity",
        element: <ViewOpportunites />,
      },
      {
        path: "member",
        element: <AdminMembers />,
      },
    ],
  },
  //user routes
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "dashboard",
        element: <UserDashboard />,
      },
      {
        path: "leads",
        element: <LeadPage />,
      },
      {
        path: "lead/:leadId",
        element: <ViewLead />,
      },
      {
        path: "lead/edit/:leadId",
        element: <EditLead />,
      },
      {
        path: "opportunity/:opportunityId",
        element: <ViewOpportunity />,
      },
      {
        path: "opportunity",
        element: <ViewOpportunites />,
      },
      {
        path: "opportunity/edit/:opportunityId",
        element: <EditOpportunity />,
      },
      {
        path: "kyc",
        element: <UserKycs />,
      },
      {
        path: "kyc/:kycId",
        element: <KycView />,
      },
      {
        path: "userprofile",
        element: <UserProfile />,
      },
      {
        path: "userfollowup",
        element: <UserFollowup />,
      },
      {
        path: "usersettings",
        element: <UserSettings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UsersProvider>
        <LeadProvider>
          <OpportunityProvider>
            <KycProvider>
              <ProductProvider>
                <Suspense fallback={<Loader />}>
                  <RouterProvider router={router} />
                </Suspense>
              </ProductProvider>
            </KycProvider>
          </OpportunityProvider>
        </LeadProvider>
      </UsersProvider>
    </AuthProvider>
  </React.StrictMode>
);
