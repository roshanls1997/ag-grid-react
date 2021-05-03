import React from 'react';
import { useHistory } from 'react-router';
import { Button } from 'semantic-ui-react';
import logo from '../../logo.svg';
import './Header.scss';

const Header = () => {

  const history = useHistory();

	return (
		<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="/ab"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
		    <Button className="practice-button" onClick={() => {history.push('/practice')}} inverted >Go to AgGrid page</Button>
      </header>
	)

}

export default Header;