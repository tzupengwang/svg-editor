export default function downloadSvg() {
  let svg = (new XMLSerializer()).serializeToString(document.querySelector('.svg-canvas'));
  const splitSvg = svg.match(/(<svg.*?>)(.*)/);
  svg = `${splitSvg[1]}<style type="text/css"> .circle { fill: none; stroke: #8f7c4f; stroke-width: 5px; } .line { stroke: #8f7c4f; stroke-width: 5px; }</style>${splitSvg[2]}`;
  const tmpDOM = document.createElement('a');
  tmpDOM.download = 'a.svg';
  tmpDOM.href = `data:application/octet-stream;base64,${btoa(svg)}`;
  const e = document.createEvent('MouseEvents');
  e.initMouseEvent('click', true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  tmpDOM.dispatchEvent(e);
}

