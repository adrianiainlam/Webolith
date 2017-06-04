import React from 'react';

/**
 * Get a color given a string tile style. The tile style is just a
 * stringified number from 1 - 9.
 */
function colorFromTileStyle(style) {
  return {
    1: {
      color: '#4417b7',
      outline: '#492889',
      textColor: '#ffffff',
    },
    2: {
      color: '#fdb72b',
      outline: '#a57719',
      textColor: '#000000',
    },
    3: {
      color: '#dcf834',
      outline: '#ecfa7b',
      textColor: '#000000',
    },
    4: {
      color: '#ca0813',
      outline: '#650205',
      textColor: '#ffffff',
    },
    5: {
      color: '#333333',
      outline: '#000000',
      textColor: '#ffffff',
    },
    6: {
      color: '#fedf32',
      outline: '#fee651',
      textColor: '#000000',
    },
    7: {
      color: '#dddddd',
      outline: '#bbbbbb',
      textColor: '#000000',
    },
    8: {
      color: '#f75a50',
      outline: '#a93733',
      textColor: '#f6eeeb',
    },
    9: {
      color: '#229875',
      outline: '#145537',
      textColor: '#dbe5e6',
    },
  }[style];
}

const GameTile = (props) => {
  let letter;
  let fontSize;
  let fontFamily;
  fontSize = props.fontSize;
  const transform = `translate(${props.x},${props.y})`;
  if (props.font === 'mono') {
    fontFamily = '"Courier New",monospace';
    fontSize *= 1.1;
  } else if (props.font === 'sans') {
    fontFamily = 'Arial,Geneva,Helvetica,Helv,sans-serif';
  } else if (props.font === 'sansmono') {
    fontFamily = 'Monaco,Consolas,"Ubuntu Mono",monospace';
  }
  const fontWeight = props.bold ? 'bold' : 'normal';
  const color = colorFromTileStyle(props.tileStyle);
  letter = props.letter;

  switch (letter) {
    case '1':
      letter = 'CH';
      fontSize *= 0.62;
      break;
    case '2':
      letter = 'LL';
      fontSize *= 0.62;
      break;
    case '3':
      letter = 'RR';
      fontSize *= 0.62;
      break;
    case 'Ñ':
      letter = 'ñ';
      break;
    default:
      break;
  }

  return (
    <g transform={transform}>
      <rect
        width={props.width}
        height={props.height}
        strokeWidth="0.5px"
        stroke={color.outline}
        fill={color.color}
        rx={1}  /* radiuses */
        ry={1}
      />
      <text
        x={props.width / 2}
        y={props.height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        fontSize={`${fontSize}%`}
        stroke={color.textColor}
        fill={color.textColor}
      >{letter}</text>
    </g>
  );
};

GameTile.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  letter: React.PropTypes.string,
  fontSize: React.PropTypes.number,
  tileStyle: React.PropTypes.string,
  font: React.PropTypes.string,
  bold: React.PropTypes.bool,
  x: React.PropTypes.number,
  y: React.PropTypes.number,
};

export default GameTile;
