import { useState } from 'react';
import { useDispatch } from "react-redux";
import LabeledCard from "common/components/Card/LabeledCard";
import SwitchInput from 'common/components/inputs/SwitchInput';
import { Button, Stack, Typography } from '@mui/material';
import { deleteUser } from 'features/iser/store/iserSlice';
import { triggerNotification } from 'features/notifiers/store/notifiersSlice';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

interface DeleteUserProps {
  user: User,
  updateAccount: SetStateCallback<boolean>
}

const DeleteUser: React.FC<DeleteUserProps> = ({user, updateAccount}) => {

  const dispatch = useDispatch();

  const { t } = useTranslation('users');

   const [isUserDeletetionConfirmed, setIsUserDeletetionConfirmed] = useState(false);

  const onDeleteUser = async () => {
    dispatch(triggerNotification())
    dispatch(deleteUser({userId: user.userId}))
    updateAccount(true);
  }

  const confirmSwitchLabel =
    <>
      <Typography fontWeight={900}>
        {t('user_delete.switch_confirm_user_delete')}
      </Typography>
      <Typography color={'text.secondary'} variant="responsiveCaption">
        {t('user_delete.switch_confirm_user_delete_description')}
      </Typography>
    </>

  return (
    <LabeledCard label={t('user_delete.user_delete_label')} description={t('user_delete.text_user_delete_info')}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" width={'100%'} spacing={2}>
        <SwitchInput
            text={confirmSwitchLabel}
            checked={isUserDeletetionConfirmed}
            onChange={() => setIsUserDeletetionConfirmed(!isUserDeletetionConfirmed)}/>
        <Button variant="outlined" color="error" disabled={!isUserDeletetionConfirmed} onClick={onDeleteUser}>
          {t('user_delete.button_unban_user')}
        </Button>
      </Stack>
    </LabeledCard>
  )
}

export default DeleteUser;