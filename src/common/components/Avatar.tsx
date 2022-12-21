import { forwardRef, Ref } from 'react';
import MuiAvatar from '@mui/material/Avatar';
import { AvatarProps } from '@mui/material/Avatar';
import { SkinVariant, SkinStyleType } from 'common/styles/SkinStyle';
import styled from 'styled-components';

// ----------------------------------------------------------------------

export type IserAvatarProps = AvatarProps & SkinStyleType

const IserAvatar = styled(MuiAvatar)<IserAvatarProps>`
  ${SkinVariant}
`

const Avatar = forwardRef((props: IserAvatarProps, ref: Ref<any>) => {
  return <IserAvatar ref={ref} {...props} />
})


export default Avatar
