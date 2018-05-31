// @flow
import * as React from "react";
//
import { A, Link, Button as ButtonStyled } from "./index.style";

export type tProps = {
  children: React.Node,
  options: {
    link?: string,
    tagType: "Link" | "a" | "button",
    baseColor: string,
    textColor: string,
    inverse?: boolean,
    inverseStyle?: "default" | "transparent",
    hoverEffect?: "default" | "ripple",
    hoverDefaultBaseColor: string,
    styles?: {} // Emotion style object
  }
};

export default function Button(props: tProps) {
  const defaults = {
    hoverEffect: "default", //default, ripple
    inverse: false,
    inverseStyle: "default"
  };

  let {
    options: { link, tagType, ...options },
    children,
    ...remainingProps
  } = props;

  tagType = tagType || "Link";

  const buttonProps = {
    ...remainingProps,
    options: {
      ...defaults,
      ...options
    },
    ["data-testid"]: "component-button"
  };

  switch (tagType) {
    case "a":
      return (
        <A {...buttonProps} href={link}>
          {children}
        </A>
      );
    case "button":
      return <ButtonStyled {...buttonProps}>{children}</ButtonStyled>;
    case "Link":
    default:
      return (
        <Link {...buttonProps} to={link}>
          {children}
        </Link>
      );
  }
}
