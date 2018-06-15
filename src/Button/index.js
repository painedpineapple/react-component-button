// @flow
import * as React from 'react'
//
import { A, Link, Button as ButtonStyled, Input } from './index.style'
import { readUploadedFileAsText } from './utils'

type tState = {
  renderProps: {},
}

type tProps = {
  children: React.Node,
  renderProps?: ({}) => any,
  options: {
    link?: string,
    tagType: 'Link' | 'a' | 'button' | 'input',
    baseColor: string,
    textColor: string,
    inverse?: boolean,
    inverseStyle?: 'default' | 'transparent',
    hoverEffect?: 'default' | 'ripple',
    hoverDefaultBaseColor: string,
    inputAttrs?: {},
    styles?: {}, // Emotion style object
  },
}
export default class Button extends React.Component<tProps, tState> {
  defaults = {}
  state = {
    renderProps: {},
  }
  handleInputChange = async (event: any) => {
    const eventProps = {
      event: event,
      value: event.target.value,
      fileContents: undefined,
    }
    if (event.target.files.length) {
      try {
        eventProps.fileContents = await readUploadedFileAsText(
          event.target.files[0],
        )
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e.message)
      }
    }
    this.setState(prevState => ({
      ...prevState,
      renderProps: {
        ...prevState.renderProps,
        ...eventProps,
      },
    }))
  }
  constructor(props: tProps) {
    super(props)

    this.defaults = {
      hoverEffect: 'default',
      inverse: false,
      inverseStyle: 'default',
    }
  }
  render() {
    let {
      options: { link, tagType, inputAttrs, ...options },
      renderProps,
      children,
      ...remainingProps
    } = this.props

    tagType = tagType || 'Link'

    const buttonProps = {
      ...remainingProps,
      options: {
        ...this.defaults,
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
          <Input {...buttonProps}>
            {renderProps && this.state.renderProps.event
              ? renderProps(this.state.renderProps)
              : null}
            <input onChange={this.handleInputChange} {...inputAttrs} />
            <span>{children}</span>
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
}
