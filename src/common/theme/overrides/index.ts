import Button from './Button';
import Typography from './Typography';
import Input from './Input';
import Paper from './Paper';
import CssBaseline from './CssBaseline'
import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Button(theme),
    Input(theme),
    Typography(theme),
    Paper(),
    CssBaseline(),
  );
}
