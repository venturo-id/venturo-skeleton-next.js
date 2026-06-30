import type { Metadata } from 'next';

import { _courses } from 'src/_mock';
import { CONFIG } from 'src/global-config';

import { ElearningCoursesView } from 'src/sections/_elearning/view/elearning-courses-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Course list | E-learning - ${CONFIG.appName}` };

export default function Page() {
  return <ElearningCoursesView courses={_courses} />;
}
