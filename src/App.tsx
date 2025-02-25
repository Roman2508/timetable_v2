import React from 'react'
import { lazy } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes, useNavigate } from 'react-router-dom'

import './App.css'
import ThemeCustomization from './themes'
import Loadable from './components/Loadable'
import ScrollTop from './components/ScrollTop'
import MinimalLayout from './layout/MinimalLayout'
import MainLayout from './layout/MainLayout/MainLayout'
import NotFoundPage from './pages/ErrorPages/NotFoundPage'
import GradeBookPage from './pages/GradeBook/GradeBookPage'
import { TimetablePage } from './pages/Timetable/TimetablePage'
import AuthLogin from './pages/authentication/auth-forms/AuthLogin'
import ForbiddenErrorPage from './pages/ErrorPages/ForbiddenErrorPage'
import AuthRegister from './pages/authentication/auth-forms/AuthRegister'
import InternalServerErrorPage from './pages/ErrorPages/InternalServerErrorPage'
import AutomaticSchedulingPage from './pages/AutomaticScheduling/AutomaticSchedulingPage'
import { getLocalStorageToken, removeLocalStorageToken } from './utils/localStorageToken'
import { useAppDispatch } from './store/store'
import { clearUser } from './store/auth/authSlice'
import { authMe } from './store/auth/authAsyncActions'

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('./pages/dashboard')))

// render - sample page
const SamplePage = Loadable(lazy(() => import('./pages/extra-pages/SamplePage')))

const Color = Loadable(lazy(() => import('./pages/components-overview/Color')))
const Shadow = Loadable(lazy(() => import('./pages/components-overview/Shadow')))
const AntIcons = Loadable(lazy(() => import('./pages/components-overview/AntIcons')))
const Typography = Loadable(lazy(() => import('./pages/components-overview/Typography')))

// lazy loading pages
const LoadPage = Loadable(lazy(() => import('./pages/Load/LoadPage')))
const PlansPage = Loadable(lazy(() => import('./pages/Plans/PlansPage')))
const GroupsPage = Loadable(lazy(() => import('./pages/Groups/GroupsPage')))
const StreamsPage = Loadable(lazy(() => import('./pages/Streams/StreamsPage')))
const SettingsPage = Loadable(lazy(() => import('./pages/Settings/SettingsPage')))
const TeachersPage = Loadable(lazy(() => import('./pages/Teachers/TeachersPage')))
const FullPlanPage = Loadable(lazy(() => import('./pages/FullPlan/FullPlanPage')))
const FullGroupPage = Loadable(lazy(() => import('./pages/FullGroup/FullGroupPage')))
const AuditoriesPage = Loadable(lazy(() => import('./pages/Auditories/AuditoriesPage')))
const StudentsDivide = Loadable(lazy(() => import('./pages/StudentsDivide/StudentsDivide')))
const DistributionPage = Loadable(lazy(() => import('./pages/Distribution/DistributionPage')))
const StudentsAccounts = Loadable(lazy(() => import('./pages/StudentsAccounts/StudentsAccounts')))
const TeacherProfilePage = Loadable(lazy(() => import('./pages/TeacherProfile/TeacherProfilePage')))
const SchedulingСonstraints = Loadable(lazy(() => import('./pages/SchedulingСonstraints/SchedulingСonstraints')))
const TeachingLessonsControl = Loadable(lazy(() => import('./pages/TeachingLessonsControl/TeachingLessonsControl')))

const App = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  /* 
  export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}
  */

  React.useEffect(() => {
    const token = getLocalStorageToken()

    if (token) {
      const fetchData = async () => {
        const res = await dispatch(authMe(token))

        if (!res.payload) {
          removeLocalStorageToken()
          dispatch(clearUser())
        }
      }

      fetchData()
    }
  }, [])

  // if (user) navigate('/')

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
            <Route element={<TeachersPage />} path="/teachers" />
            <Route element={<AuditoriesPage />} path="/auditories" />

            <Route element={<LoadPage />} path="/load" />
            <Route element={<TeachingLessonsControl />} path="/controls" />

            <Route element={<DistributionPage />} path="/distribution" />
            <Route element={<StreamsPage />} path="/streams" />
            <Route element={<TimetablePage />} path="/timetable" />
            <Route element={<AutomaticSchedulingPage />} path="/automatic-scheduling" />
            <Route element={<SchedulingСonstraints />} path="/scheduling-constraints" />

            <Route element={<SettingsPage />} path="/settings" />

            <Route element={<DashboardDefault />} path="/test" />

            <Route element={<StudentsAccounts />} path="/students/accounts" />
            <Route element={<StudentsDivide />} path="/students/divide" />

            <Route element={<GradeBookPage />} path="/grade-book" />

            <Route element={<TeacherProfilePage />} path="/teacher/:id" />

            {/*  */}
            <Route element={<Color />} path="/color" />
            <Route element={<SamplePage />} path="/sample-page" />
            <Route element={<Shadow />} path="/shadow" />
            <Route element={<Typography />} path="/typography" />
            <Route element={<AntIcons />} path="/icons/ant" />
          </Route>

          <Route element={<MinimalLayout />}>
            <Route element={<AuthLogin />} path="/auth" />
            <Route element={<AuthRegister />} path="/register" />
          </Route>

          <Route element={<InternalServerErrorPage />} path="/500" />
          <Route element={<ForbiddenErrorPage />} path="/403" />
          <Route element={<NotFoundPage />} path="/404" />
          <Route element={<NotFoundPage />} path="*" />
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

// 2. Заміна викладача
// 3. Якщо у викладача стоїть заміна - треба заборонити ставити йому інші пари в той час
// 4. Не оновлюється заміна в store
// 5. Можливість ставити декілька елементів розкладу в один час, якщо це підгрупи або спец. групи
//    - МОЖЛИВІ НАКЛАДКИ АУДИТОРІЙ (ТРЕБА ЗРОБИТИ ПЕРЕВІРКУ ЧИ АУДИТОРІЯ ВІЛЬНА)
//    - МОЖЛИВІ НАКЛАДКИ ВИКЛАДАЧІВ
// 6. В один час можна ставити тільки підгрупи та спец.групи
// 7. Можливість закрити для викладача, групи або аудиторії певні дати
// 8. ?????????????????????????????????? При виборі аудиторії, при подвійному кліку з'являються зайняті аудиторії ??????????????????????????????????
// 10. ~При копіюванні підгруп, які стоять в один час вставлється лише 1 підгрупа 2 рази
// 11. ~Треба дозволити об'єднувати в потік групи в яких різні назви дисциплін, (при цьому години і семестр повинні бути однаковими???) години і семестр можуть відрізнятись
// 12. Авторизація в Google Calendar Error: listen EADDRINUSE: address already in use :::4000
// 13. Якщо в викладача вже був виставлений розклад і після цього прикріплюється google calendar id треба знайти
//     всі виставлені уроки і додати їх до календаря
// 14. Треба зробити можливість ставити в розклад (поза планом, тобто не йде в навантаження) практики або інші види діяльності ????
// 15. Перевірити як працює зміна року навчання
// 16. Накладки аудиторій при виставленні підгруп (можна поставити 2 пари в 1 аудиторію) - fix it
// 17. На розклад повинна висвічуватись кількість студентів в яких статус "Навчається"
// 18. Треба обробляти помилку 401 Unauthorized (перенаправляти на сторінку /auth)

// ========================================================
// ================== Електронний журнал ==================
// ========================================================
// 1. коли фокус з інпута пропадає треба порівнювати стару оцінку і нову і якщо є зміна треба оновлювати її в БД

// ========================================================
// ========================= all ==========================
// ========================================================
// 1. Можливо треба додати друк списку студентів групи
// 2. Можливо треба додати рейтинг здобувачів, який буде формуватись по електронному журналу
// 3. Треба зробити друк відомостей
// 4. Індивідуальні плани роботи викладача && Звіт викладача -------------------------------------------------------------------
// 5. При створенні викладачів треба додавати логін та пароль і перевіряти унікалькість логіна ---------------------------------
// 6. Поділ на підгрупи - need to disable all tabs if select "all lessons"
// 7. Сторінка "Розподіл навантаження" кнопки "прикріпити всі" і "відкріпити всі" працює тільки при подвійному кліку
// 8. Облікові записи. Має бути масове оновлення та видалення студентів
// 9. Сторінка "Розподіл навантаження" - можливість розподіляти на вакансію
// 10. Можливість сортування груп (за назвою, курсом або к-тю студентів) на сторінці http://localhost:5173/groups

// ========================================================
// ================== Поділ на підгрупи ===================
// ========================================================
// 1. Якщо додавати студента до дисципліни, яка об'єднана в потік - треба студента додавати до кожної групи потоку ???
// 2. Сортувати студентів по алфавіту в списку students divide
// 3. Перевірити чи створюється grades для всіх дисциплін (можливо треба до GradesEntity додати поле lesson)
// 4. При зміні кількості студентів в students divide треба змінювати к-ть студентів в scheduleLessons

// ========================================================
// ======================== Потоки ========================
// ========================================================
// 1. Якщо прикріплювати до дисципліни потоку викладача - треба щоб він прикріплювався одразу на всі дисципліни потоку
//    Скоріше за все не прикріплюється через те, що можуть бути різні назви дисциплін
// 2. Якщо група видаляється з потоку треба роз'єднати всі дисципліни цього потоку

// ========================================================
// =================== Teacher profile ====================
// ========================================================
// 1. InstructionalMaterialsTab.tsx рядок 83 - треба замість цифри 3 підставляти реальний ID
// 2. MyTeachingLoadTab.tsx         рядок 27 - треба замість цифри 3 підставляти реальний ID
// 3. Треба приховувати екзамени в фільтрі дисциплін бо екзамени не мають теми

// ========================================================
// ==================== Notification ======================
// ========================================================
// 1. Replace react-toastify to Sonner !!!!!!! Done. Need to check it !!!!!!!!!!!!

// ========================================================
// ================ Вибіркові дисципліни ==================
// ========================================================
// 1. Треба додати можливість вибору студентами вибіркових дисциплін
//    - Якщо група не набирається треба продумати перевибір студентами дисциплін
