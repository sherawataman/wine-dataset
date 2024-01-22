// App.tsx
import React from 'react';
import FlavanoidsGammaTable from './components/FlavanoidsGammaTable';

// Import data from JSON file
import data from './Wine-Data.json';

const App: React.FC = () => {
  return (
    <div>
      <h2>Class-wise Flavonoid and Gamma Statistics</h2>
      {/* @ts-ignore */}
      <FlavanoidsGammaTable data={data} />
    </div>
  );
};

export default App;
