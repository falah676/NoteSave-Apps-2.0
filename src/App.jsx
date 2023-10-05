import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import NotesApp from './Component/NotesApp';

function App() {
  return (
    <div className="app-container">
    <BrowserRouter basename='NoteSave-Apps-2.0/'>
      <NotesApp />
    </BrowserRouter>
    </div>
  );
}

export default App;
