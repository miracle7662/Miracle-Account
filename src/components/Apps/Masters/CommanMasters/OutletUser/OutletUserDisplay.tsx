import React from 'react';

interface OutletUserDisplayProps {
  outletNames: string; // Comma separated outlet names from backend
  outletIds?: number[]; // Optional array of outlet IDs
}

const OutletUserDisplay: React.FC<OutletUserDisplayProps> = ({ outletNames, outletIds }) => {
  // Parse the comma separated outlet names into an array
  const outlets = outletNames ? outletNames.split(',').map(name => name.trim()) : [];

  return (
    <div>
      {outlets.length > 0 ? (
        outlets.map((outlet, index) => (
          <span key={index} style={{ marginRight: 8, padding: '4px 8px', backgroundColor: '#e0e0e0', borderRadius: 4 }}>
            {outlet}
          </span>
        ))
      ) : (
        <span>No outlets assigned</span>
      )}
    </div>
  );
};

export default OutletUserDisplay;
