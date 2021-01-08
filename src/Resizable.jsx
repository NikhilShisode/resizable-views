import React from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import ReactDOM from "react-dom";
import "react-reflex/styles.css";

class CollapsibleElement extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.onCollapse && this.getSize() < this.props.threshold) {
      this.props.onCollapse();
    }
  }

  getSize() {
    const domElement = ReactDOM.findDOMNode(this);

    switch (this.props.orientation) {
      case "horizontal":
        return domElement.offsetHeight;

      case "vertical":
        return domElement.offsetWidth;

      default:
        return 0;
    }
  }

  render() {
    return (
      <ReflexElement {...this.props}>
        <div className="pane-content" style={{ height: "100%" }}>
          {this.props.children}
        </div>
      </ReflexElement>
    );
  }
}

export default function Resizable({
  LeftView,
  LeftViewOverlay,
  RightView,
  RightViewOverlay,
}) {
  const [state, setState] = React.useState({
    collapseRight: false,
    collapseLeft: false,
  });

  const collapseLeft = (collapseLeft) => {
    setState({
      ...state,
      collapseLeft,
    });
  };

  const collapseRight = (collapseRight) => {
    setState({
      ...state,
      collapseRight,
    });
  };

  return (
    <>
      <ReflexContainer orientation="horizontal">
        <ReflexElement>
          <ReflexContainer orientation="vertical">
            {!state.collapseLeft && (
              <CollapsibleElement
                className="left-pane"
                onCollapse={() => collapseLeft(true)}
                threshold={40}
              >
                <>
                  <LeftView />
                  {LeftViewOverlay && <LeftViewOverlay />}
                </>
              </CollapsibleElement>
            )}

            {!state.collapseLeft && <ReflexSplitter propagate={true} />}

            {!state.collapseRight && (
              <CollapsibleElement
                className="right-pane"
                onCollapse={() => collapseRight(true)}
                threshold={60}
              >
                <RightView />
                {RightViewOverlay && <RightViewOverlay />}
              </CollapsibleElement>
            )}
          </ReflexContainer>
        </ReflexElement>
      </ReflexContainer>
      <div
        style={{
          visibility: state.collapseLeft ? "visible" : "hidden",
          width: 200,
          height: 200,
          position: "absolute",
          bottom: 0,
          left: 0,
          margin: 10,
          background: "red",
          zIndex: 101,
        }}
        onClick={() => collapseLeft(false)}
      ></div>
      <div
        style={{
          visibility: state.collapseRight ? "visible" : "hidden",
          width: 200,
          height: 200,
          position: "absolute",
          bottom: 0,
          right: 0,
          margin: 10,
          background: "blue",
          zIndex: 101,
        }}
        onClick={() => collapseRight(false)}
      ></div>
    </>
  );
}
