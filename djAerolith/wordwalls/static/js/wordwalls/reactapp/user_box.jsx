import React from 'react';
import WordPartDisplay from './word_part_display';

const UserBox = (props) => {
  // var answers, percentScore, fractionScore;
  const answers = [];
  props.answeredByMe.forEach((word, idx) => {
    answers.push(
      <div
        key={idx}
        data-toggle="tooltip"
        data-placement="left"
        title={word.get('d')}
      >
        <WordPartDisplay
          text={`${word.get('fh')} `}
          classes="text-info small"
        />
        <WordPartDisplay
          text={word.get('w') + (props.showLexiconSymbols ?
            word.get('s') : '')}
        />
        <WordPartDisplay
          text={` ${word.get('bh')}`}
          classes="text-info small"
        />
      </div>);
  });
  // console.log('The answers are ', answers);
  const percentScore = props.totalWords > 0 ?
    (100 * (props.answeredByMe.length / props.totalWords)).toFixed(1) : 0;

  const fractionScore = `${props.answeredByMe.length} / ${props.totalWords}`;

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <span>{props.username}</span>
      </div>
      <div
        className="panel-body"
        style={{
          height: 200,
          overflow: 'auto',
        }}
        ref={(domNode) => {
          if (domNode === null) {
            return;
          }
          domNode.scrollTop = domNode.scrollHeight; // eslint-disable-line no-param-reassign
        }}
      >{answers}
      </div>
      <div className="panel-footer">
        <div className="row">
          <div className="col-sm-4 col-md-4">
            <span>{`${percentScore}%`}</span>
          </div>
          <div className="col-sm-8 col-md-6 col-md-offset-2">
            <span>{fractionScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

UserBox.propTypes = {
  answeredByMe: React.PropTypes.array,
  totalWords: React.PropTypes.number,
  username: React.PropTypes.string,
};

export default UserBox;
