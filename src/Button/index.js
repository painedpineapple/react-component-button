// @flow
import * as React from 'react'
//
import { A, Link, Button as ButtonStyled, Input } from './index.style'
import { readUploadedFileAsText } from './utils'

type tState = {}

type tProps = {
  children: React.Node,
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
  onFileChange?: (fileContents: string, event: any) => void,
}
export class Button extends React.Component<tProps, tState> {
  defaults = {}
  handleInputChange = async (event: any) => {
    if (event.target.files.length) {
      try {
        const fileContents = await readUploadedFileAsText(event.target.files[0])

        if (this.props.onFileChange) {
          this.props.onFileChange(fileContents, event)
        } else {
          // eslint-disable-next-line no-console
          console.error(
            "You must provide an onFileChange prop if you're using an tagType of input and it's type is file. ",
          )
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e.message)
      }
    }
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
      link,
      tagType,
      inputAttrs,
      baseColor,
      textColor,
      inverse,
      inverseStyle,
      hoverEffect,
      hoverDefaultBaseColor,
      styles,
      onFileChange,
      children,
      ...attrs
    } = this.props

    tagType = tagType || 'Link'

    const buttonProps = {
      ...this.defaults,
      ...attrs,
      tagType,
      baseColor,
      textColor,
      inverse,
      inverseStyle,
      hoverEffect,
      hoverDefaultBaseColor,
      styles,
      'data-testid': 'component-button',
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
