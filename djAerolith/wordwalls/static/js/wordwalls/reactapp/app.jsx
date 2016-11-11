/* global document*/
import React from 'react';
import ReactDOM from 'react-dom';

import WordwallsApp from './wordwalls_app';

class App {
  /**
   * Initialize the app.
   * @param  {Object} options
   */
  static initialize(options) {
    // WordwallsApp will be the holder of state.
    let style;
    let listName;
    let autoSave;
    console.log('addl params', options.addlParams);

    if (options.addlParams.style != null) {
      style = JSON.parse(options.addlParams.style);
      // Add default options that may not have been there.
      style.tc.showChips = style.tc.showChips || false;
      style.bc.hideLexiconSymbols = style.bc.hideLexiconSymbols || false;
    } else {
      // Default style.
      style = {
        tc: {
          on: true,
          customOrder: '',
          blankCharacter: '?',
          font: 'mono',
          showChips: false,
          bold: false,
        },
        bc: {
          showBorders: false,
          hideLexiconSymbols: false,
        },
      };
    }
    // Get the list name from one of two places.
    if (options.addlParams.saveName) {
      listName = options.addlParams.saveName;
      autoSave = true;
    } else {
      listName = options.addlParams.tempListName;
      autoSave = false;
    }

    // Render.
    ReactDOM.render(
      <WordwallsApp
        username={options.username}
        listName={listName}
        autoSave={autoSave}
        lexicon={options.lexicon}
        displayStyle={style}
        tableUrl={`/wordwalls/table/${options.tablenum}/`}
      />,
      document.getElementById('main-app-content')
    );
  }
}

export default App;

