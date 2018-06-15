// @flow
import * as React from 'react'
//
import { A, Link, Button as ButtonStyled, Input } from './index.style'

export default function Button(props: {
  children: React.Node,
  options: {
    link?: string,
    tagType: 'Link' | 'a' | 'button' | 'input',
    inputType?: string,
    baseColor: string,
    textColor: string,
    inverse?: boolean,
    inverseStyle?: 'default' | 'transparent',
    hoverEffect?: 'default' | 'ripple',
    hoverDefaultBaseColor: string,
    styles?: {}, // Emotion style object
  },
}) {
  const defaults = {
    hoverEffect: 'default', //default, ripple
    inverse: false,
    inverseStyle: 'default',
  }

  let {
    options: { link, tagType, inputType, ...options },
    children,
    ...remainingProps
  } = props

  tagType = tagType || 'Link'

  if (tagType === 'input' && !inputType) inputType = 'submit'

  const buttonProps = {
    ...remainingProps,
    options: {
      ...defaults,
      ...options,
    },
    ['data-testid']: 'component-button',
  }

  switch (tagType) {
    case 'a':
      return (
        <A {...buttonProps} href={link}>
          {children}
        </A>
      )
    case 'button':
      return <ButtonStyled {...buttonProps}>{children}</ButtonStyled>
    case 'input':
      return (
        <Input {...buttonProps} type={inputType}>
          {children}
        </Input>
      )
    case 'Link':
    default:
      return (
        <Link {...buttonProps} to={link}>
          {children}
        </Link>
      )
  }
}
