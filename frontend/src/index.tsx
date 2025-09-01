import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Export FilterType for reuse
export type FilterType = 'all' | 'active' | 'completed';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
