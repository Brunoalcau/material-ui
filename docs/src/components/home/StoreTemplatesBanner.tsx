import * as React from 'react';
import { styled, alpha, useTheme } from '@material-ui/core/styles';
import Box, { BoxProps } from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ROUTES from 'docs/src/route';
import LaunchRounded from '@material-ui/icons/LaunchRounded';
import Slide from 'docs/src/components/animation/Slide';
import FadeDelay from 'docs/src/components/animation/FadeDelay';

const ratio = 900 / 494;

const Image = styled('img')(({ theme }) => ({
  display: 'block',
  width: 200,
  height: 200 / ratio,
  [theme.breakpoints.up('sm')]: {
    width: 300,
    height: 300 / ratio,
  },
  [theme.breakpoints.up('md')]: {
    width: 450,
    height: 450 / ratio,
  },
  border: '6px solid',
  borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
  borderRadius: theme.shape.borderRadius,
  objectFit: 'cover',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0px 4px 20px rgba(0, 0, 0, 0.6)'
      : '0px 4px 20px rgba(61, 71, 82, 0.25)',
}));

const Anchor = styled('a')({
  display: 'inline-block',
  position: 'relative',
  transition: '0.3s',
  '&:hover, &:focus': {
    '& > div': {
      opacity: 1,
    },
  },
});

const linkMapping = {
  'minimal-dashboard': ROUTES.storeTemplateMinimalDashboard,
  theFront: ROUTES.storeTheFront,
  'material-app': ROUTES.storeTemplateMaterialApp,
  flexy: ROUTES.storeFlexy,
  berry: ROUTES.storeTemplateBerry,
  webbee: ROUTES.storeTemplateWebbee,
};
const brands = Object.keys(linkMapping) as Array<keyof typeof linkMapping>;

type TemplateBrand = typeof brands[number];

const StoreTemplateLink = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<{
    brand: TemplateBrand;
  }>
>(({ brand, ...props }, ref) => (
  <Anchor
    ref={ref}
    aria-label="Goto MUI store"
    href={linkMapping[brand]}
    target="_blank"
    {...props}
  >
    {props.children}
    <Box
      sx={{
        transition: '0.3s',
        borderRadius: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0,
        top: 0,
        left: 0,
        bgcolor: (theme) => alpha(theme.palette.primaryDark[500], 0.8),
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography fontWeight="bold">Go to store</Typography>
      <LaunchRounded fontSize="small" sx={{ ml: 1 }} />
    </Box>
  </Anchor>
));

const StoreTemplateImage = React.forwardRef<
  HTMLImageElement,
  { brand: TemplateBrand } & JSX.IntrinsicElements['img']
>(({ brand, ...props }, ref) => {
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  return (
    <Image
      ref={ref}
      src={`/static/branding/store-templates/template-${mode}${
        Object.keys(linkMapping).indexOf(brand) + 1
      }.jpeg`}
      alt=""
      {...props}
    />
  );
});

export const PrefetchStoreTemplateImages = () => {
  function makeImg(mode: string, num: number) {
    return {
      loading: 'lazy' as const,
      width: '900',
      height: '494',
      src: `/static/branding/store-templates/template-${mode}${num}.jpeg`,
    };
  }
  return (
    <Box
      sx={{
        width: 0,
        height: 0,
        position: 'fixed',
        zIndex: -1,
        top: -1000,
        '& > img': {
          position: 'absolute',
        },
      }}
    >
      {[...Array(6)].map((_, index) => (
        <React.Fragment key={index}>
          <img alt="" {...makeImg('light', index + 1)} />
          <img alt="" {...makeImg('dark', index + 1)} />
        </React.Fragment>
      ))}
    </Box>
  );
};

const defaultSlideDown = {
  '0%': {
    transform: 'translateY(-300px)',
  },
  '100%': {
    transform: 'translateY(-60px)',
  },
};
export function StoreTemplatesSet1({
  keyframes = defaultSlideDown,
  disableLink,
  ...props
}: { disableLink?: boolean; keyframes?: Record<string, object> } & BoxProps) {
  function renderTemplate(brand: TemplateBrand) {
    if (disableLink) {
      return <StoreTemplateImage brand={brand} />;
    }
    return (
      <StoreTemplateLink brand={brand}>
        <StoreTemplateImage brand={brand} />
      </StoreTemplateLink>
    );
  }
  return (
    <Slide animationName="template-slidedown" {...props} keyframes={keyframes}>
      <FadeDelay delay={400}>{renderTemplate(brands[4])}</FadeDelay>
      <FadeDelay delay={200}>{renderTemplate(brands[2])}</FadeDelay>
      <FadeDelay delay={0}>{renderTemplate(brands[0])}</FadeDelay>
    </Slide>
  );
}

const defaultSlideUp = {
  '0%': {
    transform: 'translateY(150px)',
  },
  '100%': {
    transform: 'translateY(-20px)',
  },
};
export function StoreTemplatesSet2({
  keyframes = defaultSlideUp,
  disableLink,
  ...props
}: { disableLink?: boolean; keyframes?: Record<string, object> } & BoxProps) {
  function renderTemplate(brand: TemplateBrand) {
    if (disableLink) {
      return <StoreTemplateImage brand={brand} />;
    }
    return (
      <StoreTemplateLink brand={brand}>
        <StoreTemplateImage brand={brand} />
      </StoreTemplateLink>
    );
  }
  return (
    <Slide animationName="template-slidedup" {...props} keyframes={keyframes}>
      <FadeDelay delay={100}>{renderTemplate(brands[1])}</FadeDelay>
      <FadeDelay delay={300}>{renderTemplate(brands[3])}</FadeDelay>
      <FadeDelay delay={500}>{renderTemplate(brands[5])}</FadeDelay>
    </Slide>
  );
}

export default function StoreTemplatesBanner() {
  return (
    <Box
      sx={{
        mx: { xs: -2, sm: -3, md: 0 },
        my: { md: -8 },
        perspective: '1000px',
        height: { xs: 300, sm: 360, md: 'calc(100% + 160px)' },
        overflow: 'hidden',
        position: 'relative',
        width: { xs: '100vw', md: '50vw' },
      }}
    >
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          background: (theme) =>
            `linear-gradient(to bottom, ${
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[900]
                : theme.palette.grey[50]
            } 0%, transparent 30%, transparent 70%, ${
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[900]
                : theme.palette.grey[50]
            } 100%)`,
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          top: 0,
          left: 0,
          width: 400,
          height: '150%',
          pointerEvents: 'none',
          background: (theme) =>
            `linear-gradient(to right, ${
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[900]
                : theme.palette.grey[50]
            }, transparent)`,
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          left: { xs: '45%', md: '40%' },
          position: 'absolute',
          display: 'flex',
          transform: 'translateX(-40%) rotateZ(-30deg) rotateX(8deg) rotateY(8deg)',
          transformOrigin: 'center center',
        }}
      >
        <StoreTemplatesSet1 />
        <StoreTemplatesSet2 sx={{ ml: { xs: 2, sm: 4, md: 8 } }} />
      </Box>
    </Box>
  );
}
