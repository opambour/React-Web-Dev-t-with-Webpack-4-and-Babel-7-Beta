import React from 'react';
import ReactDom from 'react-dom';

import { Hello } from './components/app';

ReactDom.render( < Hello user = 'Anonymous'
    welcome = 'Welcome to React...!' / > , document.getElementById('welcome_msg'));