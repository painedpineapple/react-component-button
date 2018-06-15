import styled, { keyframes } from 'react-emotion'
import { Link as ReactRouterLink } from 'react-static'

export const A = styled('a')(props => ({
  ...buttonProps(props),
}))

export const Link = styled(ReactRouterLink)(props => ({
  ...buttonProps(props),
}))

export const Button = styled('button')(props => ({
  ...buttonProps(props),
}))

export const Input = styled('input')(props => ({
  ...buttonProps(props),
}))

const buttonProps = ({ options: o }) => ({
  textDecoration: 'none',
  borderColor: `rgb(${o.baseColor})`,
  cursor: 'pointer',

  ...colorProps(o),
  ...hoverProps(o),

  ...o.styles,
})

function colorProps(o) {
  if (o.inverse) {
    switch (o.inverseStyle) {
      case 'transparent':
        return {
          backgroundColor: 'rgba(255,255,255,0)',
          color: `rgb(${o.baseColor})`,
        }
      case 'default':
      default:
        return {
          backgroundColor: `rgb(${o.textColor})`,
          color: `rgb(${o.baseColor})`,
        }
    }
  } else {
    return {
      backgroundColor: `rgb(${o.baseColor})`,
      color: `rgb(${o.textColor})`,
    }
  }
}

const rippleOut = keyframes({
  '100%': {
    top: -12,
    right: -12,
    bottom: -12,
    left: -12,
    opacity: 0,
  },
})

function hoverProps(o) {
  switch (o.hoverEffect) {
    case 'ripple':
      return {
        transformOrigin: 'center',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          border: '1px solid',
          borderRadius: 'inherit',
          borderColor: 'inherit',
          top: -1,
          right: -1,
          bottom: -1,
          left: -1,
        },
        '&:hover,&:focus': {
          textDecoration: 'none',
          color: `rgb(${o.textColor})`,
          backgroundColor: `rgb(${o.baseColor})`,
          '&::after': {
            animation: `${rippleOut} 0.5s`,
          },
        },
      }
    case 'default':
    default:
      return {
        '&:hover,&:focus': {
          textDecoration: 'none',
          backgroundColor: `rgb(${o.inverse ? o.baseColor : o.hoverBaseColor})`,
          borderColor: `rgb(${o.inverse ? o.baseColor : o.hoverBaseColor})`,
          color: `rgb(${o.textColor})`,
        },
      }
  }
}
