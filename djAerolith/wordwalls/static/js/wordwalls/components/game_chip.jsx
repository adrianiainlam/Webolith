import React from 'react';

const ColorConstants = {
  White: '#feffff',
  Black: '#3e3f3a',
  Green: '#5ef386',
  Yellow: '#d3e948',
  Blue: '#60c0dc',
  Purple: '#725ef3',
  Magenta: '#e95ad6',
};

function getColorFromAnagrams(numAnagrams) {
  let effectiveNumAnagrams = numAnagrams;
  if (numAnagrams > 9) {
    effectiveNumAnagrams = 9;
  }
  return {
    9: {
      color: ColorConstants.Black,
      opacity: 1,
      textColor: ColorConstants.White,
      outline: '#7e7f7a',
    },
    8: {
      color: ColorConstants.Black,
      opacity: 0.65,
      textColor: ColorConstants.White,
      outline: '#7e7f7a',
    },
    7: {
      color: '#325d88',
      opacity: 1,
      textColor: ColorConstants.White,
      outline: '#7e7f7a',
    },
    6: {
      color: ColorConstants.Magenta,
      opacity: 1,
      textColor: ColorConstants.White,
      outline: '#7e7f7a',
    },
    5: {
      color: ColorConstants.Green,
      opacity: 1,
      textColor: ColorConstants.Black,
      outline: '#7e7f7a',
    },
    4: {
      color: ColorConstants.Yellow,
      opacity: 1,
      textColor: ColorConstants.Black,
      outline: '#7e7f7a',
    },
    3: {
      color: ColorConstants.Blue,
      opacity: 1,
      textColor: ColorConstants.White,
      outline: '#7e7f7a',
    },
    2: {
      color: ColorConstants.Purple,
      opacity: 1,
      textColor: ColorConstants.White,
      outline: '#7e7f7a',
    },
    1: {
      color: ColorConstants.White,
      opacity: 1,
      textColor: ColorConstants.Black,
      outline: '#7e7f7a',
    },
  }[effectiveNumAnagrams];
}

const GameChip = (props) => {
  const transform = `translate(${props.x + props.radius}, ${props.y + props.radius})`;
  const fontFamily = 'Menlo,Consolas,"Ubuntu Mono",monospace';
  const color = getColorFromAnagrams(props.number);
  return (
    <g transform={transform}>
      <circle
        cx={0}
        cy={0}
        r={props.radius}
        stroke={color.outline}
        strokeWidth="0.5px"
        fill={color.color}
        opacity={color.opacity}
      />
      <text
        x={0}
        y={0}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={fontFamily}
        fontSize={`${props.fontSize}%`}
        stroke={color.textColor}
        fill={color.textColor}
        strokeWidth="1px"
      >{props.number}</text>
    </g>
  );
};

GameChip.propTypes = {
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  radius: React.PropTypes.number,
  fontSize: React.PropTypes.number,
  number: React.PropTypes.number,
};

export default GameChip;
