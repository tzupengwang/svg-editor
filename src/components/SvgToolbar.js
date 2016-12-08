import React, { Component } from 'react';

export default class SvgToolbar extends Component {
  render() {
    const { toolSelected, handleToolSelection } = this.props;
    return (
      <div className='svg-toolbar'>
        <div className='toolbar-container'>
          <div className={`tool-item ${toolSelected === 'circle' ? 'active' : ''}`}
               onClick={e => handleToolSelection('circle', e)}>
            <svg height="70" width="70" viewBox="0 0 70 70" xmlns='http://www.w3.org/2000/svg'>
              <circle cx="35" cy="35" r="25" fill="none" strokeWidth="4"/>
            </svg>
          </div>
          <div className={`tool-item ${toolSelected === 'line' ? 'active' : ''}`}
               onClick={e => handleToolSelection('line', e)}>
            <svg height="70" width="70" viewBox="0 0 70 70" xmlns='http://www.w3.org/2000/svg'>
              <line x1="15" y1="15" x2="55" y2="55" fill="none" strokeWidth="4"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

