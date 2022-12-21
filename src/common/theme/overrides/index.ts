import Button from './Button';
import Typography from './Typography';
import Input from './Input';
import Paper from './Paper';
import CssBaseline from './CssBaseline';
import Card from './Card';
import Switch from './Switch';
import FormLabel from './FormLabel';
import MenuItem from './MenuItem';
import Table from './Table';
import Avatar from './Avatar';
import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Button(theme),
    Input(theme),
    Typography(theme),
    Card(theme),
    Switch(theme),
    FormLabel(theme),
    MenuItem(theme),
    Table(theme),
    Avatar(theme),
    Paper(),
    CssBaseline(),
  );
}
