import React from "react";
import faker from "faker";
import { render } from "react-testing-library";
//
import Button from "./";

describe("Button Component Test", () => {
  it("Renders, and with the href and other props passed to it.", () => {
    const { getByText, props } = renderSetup();
    const button = getByText(props.children);

    expect(button).toBeDefined();
    expect(button.href).toBe(props.options.link);
  });

  it("Renders an <a> tag if tagType is a or Link", () => {
    const { getByTestId, container } = renderSetup();
    const button = getByTestId("component-button");

    expect(button.nodeName).toBe("A");
  });

  it("Renders an <button> tag if tagType is button", () => {
    const { getByTestId, container } = renderSetup({
      options: { tagType: "button" }
    });
    const button = getByTestId("component-button");

    expect(button.nodeName).toBe("BUTTON");
  });
});

function renderSetup(overrides) {
  const props = {
    children: "Contact Us",
    options: {
      link: `${faker.internet.url()}/`
    },
    ...overrides
  };

  const wrapper = render(<Button {...props} />);

  return {
    ...wrapper,
    props
  };
}
