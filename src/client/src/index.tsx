import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if(container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error('root id element not exist on page');
  alert('App is unable to run because of Root id element not exist on the page');
}
