import React from 'react';
// omg eslint
const Table = (props) => {
  let button;
  let lock;
  const userInTable = props.users.includes(props.username);
  const joinButton = (
    <button
      className="btn btn-info"
      onClick={() => props.onJoinClicked(props.tablenum)}
    >Join</button>);
  if (props.multiplayer) {
    if (!userInTable) {
      button = joinButton;
    }
  } else {
    lock = (
      <span className="glyphicon glyphicon-lock" aria-hidden="true" />);
    if (!userInTable && props.host === props.username) {
      button = joinButton;
    }
  }

  const users = props.users.map((user, idx) => {
    let cn;
    if (user === props.host) {
      cn = 'label label-primary';
    } else {
      cn = 'label label-default';
    }
    return (
      <span className={cn} key={idx} style={{ marginRight: '5px' }}>
        {user}
      </span>);
  });

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-xs-2">
          <p>
            <big className="text-muted">{props.lexicon}</big>
          </p>
          <p>
            <big>{`#${props.tablenum}`}</big>
          </p>
        </div>
        <div className="col-xs-10 col-sm-8">
          <div className="row">
            <center><big className="text-info">{props.wordList} {lock}</big></center>
          </div>
          <p />
          <div className="row" style={{ overflow: 'hidden' }}>
            <center>{users}</center>
          </div>

        </div>
        <div className="col-xs-12 col-sm-2">
          <p />
          {button}
        </div>
      </div>
    </li>
  );
};

Table.propTypes = {
  tablenum: React.PropTypes.number,
  lexicon: React.PropTypes.string,
  wordList: React.PropTypes.string,
  host: React.PropTypes.string,
  users: React.PropTypes.arrayOf(React.PropTypes.string),
  onJoinClicked: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  multiplayer: React.PropTypes.bool,
  username: React.PropTypes.string,
};

export default Table;
