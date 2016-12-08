import React, { Component } from 'react';
import SvgCanvas from './components/SvgCanvas';
import SvgToolbar from './components/SvgToolbar';
import DownloadButton from './components/DownloadButton';
import './styles/style.styl';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      elements: [],
      toolSelected: null,
      elementSelected: null,
      offset: null,
    };
    this.elementCount = 0;
    this.getNewIndex = () => {
      const ret = this.elementCount;
      this.elementCount += 1;
      return ret;
    };
  }

  handleToolSelection = (tool) => {
    this.setState((state) => {
      if (state.toolSelected === tool) {
        state.toolSelected = null;
      } else state.toolSelected = tool;
      state.elementSelected = null;
      return state;
    });
  }

  handleCanvasClick = (e) => {
    const { toolSelected } = this.state;
    const target = e.target;

    // the event must be triggered on the canvas
    if (target.tagName !== 'svg') return;

    const dim = target.getBoundingClientRect();
    const x = e.clientX - dim.left;
    const y = e.clientY - dim.top;
    if (toolSelected == null) {
      // return Promise.reject('nothing to do');
    } else if (toolSelected === 'circle') {
      this.setState((state) => {
        state.elements.push({
          type: 'circle',
          key: this.getNewIndex(),
          props: {
            cx: x,
            cy: y,
            r: '30',
          },
        });
        state.toolSelected = null;
        return state;
      });
      // return Promise.resolve(toolSelected);
    } else if (toolSelected === 'line') {
      // nothing to do
    }
  }

  handleElementMouseDown = (key, e) => {
    const { toolSelected, elementSelected } = this.state;
    const target = e.target;
    const dim = target.getBoundingClientRect();
    const x = e.clientX - dim.left;
    const y = e.clientY - dim.top;
    if (toolSelected === null) {
      const offx = 30 - x;
      const offy = 30 - y;
      this.setState({ elementSelected: key, offset: { x: offx, y: offy } });
    } else if (toolSelected === 'circle') {
      // nothing to do
    } else if (toolSelected === 'line') {
      if (elementSelected === null) {
        this.setState({ elementSelected: key });
      } else if (elementSelected !== key) {
        this.setState((state) => {
          state.elements.push({
            type: 'line',
            key: this.getNewIndex(),
            endpoints: [key, elementSelected],
            //props: {
              //cx: x,
              //cy: y,
              //r: '30',
            //},
          });
          state.toolSelected = null;
          state.elementSelected = null;
          return state;
        });
      }
    }
  }

  handleElementMouseMove = (e) => {
    const { elementSelected, toolSelected } = this.state;
    if (elementSelected === null) return;
    // only handle circle moving when no tools are selected
    if (toolSelected !== null) return;

    const target = e.target;
    if (target.tagName !== 'svg') return;
    const dim = target.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY;
    if (x < dim.left) x = dim.left;
    else if (x > dim.right) x = dim.right;
    if (y < dim.top) x = dim.top;
    else if (y > dim.bottom) x = dim.bottom;
    x -= dim.left;
    y -= dim.top;
    if (x === 0 && y === 0) return;
    this.setState((state) => {
      const element = state.elements.find(_ => (_.key === elementSelected));
      element.props.cx = x + state.offset.x;
      element.props.cy = y + state.offset.y;
      return state;
    }, () => {
    });
  }

  handleElementMouseUp = () => {
    const { toolSelected } = this.state;
    if (toolSelected !== null) return;
    this.setState({ elementSelected: null });
  }

  render() {
    const { elements, toolSelected } = this.state;
    return (
      <div className='container'>
        <SvgCanvas elements={elements}
                   handleCanvasClick={this.handleCanvasClick}
                   handleElementMouseDown={this.handleElementMouseDown}
                   handleElementMouseMove={this.handleElementMouseMove}
                   handleElementMouseUp={this.handleElementMouseUp} />
        <SvgToolbar toolSelected={toolSelected}
                    handleToolSelection={this.handleToolSelection}/>
        <DownloadButton/>
      </div>
    );
  }
}
