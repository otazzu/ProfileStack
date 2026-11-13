import React from 'react';

const A4PageWrapper = ({children}) => {
  return (
    <div className="a4-page w-[210mm] bg-white">
      {children}
    </div>
  );
};

export default A4PageWrapper;
