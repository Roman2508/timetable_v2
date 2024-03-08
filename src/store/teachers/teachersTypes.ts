import { LoadingStatusTypes } from "../appTypes";

export type TeachersInitialState = {
  teachersCategories: TeachersCategoryType[] | null;
  loadingStatus: LoadingStatusTypes;
};

export type TeachersCategoryType = {
  id: number;
  name: string;
  teachers: TeachersType[];
};

export type TeachersType = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  category: { id: number; name: string };
};
