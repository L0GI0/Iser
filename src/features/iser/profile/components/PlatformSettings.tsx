import { useState } from "react";
import { Card, Box, Typography } from "@mui/material";
import CardLabel from 'common/components/CardLabel';
import SwitchInput from 'common/components/inputs/SwitchInput';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

function PlatformSettings() {
  const [takesMyCourse, setTakesMyCourse] = useState(true);
  const [commentsNotification, setCommentsNotification] = useState(false);
  const [courseRatingNotification, setcourseRatingNotification] = useState(true);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  const { t } = useTranslation('profile');

  return (
    <Card>
      <CardLabel>
        { t('platfrom_settings.platform_settings_form.label')}
      </CardLabel>
        <Typography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          { t('platfrom_settings.platform_settings_form.account_notification_settings.label')}
        </Typography>
        <SwitchInput
          text={t('platfrom_settings.platform_settings_form.account_notification_settings.switch_course_enrolled')}
          checked={takesMyCourse}
          onChange={() => setTakesMyCourse(!takesMyCourse)}
        />
        <SwitchInput
          text={t('platfrom_settings.platform_settings_form.account_notification_settings.switch_course_commented')}
          checked={commentsNotification}
          onChange={() => setCommentsNotification(!commentsNotification)}
        />
        <SwitchInput
          text={t('platfrom_settings.platform_settings_form.account_notification_settings.switch_course_rated')}
          checked={courseRatingNotification}
          onChange={() => setcourseRatingNotification(!courseRatingNotification)}
        />
        <Box mt={4}>
          <Typography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
            application
            { t('platfrom_settings.platform_settings_form.application_notification_settings.label')}
          </Typography>
        </Box>
        <SwitchInput
          text={t('platfrom_settings.platform_settings_form.application_notification_settings.switch_new_launches_and_courses')}
          checked={newLaunches}
          onChange={() => setNewLaunches(!newLaunches)}
        />
        <SwitchInput
          text={t('platfrom_settings.platform_settings_form.application_notification_settings.switch_product_updates')}
          checked={productUpdate}
          onChange={() => setProductUpdate(!productUpdate)}
        />
        <SwitchInput
          text={t('platfrom_settings.platform_settings_form.application_notification_settings.switch_newsletter')}
          checked={newsletter}
          onChange={() => setNewsletter(!newsletter)}
        />
    </Card>
  );
}

export default PlatformSettings;
