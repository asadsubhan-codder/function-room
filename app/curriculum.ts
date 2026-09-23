import data from "./curriculum.json";
export type Link = { label: string; url: string };
export type Video = {
  id: string;
  type: string;
  title: string;
  provider: string;
  url: string;
  note: string;
  duration?: string;
};
export type CourseLesson = {
  id: string;
  section: string;
  title: string;
  summary: string;
  focus: string[];
  pause: string;
  pitfall: string;
  videos: Video[];
  courseware: { title: string; url: string }[];
  practice: Link[];
  solutions: Link[];
};
export type CourseUnit = {
  id: number;
  title: string;
  description: string;
  prerequisites: string;
  lessons: CourseLesson[];
  review: Link[];
  readiness: string[];
  symbol: string;
  numbering: string;
};
export const course = data as CourseUnit[];
export const allLessons = course.flatMap((u) => u.lessons);
export const lessonById = Object.fromEntries(allLessons.map((l) => [l.id, l]));
export const unitFor = (id: string) =>
  course.find((u) => u.lessons.some((l) => l.id === id))!;
export const VERSION = "2026.09.22";
