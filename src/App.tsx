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

/* 
const lessons = [
  {
    id: 153,
    name: 'Анатомія та фізіологія людини',
    semester: 2,
    specialization: null,
    typeRu: 'ПЗ',
    typeEn: 'practical',
    hours: 24,
    subgroupNumber: null,
    students: 15,
    group: {
      id: 7,
      name: 'PH9-24-1',
    },
    planSubjectId: {
      id: 38,
    },
    stream: null,
    teacher: {
      id: 3,
      firstName: 'Name',
      middleName: 'Test',
      lastName: 'Teacher',
    },
  },
  {
    id: 147,
    name: 'Інформаційні технології в фармації',
    semester: 2,
    specialization: 'test',
    typeRu: 'ЛК',
    typeEn: 'lectures',
    hours: 12,
    subgroupNumber: 2,
    students: 25,
    group: {
      id: 7,
      name: 'PH9-24-1',
    },
    planSubjectId: {
      id: 21,
    },
    stream: null,
    teacher: {
      id: 1,
      firstName: 'Роман',
      middleName: 'Вікторович',
      lastName: 'Пташник',
    },
  },
  {
    id: 80,
    name: 'Інформаційні технології в фармації',
    semester: 2,
    specialization: 'test',
    typeRu: 'ЛК',
    typeEn: 'lectures',
    hours: 12,
    subgroupNumber: 1,
    students: 20,
    group: {
      id: 7,
      name: 'PH9-24-1',
    },
    planSubjectId: {
      id: 21,
    },
    stream: null,
    teacher: {
      id: 3,
      firstName: 'Name',
      middleName: 'Test',
      lastName: 'Teacher',
    },
  },
  {
    id: 81,
    name: 'Інформаційні технології в фармації',
    semester: 2,
    specialization: 'test',
    typeRu: 'ПЗ',
    typeEn: 'practical',
    hours: 18,
    subgroupNumber: null,
    students: 23,
    group: {
      id: 7,
      name: 'PH9-24-1',
    },
    planSubjectId: {
      id: 21,
    },
    stream: null,
    teacher: {
      id: 3,
      firstName: 'Name',
      middleName: 'Test',
      lastName: 'Teacher',
    },
  },
  {
    id: 162,
    name: 'Фармакогнозія',
    semester: 1,
    specialization: null,
    typeRu: 'ЛК',
    typeEn: 'lectures',
    hours: 4,
    subgroupNumber: null,
    students: 25,
    group: {
      id: 7,
      name: 'PH9-24-1',
    },
    planSubjectId: {
      id: 40,
    },
    stream: null,
    teacher: {
      id: 1,
      firstName: 'Роман',
      middleName: 'Вікторович',
      lastName: 'Пташник',
    },
  },
  {
    id: 163,
    name: 'Фармакогнозія',
    semester: 1,
    specialization: null,
    typeRu: 'ПЗ',
    typeEn: 'practical',
    hours: 24,
    subgroupNumber: null,
    students: 25,
    group: {
      id: 7,
      name: 'PH9-24-1',
    },
    planSubjectId: {
      id: 40,
    },
    stream: null,
    teacher: {
      id: 8,
      firstName: 'Middlename',
      middleName: 'Firstname',
      lastName: 'Lastname',
    },
  },
  {
    id: 154,
    name: 'Анатомія та фізіологія людини',
    semester: 2,
    specialization: null,
    typeRu: 'ЕКЗ',
    typeEn: 'exams',
    hours: 6,
    subgroupNumber: null,
    students: 25,
    group: {
      id: 7,
      name: 'PH9-24-1',
    },
    planSubjectId: {
      id: 38,
    },
    stream: {
      id: 1,
      name: 'stream-1',
    },
    teacher: {
      id: 8,
      firstName: 'Middlename',
      middleName: 'Firstname',
      lastName: 'Lastname',
    },
  },
  {
    id: 91,
    name: 'Ділова іноземна мова (B2)',
    semester: 1,
    specialization: null,
    typeRu: 'ПЗ',
    typeEn: 'practical',
    hours: 36,
    subgroupNumber: null,
    students: 25,
    group: {
      id: 7,
      name: 'PH9-24-1',
    },
    planSubjectId: {
      id: 36,
    },
    stream: {
      id: 1,
      name: 'stream-1',
    },
    teacher: {
      id: 14,
      firstName: 'John',
      middleName: 'Doe',
      lastName: 'Doe',
    },
  },
  {
    id: 156,
    name: 'Анатомія та фізіологія людини',
    semester: 2,
    specialization: null,
    typeRu: 'МЕТОД',
    typeEn: 'metodologicalGuidance',
    hours: 20,
    subgroupNumber: null,
    students: 25,
    group: {
      id: 7,
      name: 'PH9-24-1',
    },
    planSubjectId: {
      id: 38,
    },
    stream: null,
    teacher: {
      id: 1,
      firstName: 'Роман',
      middleName: 'Вікторович',
      lastName: 'Пташник',
    },
  },
  {
    id: 155,
    name: 'Анатомія та фізіологія людини',
    semester: 2,
    specialization: null,
    typeRu: 'КОНС',
    typeEn: 'examsConsulation',
    hours: 2,
    subgroupNumber: null,
    students: 25,
    group: {
      id: 7,
      name: 'PH9-24-1',
    },
    planSubjectId: {
      id: 38,
    },
    stream: null,
    teacher: {
      id: 1,
      firstName: 'Роман',
      middleName: 'Вікторович',
      lastName: 'Пташник',
    },
  },
  {
    id: 149,
    name: 'Ділова іноземна мова (B2)',
    semester: 1,
    specialization: null,
    typeRu: 'ЛАБ',
    typeEn: 'laboratory',
    hours: 18,
    subgroupNumber: null,
    students: 25,
    group: {
      id: 7,
      name: 'PH9-24-1',
    },
    planSubjectId: {
      id: 36,
    },
    stream: null,
    teacher: {
      id: 8,
      firstName: 'Middlename',
      middleName: 'Firstname',
      lastName: 'Lastname',
    },
  },
  {
    id: 152,
    name: 'Анатомія та фізіологія людини',
    semester: 2,
    specialization: null,
    typeRu: 'ЛК',
    typeEn: 'lectures',
    hours: 12,
    subgroupNumber: null,
    students: 25,
    group: {
      id: 7,
      name: 'PH9-24-1',
    },
    planSubjectId: {
      id: 38,
    },
    stream: null,
    teacher: {
      id: 1,
      firstName: 'Роман',
      middleName: 'Вікторович',
      lastName: 'Пташник',
    },
  },
  {
    id: 83,
    name: 'Інформатика',
    semester: 4,
    specialization: null,
    typeRu: 'ПЗ',
    typeEn: 'practical',
    hours: 60,
    subgroupNumber: null,
    students: 25,
    group: {
      id: 7,
      name: 'PH9-24-1',
    },
    planSubjectId: {
      id: 24,
    },
    stream: {
      id: 1,
      name: 'stream-1',
    },
    teacher: null,
  },
  {
    id: 82,
    name: 'Інформатика',
    semester: 3,
    specialization: null,
    typeRu: 'ПЗ',
    typeEn: 'practical',
    hours: 48,
    subgroupNumber: null,
    students: 25,
    group: {
      id: 7,
      name: 'PH9-24-1',
    },
    planSubjectId: {
      id: 23,
    },
    stream: null,
    teacher: null,
  },
];

const filtredLessons = lessons.filter(el => el.semester === 1);

const test = lessons => {
  return lessons;
};

console.log(test(filtredLessons));

const res = {
  lectures: { title: 'Лекції', students: [] },
  practical_1: { title: 'Практичні (п.1)', students: [] },
  practical_2: { title: 'Практичні (п.2)', students: [] },
  exams: { title: 'Екзамен', students: [] },
};

const a = {
  lectures: [],
  practical: [],
  practical_1: [],
  practical_2: [],
  practical_3: [],
  practical_4: [],
  laboratory: [],
  laboratory_1: [],
  laboratory_2: [],
  laboratory_3: [],
  laboratory_4: [],
  seminars: [],
  seminars_1: [],
  seminars_2: [],
  seminars_3: [],
  seminars_4: [],
  exams: [],
  examsConsulation: [],
};

*/
