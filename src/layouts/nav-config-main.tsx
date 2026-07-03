import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const navData = [
  { title: 'Home', path: paths.home },
  { title: 'About', path: '#' },
  { title: 'Jakarta Clients', path: '#' },
  { title: 'Ai Project', path: '#' },
  { title: 'Article', path: paths.article.root },
  {
    title: 'Career',
    path: '#',
    children: [
      { title: 'Job Vacancy', path: '#' },
      { title: 'Internship', path: '#' },
    ],
  },
];
