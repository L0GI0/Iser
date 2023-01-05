import React from "react";
import styled from "styled-components";
import { BackdropProps } from "@mui/material";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { SkeletonProps } from '@mui/material/Skeleton';
import { CircularProgress } from 'material-ui-core'
import { LimitedBackdrop } from "./styledElements";

// ----------------------------------------------------------------------

const SpinBlur = styled.div<BackdropProps>`
  opacity: ${(props) => props.open ? '.3': '1'};
`
// ----------------------------------------------------------------------

const LoadingBackdrop: React.FC<BackdropProps & { Skeleton?: React.ReactElement<SkeletonProps>, onCancel?: () => any}> = ({open, children, Skeleton, onCancel, ...props}) => {
  return (
    <>
      {Skeleton && open ?
        Skeleton : 
        (<>
          <LimitedBackdrop open={open} {...props}>
            <Stack sx={{alignItems: 'center'}}>
              <CircularProgress />
              <br/>
              {onCancel && <Button variant="contained" onClick={onCancel}>Cancel</Button>}
            </Stack>
          </LimitedBackdrop>
          <SpinBlur open={open}>
              {children}
          </SpinBlur>
        </>)
      }
    </>
  );
};

export default LoadingBackdrop;
