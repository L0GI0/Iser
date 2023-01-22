import { PropsWithChildren } from 'react';
import {
  Tooltip,
  TooltipProps
} from '@mui/material';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from "rootStore/rootReducer";
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export const AuthorisedFeatureContainer = styled.div<{ disabled: boolean }>(({ disabled }) => ({
  transition: 'all 100ms linear',
  ...(disabled && {
    opacity: '0.3',
    pointerEvents: 'none',
    userSelect: 'none',
    tabIndex: -1,
    'aria-hidden': 'true',
  })
}))

// ----------------------------------------------------------------------

interface AuthorisedProps {
  as?:  React.ElementType | keyof JSX.IntrinsicElements;
  authorisedUserTypes?: AccountType[],
  tooltipSettings?: Partial<Omit<TooltipProps, 'children'>>,
}

const AuthorisedFeature: React.FC<PropsWithChildren<AuthorisedProps>> = ({ as="div", authorisedUserTypes=['admin'], tooltipSettings={}, children }) => {

  const { t } = useTranslation('common');

  const { userType } = useSelector((state: RootState) => state.accountReducer.user);

  const featureUnauthorised: boolean = !authorisedUserTypes.includes(userType);

  return (
    featureUnauthorised ? (
      <Tooltip {...tooltipSettings} title={tooltipSettings.title ?? t('tooltip_feature_unauthorised')}>
        <span>
         <AuthorisedFeatureContainer disabled={featureUnauthorised} as={as}>
            { children }
         </AuthorisedFeatureContainer>
        </span>
      </Tooltip>
    ) : <> { children } </>
  )
}

export default AuthorisedFeature;