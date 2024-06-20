import { lazy } from 'react'
import Loadable from './components/Loadable'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import ThemeCustomization from './themes'
import MainLayout from './layout/MainLayout'
import ScrollTop from './components/ScrollTop'
import 'react-toastify/dist/ReactToastify.css'
import MinimalLayout from './layout/MinimalLayout'
import { PlansPage } from './pages/Plans/PlansPage'
import { GroupsPage } from './pages/Groups/GroupsPage'
import { StreamsPage } from './pages/Streams/StreamsPage'
import FullGroupPage from './pages/FullGroup/FullGroupPage'
import { FullPlanPage } from './pages/FullPlan/FullPlanPage'
import { TeachersPage } from './pages/Teachers/TeachersPage'
import { SettingsPage } from './pages/Settings/SettingsPage'
import { TimetablePage } from './pages/Timetable/TimetablePage'
import { AuditoriesPage } from './pages/Auditories/AuditoriesPage'
import AuthLogin from './pages/authentication/auth-forms/AuthLogin'
import { StudentsDivide } from './pages/StudentsDivide/StudentsDivide'
import { DistributionPage } from './pages/Distribution/DistributionPage'
import AuthRegister from './pages/authentication/auth-forms/AuthRegister'
import { StudentsAccounts } from './pages/StudentsAccounts/StudentsAccounts'
import GradeBookPage from './pages/GradeBook/GradeBookPage'

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('./pages/dashboard')))

// render - sample page
const SamplePage = Loadable(lazy(() => import('./pages/extra-pages/SamplePage')))

const Color = Loadable(lazy(() => import('./pages/components-overview/Color')))
const Shadow = Loadable(lazy(() => import('./pages/components-overview/Shadow')))
const AntIcons = Loadable(lazy(() => import('./pages/components-overview/AntIcons')))
const Typography = Loadable(lazy(() => import('./pages/components-overview/Typography')))

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

            <Route element={<SettingsPage />} path="/settings" />

            <Route element={<DashboardDefault />} path="/test" />

            <Route element={<StudentsAccounts />} path="/students/accounts" />
            <Route element={<StudentsDivide />} path="/students/divide" />

            <Route element={<GradeBookPage />} path="/grade-book" />

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

// TODO:
// =============================================
// ================== Розклад ==================
// =============================================
// 1. При зміні selectedItemId <Calendar /> 2 рази підвантажується
// 2. Заміна викладача
// 3. Можливість ставити декілька елементів розкладу в один час, якщо це підгрупи або спец. групи
//    - МОЖЛИВІ НАКЛАДКИ АУДИТОРІЙ (ТРЕБА ЗРОБИТИ ПЕРЕВІРКУ ЧИ АУДИТОРІЯ ВІЛЬНА)
//    - МОЖЛИВІ НАКЛАДКИ ВИКЛАДАЧІВ
// 4. Кнопка "Сьогодні" в <Calendar />
// 5. Можливість закрити для викладача, групи або аудиторії певні дати
// 6. Не оновлюється auditory overlay коли вибирати дисципліну не з таблиці а з календаря (date slot) ???
// 7. При виборі аудиторії, при подвійному кліку з'являються зайняті аудиторії ???
// 8. При зміні типу розкладу треба очищати teachers overlay
// 9. Екз.конс. треба дозволити ставити в розклад
// 10. Не правильно видаляються з redux store ел.розкладу які поділені на підгрупи
// 11. При копіюванні підгруп, які стоять в один час вставлється лише 1 підгрупа 2 рази
// 12. Якщо у викладача стоїть заміна - треба заборонити ставити йому інші пари в той час
// 13. При зміні типу розкладу (group | teacher | auditory) треба очищати overlay
// 14. При зміні групи в розкладі треба очищати список всіх виставлених уроків
// 15. Якщо в списку спец.груп вибрано, що дисципліна не читається - треба приховати її в schedule-lessons
// 16. Треба дозволити об'єднувати в потік групи в яких різні назви дисциплін, при цьому години повинні бути однаковими
// 17. Якщо в викладача вже був виставлений розклад і після цього прикріплюється google calendar id треба знайти
//     всі виставлені уроки і додати їх до календаря

// ========================================================
// ================== Електронний журнал ==================
// ========================================================
// 1. Треба добавити можливість ділити уроки на модулі, окремо додати колонку для модульного контролю
// 2. Треба рахувати середній бал по модулям і по всій дисципліні (окремо по студентам)
