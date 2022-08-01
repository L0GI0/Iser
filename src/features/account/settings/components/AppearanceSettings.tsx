import React from 'react';
import { Grid, Box, Card, Typography } from '@mui/material';
import Iconify from "common/components/Iconify";
import styled from 'styled-components';
import { RootState } from 'rootStore/rootReducer';
import LabeledCard from 'common/components/Card/LabeledCard';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeMode } from 'features/account/store/accountSlice'
import Label from '../components/Label';

// ----------------------------------------------------------------------

interface ThemeOptionProps {
  selected?: boolean,
  caption: React.ReactNode,
  description: React.ReactNode,
  onThemeSelect?: () => void
}

const ThemeOptionCard = styled(Card)<Pick<ThemeOptionProps, 'selected'>>(({ theme, selected }) => ({
  ...(!selected && { cursor: 'pointer' }),
  padding: 0,
  border: `${selected ? theme.borders.action.selected : theme.borders.default}`,
  height: '100%',
  borderTopRightRadius: theme.borders.borderRadius.xxl,
  borderTopLeftRadius: theme.borders.borderRadius.xxl
}))

const ThemeOptionHeader = styled(Box)<Pick<ThemeOptionProps, 'selected'>>(({ theme, selected}) => ({
  background: `${selected ? theme.palette.action.selected : theme.palette.grey[500_12]}`,
  border: `${selected ? theme.borders.action.selected : theme.borders.default}`,
  display: 'flex',
  width: '100%',
  height: '20%',
  padding: theme.spacing(1),
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: theme.borders.borderRadius.xxl,
}))

const ThemeOptionBody = styled(Box)(({ theme}) => ({
  border: theme.borders.default,
  height: '100%',
  margin: theme.spacing(2),
  borderRadius: theme.borders.borderRadius.md,
}))

const ThemeOptionCaption = styled(Typography).attrs({ variant: 'subtitle1' })`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ThemeOptionImage = styled.img(({ theme }) => ({
  width: '100%',
  borderTopRightRadius: theme.borders.borderRadius.md,
  borderTopLeftRadius: theme.borders.borderRadius.md
}))

// -----------------------------------------------------------------------

const ThemeOption: React.FC<ThemeOptionProps> = ({ selected, caption, description, onThemeSelect}) => {
  return (
  <ThemeOptionCard selected={selected} onClick={onThemeSelect}>
    <ThemeOptionHeader selected={selected}>
    <ThemeOptionCaption>
      { caption }
    </ThemeOptionCaption>
      {selected && <Label color="active" variant="outlined"> Active </Label>}
    </ThemeOptionHeader>
    <ThemeOptionBody>
      { description }
    </ThemeOptionBody>
  </ThemeOptionCard>
  )
}

ThemeOption.defaultProps= {
  selected: false,
  onThemeSelect: () => {}
}

const AppearanceSettings: React.FC = () => {

  const dispatch = useDispatch();

  const { themeMode } = useSelector((state: RootState) => state.accountReducer)

  return (
    <LabeledCard label={"Appearance"}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ThemeOption
          selected={themeMode === 'light'}
          caption={
            <>
              <Iconify icon="carbon:light" sx={{ marginRight: 1}}/>
              Day theme
            </>}
          description={
            <>
              <ThemeOptionImage src="/static/illustrations/iser-light-mode.svg" alt="light-mode"/>
              <Typography variant="subtitle1" style={{ margin: 10 }}>
                Light hight contrast
              </Typography>
            </>}
            onThemeSelect={() => dispatch(setThemeMode('light'))}
            />
        </Grid>
        <Grid item xs={6}>
        <ThemeOption
          selected={themeMode === 'dark'}
          caption={
            <>
              <Iconify icon="bytesize:moon" sx={{ marginRight: 1}}/>
              Nigh theme
            </>}
          description={
            <>
              <ThemeOptionImage src="/static/illustrations/iser-dark-mode.svg" alt="light-mode" />
              <Typography variant="subtitle1" style={{ margin: 10 }}>
                Dark default
              </Typography>
            </>}
            onThemeSelect={() => dispatch(setThemeMode('dark'))}
            />
        </Grid>
      </Grid>
    </LabeledCard>
    )
}

export default AppearanceSettings;