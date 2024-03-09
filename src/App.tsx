import { lazy } from "react"
import Loadable from "./components/Loadable"
import { Route, Routes } from "react-router-dom"

import "./App.css"
import ThemeCustomization from "./themes"
import MainLayout from "./layout/MainLayout"
import ScrollTop from "./components/ScrollTop"
import "react-toastify/dist/ReactToastify.css"
import MinimalLayout from "./layout/MinimalLayout"
import { PlansPage } from "./pages/Plans/PlansPage"
import { TimetablePage } from "./pages/TimetablePage"
import { GroupsPage } from "./pages/Groups/GroupsPage"
import { StreamsPage } from "./pages/Streams/StreamsPage"
import FullGroupPage from "./pages/FullGroup/FullGroupPage"
import { FullPlanPage } from "./pages/FullPlan/FullPlanPage"
import { TeachersPage } from "./pages/Teachers/TeachersPage"
import { AuditoriesPage } from "./pages/Auditories/AuditoriesPage"
import AuthLogin from "./pages/authentication/auth-forms/AuthLogin"
import { DistributionPage } from "./pages/Distribution/DistributionPage"
import AuthRegister from "./pages/authentication/auth-forms/AuthRegister"

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import("./pages/dashboard")))

// render - sample page
const SamplePage = Loadable(lazy(() => import("./pages/extra-pages/SamplePage")))

const Color = Loadable(lazy(() => import("./pages/components-overview/Color")))
const Shadow = Loadable(lazy(() => import("./pages/components-overview/Shadow")))
const AntIcons = Loadable(lazy(() => import("./pages/components-overview/AntIcons")))
const Typography = Loadable(lazy(() => import("./pages/components-overview/Typography")))

const App = () => {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<GroupsPage />} path="/" />
            <Route element={<GroupsPage />} path="/groups" />
            <Route element={<FullGroupPage />} path="/groups/:id" />
            <Route element={<FullGroupPage />} path="/groups/create/:categoryId" />

            <Route element={<PlansPage />} path="/plans" />
            <Route element={<FullPlanPage />} path="/plans/:id" />
            <Route element={<AuditoriesPage />} path="/auditories" />
            <Route element={<TeachersPage />} path="/teachers" />
            <Route element={<DistributionPage />} path="/distribution" />
            <Route element={<StreamsPage />} path="/streams" />
            <Route element={<TimetablePage />} path="/timetable" />

            <Route element={<DashboardDefault />} path="/test" />

            {/*  */}
            <Route element={<Color />} path="/color" />
            <Route element={<SamplePage />} path="/sample-page" />
            <Route element={<Shadow />} path="/shadow" />
            <Route element={<Typography />} path="/typography" />
            <Route element={<AntIcons />} path="/icons/ant" />
          </Route>

          <Route element={<MinimalLayout />}>
            <Route element={<AuthLogin />} path="/login" />
            <Route element={<AuthRegister />} path="/register" />
          </Route>
        </Routes>
      </ScrollTop>
    </ThemeCustomization>
  )
}

export default App
