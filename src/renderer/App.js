import '~App.scss';

import React from 'react';

import HelloWorld from '~components/HelloWorld';

export default function App() {
  return (
    <div className='app'>
      <span className='app__intro'>Hey there! 😊</span>
      <div className='app__greeting'>
        <HelloWorld />
      </div>
    </div>
  );
}
