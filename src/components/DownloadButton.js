import React, { Component } from 'react';
import downloadSvg from '../utils/downloadSvg';

export default class DownloadButton extends Component {
  render() {
    return (
      <div className='download-button' onClick={downloadSvg}>
        DOWNLOAD
      </div>
    );
  }
}
