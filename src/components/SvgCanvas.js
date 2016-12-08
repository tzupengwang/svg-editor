import React, { Component } from 'react';

export default class SvgCanvas extends Component {
  render() {
    const { elements, handleCanvasClick, handleElementMouseDown,
            handleElementMouseMove, handleElementMouseUp } = this.props;
    return (
      <svg className="svg-canvas"
           onMouseDown={handleCanvasClick}
           onMouseMove={handleElementMouseMove}
           onMouseUp={handleElementMouseUp}>
      {
        elements.map((element) => {
          if (element.type === 'circle') {
            return <circle className='circle' key={element.key} {...element.props}
                           onMouseDown={e => handleElementMouseDown(element.key, e)}/>;
          } else if (element.type === 'line') {
            const endpoints = element.endpoints.map(key => elements.find(_ => (_.key === key)));
            const attr = {
              x1: endpoints[0].props.cx,
              y1: endpoints[0].props.cy,
              x2: endpoints[1].props.cx,
              y2: endpoints[1].props.cy,
            };
            const dist = Math.hypot(attr.x1 - attr.x2, attr.y1 - attr.y2);
            const radius = endpoints[0].props.r;
            const delta = {
              x: (attr.x2 - attr.x1) * radius / dist,
              y: (attr.y2 - attr.y1) * radius / dist,
            };
            attr.x1 += delta.x;
            attr.x2 -= delta.x;
            attr.y1 += delta.y;
            attr.y2 -= delta.y;
            return <line className='line' key={element.key} {...attr}/>;
          }
          return false;
        })
      }
      </svg>
    );
  }
}
