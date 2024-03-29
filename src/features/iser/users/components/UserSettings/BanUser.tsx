import { useDispatch } from "react-redux";
import LabeledCard from "common/components/Card/LabeledCard";
import Label from "common/components/Label";
import { Button, Stack, Typography } from '@mui/material';
import { banUser, unbanUser, fetchUser } from 'features/iser/store/iserSlice';
import { triggerNotification } from 'features/notifiers/store/notifiersSlice';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

interface BanUserProps {
  user: User,
}

const BanUser: React.FC<BanUserProps> = ({ user }) => {

  const dispatch = useDispatch();

  const { t } = useTranslation('users');

  const onBanUser = async () => {
    dispatch(triggerNotification())
    await dispatch(banUser({userId: user.userId}));
    dispatch(fetchUser({userId: user.userId}))
    
  }

  const onUnbanUser = async () => {
    dispatch(triggerNotification())
    await dispatch(unbanUser({userId: user.userId}));
    dispatch(fetchUser({userId: user.userId}))
  }

  return (
    <LabeledCard title={t('user_ban.user_ban_label')} subheader={t('user_ban.text_user_ban_info')}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" width={'100%'} spacing={2}>
        <Typography variant="subtitle1">  
        {t('user_ban.text_current_user_status') + ' '}  
        <Label skinVariant='filled' color={(user.userStatus === 'banned' && 'error') || 'success'}>
          <Typography variant='button' >
            { user.userStatus }
          </Typography>
        </Label>
        </Typography> 
        {
        user.userStatus === 'active' ?
          (<Button variant="contained" color="error" onClick={onBanUser}>
            {t('user_ban.button_ban_user')}
          </Button>) :
          (<Button variant="contained" color="success" onClick={onUnbanUser}>
            {t('user_ban.button_unban_user')}
          </Button>) 
        }
      </Stack>
    </LabeledCard>
  )
}

export default BanUser;