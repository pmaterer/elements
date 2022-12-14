import React from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, Link, HashRouter } from 'react-router-dom';

import FrameRateRoute from './routes/frameRate';
import EaseRoute from './routes/ease';

const App = () => {
  return (
    <>
      <h1>Canvas Lab</h1>
      <nav>
        <ul>
          <li>
            <Link to="/frame-rate">Frame Rate</Link>
          </li>
          <li>
            <Link to="/ease">Ease</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/frame-rate" element={<FrameRateRoute />} />
        <Route path="/ease" element={<EaseRoute />} />
      </Routes>
    </HashRouter>
  );
}
