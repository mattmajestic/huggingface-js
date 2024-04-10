import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import readmePath from './README.md'; // Adjust the path to your markdown file

class Docs extends Component {
  constructor(props) {
    super(props);

    this.state = { markdownContent: null };
  }

  componentDidMount() {
    // Using componentDidMount instead of componentWillMount as it's deprecated
    fetch(readmePath)
      .then((response) => response.text())
      .then((text) => {
        this.setState({ markdownContent: text });
      })
      .catch((error) => console.error('Error fetching markdown content:', error));
  }

  render() {
    const { markdownContent } = this.state;
    return (
        <div className="markdown-body">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
    );
  }
}

export default Docs;
