import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const pageLinks = [
  {
    subheader: 'Auth',
    items: [
      { title: 'Sign in', path: paths.centered.signIn },
      { title: 'Sign up', path: paths.centered.signUp },
      { title: 'Reset password', path: paths.resetPassword },
      { title: 'Update password', path: paths.updatePassword },
      { title: 'Verify', path: paths.verify },
    ],
  },
  {
    subheader: 'Common',
    items: [
      { title: 'Components', path: paths.components },
      { title: 'Blank', path: paths.blank },
      { title: 'Maintenance', path: paths.maintenance },
      { title: 'Coming soon', path: paths.comingsoon },
      { title: 'Support', path: paths.support },
      { title: '404 error', path: paths.page404 },
      { title: '500 error', path: paths.page500 },
    ],
  },
];

export const navData = [
  { title: 'Home', path: '/' },
  { title: 'Components', path: paths.components },
  { title: 'Blank', path: paths.blank },
  { title: 'Docs', path: paths.docs },
];
