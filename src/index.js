import React from "react";
import { render } from "react-dom";
import { Button } from "./Button";
import { Router } from "react-static";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const sectionStyles = {
  margin: "40px auto"
};

const theme = {
  button: {
    baseColor: "255,89,89",
    textColor: "255,255,255",
    inverse: true,
    hoverEffect: "ripple",
    styles: {
      transition: "0.5s ease",
      padding: "8px 25px",
      textTransform: "uppercase",
      fontSize: 14
    }
  }
};

export default class App extends React.Component {
  parseFile = (fileContents: string, event: any) => {
    console.log(fileContents);
  };
  render() {
    return (
      <div style={styles}>
        <div style={sectionStyles}>
          <Button
            {...{
              ...theme.button,
              type: "submit",
              link: "/contact",
              tagType: "button"
            }}
          >
            Button tag
          </Button>
        </div>
        <div style={sectionStyles}>
          <Button
            {...{
              ...theme.button,
              link: "/contact",
              tagType: "a",
              inverse: false,
              hoverBaseColor: "184,68,72",
              hoverEffect: "default",
              styles: {
                ...theme.button.styles,
                textTransform: "none"
              }
            }}
          >
            an a tag
          </Button>
        </div>
        <div style={sectionStyles}>
          <Button
            {...{
              ...theme.button,
              tagType: "input",
              inputAttrs: {
                type: "file"
              },
              onFileChange: this.parseFile
            }}
          >
            File Upload
          </Button>
        </div>
        <div style={sectionStyles}>
          <Router>
            <Button
              {...{
                ...theme.button,
                link: "/contact",
                inverse: false,
                tagType: "a",
                styles: {
                  ...theme.button.styles
                }
              }}
            >
              Link component
            </Button>
          </Router>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
