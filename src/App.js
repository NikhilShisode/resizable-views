import "./App.css";
import Resizable from "./Resizable";

const LeftView = () => {
  return (
    <div className="pane-content" style={{ background: "red", height: "100%" }}>
      <label>Left Pane (resizable)</label>
    </div>
  );
};

const RightView = () => (
  <div className="pane-content" style={{ background: "blue", height: "100%" }}>
    <label>
      Right Pane (resizable)
      <br />
      <br />
      minSize = 200px
      <br />
      maxSize = 800px
    </label>
  </div>
);
function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Resizable
        LeftView={LeftView}
        LeftViewOverlay={() => (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 50,
              height: 200,
              background: "green",
              zIndex: 3,
              margin: 10,
            }}
          ></div>
        )}
        RightView={RightView}
        RightViewOverlay={() => (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 80,
              width: 50,
              height: 200,
              background: "yellow",
              zIndex: 3,
              margin: 10,
            }}
          ></div>
        )}
      />
    </div>
  );
}

export default App;
