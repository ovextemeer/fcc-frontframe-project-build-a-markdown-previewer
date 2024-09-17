import "./styles.css";
import React from "react";
import { defaultEditorContent } from "./default";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons";
import { faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorValue: defaultEditorContent,
      showedEditor: true,
      showedPreviewer: true,
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.expandEditor = this.expandEditor.bind(this);
    this.expandPreviewer = this.expandPreviewer.bind(this);
  }

  handleTextChange(event) {
    this.setState((state) => ({ ...state, editorValue: event.target.value }));
  }

  expandEditor() {
    this.setState((state) => ({
      ...state,
      showedPreviewer: !state.showedPreviewer,
    }));
  }

  expandPreviewer() {
    this.setState((state) => ({ ...state, showedEditor: !state.showedEditor }));
  }

  render() {
    return (
      <div className="App">
        <div
          className="editor"
          style={{ display: this.state.showedEditor ? "flex" : "none" }}
        >
          <div className="toolbar">
            <div className="introduction">
              <FontAwesomeIcon icon={faFreeCodeCamp} />
              <span>Editor</span>
            </div>
            <div className="tools">
              <FontAwesomeIcon
                icon={
                  this.state.showedEditor && this.state.showedPreviewer
                    ? faMaximize
                    : faMinimize
                }
                onClick={this.expandEditor}
              />
            </div>
          </div>
          <textarea
            id="editor"
            rows={this.state.showedPreviewer ? "10" : "50"}
            onChange={this.handleTextChange}
            value={this.state.editorValue}
          ></textarea>
        </div>
        <div
          className="previewer"
          style={{
            display: this.state.showedPreviewer ? "flex" : "none",
            marginTop: this.state.showedEditor ? "0" : "1.5rem",
          }}
        >
          <div className="toolbar">
            <div className="introduction">
              <FontAwesomeIcon icon={faFreeCodeCamp} />
              <span>Editor</span>
            </div>
            <div className="tools">
              <FontAwesomeIcon
                icon={
                  this.state.showedEditor && this.state.showedPreviewer
                    ? faMaximize
                    : faMinimize
                }
                onClick={this.expandPreviewer}
              />
            </div>
          </div>
          <div
            id="preview"
            style={{ height: this.state.showedEditor ? "100vh" : "auto" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                marked.parse(
                  this.state.editorValue.replace(
                    /^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,
                    ""
                  )
                )
              ),
            }}
          ></div>
        </div>
      </div>
    );
  }
}
