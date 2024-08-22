import { lazy } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes } from 'react-router-dom'

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

          <Route element={<NotFoundPage />} path="/404" />
          <Route element={<ForbiddenErrorPage />} path="/403" />
          <Route element={<InternalServerErrorPage />} path="/500" />
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
//    і 2 рази відправляється http://localhost:7777/schedule-lessons/1/group/7 
// 2. Заміна викладача
// 3. Можливість ставити декілька елементів розкладу в один час, якщо це підгрупи або спец. групи
//    - МОЖЛИВІ НАКЛАДКИ АУДИТОРІЙ (ТРЕБА ЗРОБИТИ ПЕРЕВІРКУ ЧИ АУДИТОРІЯ ВІЛЬНА)
//    - МОЖЛИВІ НАКЛАДКИ ВИКЛАДАЧІВ
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
// 16. Треба дозволити об'єднувати в потік групи в яких різні назви дисциплін, при цьому години і семестр повинні бути однаковими
// 17. Якщо в викладача вже був виставлений розклад і після цього прикріплюється google calendar id треба знайти
//     всі виставлені уроки і додати їх до календаря
// 18. Треба зробити можливість ставити в розклад (поза планом, тобто не йде в навантаження) практики або інші види діяльності
// 19. Перевірити як працює зміна року навчання
// 20. Не оновлюється заміна в store

// ========================================================
// ================== Електронний журнал ==================
// ========================================================
// 3. Можливість вносити теми уроків
// 4. коли фокус з інпута пропадає треба порівнювати стару оцінку і нову і якщо є зміна треба оновлювати її в БД

// ========================================================
// ========================= all ==========================
// ========================================================
// 1. Можливо треба додати друк списку студентів групи
// 2. Можливо треба додати рейтинг здобувачів, який буде формуватись по електронному журналу
// 3. Треба зробити друк відомостей
// 4. Індивідуальні плани роботи викладача && Звіт викладача
// 5. При створенні викладачів треба додавати логін та пароль і перевіряти унікалькість логіна
// 6. Поділ на підгрупи - need to disable all tabs if select "all lessons"
// 7. Сторінка "Розподіл навантаження" кнопки "прикріпити всі" і "відкріпити всі" працює тільки при подвійному кліку
// 8. Облікові записи. Має бути масове оновлення та видалення студентів
// 9. Сторінка "Розподіл навантаження" - можливість розподіляти на вакансію

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
