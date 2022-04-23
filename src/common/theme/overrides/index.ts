//

import Button from './Button';
// import Backdrop from './Backdrop';
import Typography from './Typography';
import CssBaseline from './CssBaseline'
import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Button(theme),
    // Backdrop(theme),
    Typography(theme),
    CssBaseline(),
  );
}
