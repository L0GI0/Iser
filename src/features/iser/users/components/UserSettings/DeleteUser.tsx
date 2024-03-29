import { useState } from 'react';
import { useDispatch } from "react-redux";
import LabeledCard from "common/components/Card/LabeledCard";
import SwitchInput from 'common/components/inputs/SwitchInput';
import { Button, Stack, Typography } from '@mui/material';
import { deleteUser, fetchUser } from 'features/iser/store/iserSlice';
import { triggerNotification } from 'features/notifiers/store/notifiersSlice';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

interface DeleteUserProps {
  user: User,
}

const DeleteUser: React.FC<DeleteUserProps> = ({ user }) => {

  const dispatch = useDispatch();

  const { t } = useTranslation('users');

   const [isUserDeletetionConfirmed, setIsUserDeletetionConfirmed] = useState(false);

  const onDeleteUser = async () => {
    dispatch(triggerNotification())
    await dispatch(deleteUser({userId: user.userId}))
    dispatch(fetchUser({userId: user.userId}))
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
    <LabeledCard title={t('user_delete.user_delete_label')} subheader={t('user_delete.text_user_delete_info')}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" width={'100%'} spacing={2}>
        <SwitchInput
            text={confirmSwitchLabel}
            checked={isUserDeletetionConfirmed}
            onChange={() => setIsUserDeletetionConfirmed(!isUserDeletetionConfirmed)}
            />
        <Button variant="outlined" color="error" disabled={!isUserDeletetionConfirmed} onClick={onDeleteUser}>
          {t('user_delete.button_unban_user')}
        </Button>
      </Stack>
    </LabeledCard>
  )
}

export default DeleteUser;