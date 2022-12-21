import { useState } from 'react';
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import LabeledCard from "common/components/Card/LabeledCard";
import Label from "common/components/Label";
import { Button, Stack, Typography } from '@mui/material';
import FormInput from 'common/components/inputs/FormInput';
import IserTextInput from "common/components/inputs/IserTextInput";
import IserMenuItem from "common/components/IserMenuItem";
import createChangeHandler from 'common/utils/createChangeHandler';
import { changeUserPermissions } from 'features/iser/store/iserSlice';
import { triggerNotification } from 'features/notifiers/store/notifiersSlice';
import { USER_TYPES } from 'features/account/contants';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const UsersTypesExplenation = styled.ul`
  margin-left: 2em;
`

// ----------------------------------------------------------------------

interface UserPermissionsProps {
  user: User,
  updateAccount: SetStateCallback<boolean>
}

const UserPermissions: React.FC<UserPermissionsProps> = ({user, updateAccount}) => {

  const dispatch = useDispatch();

  const { t } = useTranslation('users');

  const [selectedUserType, setSelectedUserType] = useState(() => {
    return user.userType;
  })

  const onPermissionsChange = async () => {
    dispatch(triggerNotification());
    await dispatch(changeUserPermissions({userId: user.userId, userType: selectedUserType}));
    updateAccount(true);
  }

  const permissionsDescription = 
  <UsersTypesExplenation>
    <li>{t('user_permissions.text_admin_role_info')}</li>
    <li>{t('user_permissions.text_user_role_info')}</li>
  </UsersTypesExplenation>

  return (
    <LabeledCard label={t('user_permissions.label_user_permissions')} description={permissionsDescription}>
        <Typography variant="subtitle1">  
        {t('user_permissions.text_current_user_type') + ' '}  
        <Label skinVariant='outlined' color={(user.userType === 'admin' && 'warning') || 'info'}>
          <Typography variant='button' >
            { user.userType }
          </Typography>
        </Label>
        </Typography>
      <Stack direction="row" alignItems="end" justifyContent="space-between" width={'100%'} spacing={2} mt={3}>
        <FormInput label={t('user_permissions.label_user_type_input')} sx={{width: 250}}>
          <IserTextInput select value={selectedUserType} defaultValue={user.userType} onChange={createChangeHandler(setSelectedUserType)}>
            { [USER_TYPES.map((userType: AccountType, i: number) => (
              <IserMenuItem value={userType} key={i}>
                <Typography textTransform="capitalize"> { userType } </Typography>
              </IserMenuItem>))]}
          </IserTextInput>
        </FormInput>
        <Button variant="outlined" color="warning" onClick={onPermissionsChange}>
            {t('user_permissions.button_change_user_permissions')}
        </Button>
      </Stack>
    </LabeledCard>
  )
}

export default UserPermissions;