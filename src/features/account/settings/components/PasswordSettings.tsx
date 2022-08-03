import { Typography, Stack, Button, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import LabeledCard from "common/components/Card/LabeledCard";
import IserTextInput from 'common/components/inputs/IserTextInput';
import FormInput from 'common/components/inputs/FormInput';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const PasswordRequirementsList = styled.ul`
  margin-left: 2em;
`

// ----------------------------------------------------------------------

const PasswordSettings: React.FC = () => {

  const { t } = useTranslation(['account', 'common'])

  return (
  <LabeledCard label={t('settings.password.label_password_settings')}>
      <Stack spacing={2}>
          <FormInput label={t('settings.password.label_old_password')} >
            <IserTextInput type={"password"}/>
          </FormInput>
          <FormInput label={t('settings.password.label_new_password')} >
            <IserTextInput type={"password"}/>
          </FormInput>
          <FormInput label={t('settings.password.label_confirm_password')} >
            <IserTextInput type={"password"}/>
          </FormInput>
        <Grid container alignItems="end" justifyContent="space-between">
          <Grid item xs={12} sm={7}>
            <Typography variant="h6">
              {t('settings.password.text_password_requirements')}
            </Typography>
            <Typography variant="body2">
              {t('settings.password.text_password_requirements_description')}
            </Typography>
            <Typography variant="caption">
              <PasswordRequirementsList>
                <li>{t('forms.fields.password.rule_msg.password_required', { ns: 'common'})}</li>
                <li>{t('forms.fields.password.rule_msg.password_invalid.at_least_one_digit', { ns: 'common'})}</li>
                <li>{t('forms.fields.password.rule_msg.password_invalid.at_least_one_upper_case', { ns: 'common'})}</li>
                <li>{t('forms.fields.password.rule_msg.password_invalid.at_least_one_lower_case', { ns: 'common'})}</li>
              </PasswordRequirementsList>
            </Typography>
          </Grid>
          <Grid item display="flex" justifyContent="flex-end" xs={12} sm={5}>
              <Button variant="contained" sx={{ marginTop: 4, marginBottom: 0}}>
                Change password
              </Button>
          </Grid>
        </Grid>
      </Stack>
  </LabeledCard>)

}

export default PasswordSettings;
