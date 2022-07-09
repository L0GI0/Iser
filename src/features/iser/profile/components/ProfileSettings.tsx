import React, { useState, Dispatch, SetStateAction } from "react";
import { Grid, Card } from "@mui/material";
import CardLabel from "common/components/CardLabel";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import FormInput from 'common/components/inputs/FormInput';
import IserTextInput from "common/components/inputs/IserTextInput";
import IserMenuItem from "common/components/IserMenuItem";
import ACCOUNT from '_mocks/account';
import { LANGS, Language } from "features/iser/dashboard/components/LanguagePopover";
import useResponsive from "common/utils/useResponsive";
import { useTranslation } from "react-i18next";
import { GENDERS } from './constants';

// ----------------------------------------------------------------------

const ProfileData = () => {

  const [birthDate, setBirthDate] = useState<string | null>(null)
  const [gender, setGender ] = useState<typeof GENDERS[number]>(ACCOUNT.gender)
  const [language, setLanguage] = useState()
  const isMobile = useResponsive('only', 'xs');

  const { t } = useTranslation('profile');

  const createChangeHandler = (setter: Dispatch<SetStateAction<any>>)=> {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value as string);
    };
  }     

  return (
    <Card>
      <CardLabel>{t('profile_settings.profile_form.label')}</CardLabel>
      <Grid container spacing={2
      }>
        <Grid xs={12 } sm={6} item>
          <FormInput label={t('profile_settings.profile_form.label_first_name')} >
            <IserTextInput placeholder={ACCOUNT.firstName}/>
          </FormInput>
        </Grid>
        <Grid xs={12 } sm={6} item>
          <FormInput label={t('profile_settings.profile_form.label_last_name')}>
            <IserTextInput placeholder={ACCOUNT.lastName}/>
          </FormInput>
        </Grid>
        <Grid xs={12 } sm={6} item>
          <FormInput label={t('profile_settings.profile_form.label_gender')}>
            <IserTextInput select value={gender} defaultValue={ACCOUNT.gender} onChange={createChangeHandler(setGender)}>
              { GENDERS.map((option: string, i: number) => (<IserMenuItem value={option} key={i} > { option } </IserMenuItem>)) }
            </IserTextInput>
          </FormInput>     
        </Grid>
        <Grid xs={12 } sm={6} item>
          <FormInput label={t('profile_settings.profile_form.label_birth_date')}>
            {isMobile ? 
            <DatePicker
              inputFormat="MM/dd/yyyy"
              value={birthDate}
              onChange={(value) => setBirthDate(value)}
              renderInput={(params) => <IserTextInput value={birthDate ?? ''}{...params} />}
             />  :
            <DesktopDatePicker
              inputFormat="MM/dd/yyyy"
              value={birthDate}
              onChange={(value) => setBirthDate(value)}
              renderInput={(params) => <IserTextInput value={birthDate ?? ''}{...params} />}
            />}
          </FormInput>
        </Grid>
        <Grid xs={12 } sm={6} item>
          <FormInput label={t('profile_settings.profile_form.label_location')}>
            <IserTextInput placeholder={ACCOUNT.location}/>
          </FormInput>
        </Grid>
        <Grid xs={12 } sm={6} item>
        <FormInput label={t('profile_settings.profile_form.label_language')}>
            <IserTextInput select value={language} onChange={createChangeHandler(setLanguage)}>
              { [LANGS.map((language: Language, i: number) => (<IserMenuItem value={language.label} key={i} > { language.label } </IserMenuItem>))]}
            </IserTextInput>
          </FormInput>
        </Grid>      
      </Grid>
    </Card>
  );
}

export default ProfileData;
