import { alpha } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function getDirection(value = 'bottom') {
  return {
    top: 'to top',
    right: 'to right',
    bottom: 'to bottom',
    left: 'to left',
  }[value];
}

export function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

export default function stylesUtils(theme: Theme) {
  return {
    bgBlur: (props?: any) => {
      const color = props?.color || theme?.palette.background.default || '#000000';

      const blur = props?.blur || 6;
      const opacity = props?.opacity || 0.8;

      return {
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`, // Fix on Mobile
        backgroundColor: alpha(color, opacity),
      };
    },
    bgGradient: (props?: any) => {
      const direction = getDirection(props?.direction);
      const startColor = props?.startColor || `${alpha('#000000', 0)} 0%`;
      const endColor = props?.endColor || '#000000 75%';

      return {
        background: `linear-gradient(${direction}, ${startColor}, ${endColor});`,
      };
    },
  };
}
