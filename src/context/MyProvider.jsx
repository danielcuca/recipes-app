import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [isLoading, setLoading] = useState(true);

  const value = useMemo(
    () => ({
      isLoading,
      setLoading,
    }),
    [isLoading, setLoading],
  );

  return <MyContext.Provider value={ value }>{children}</MyContext.Provider>;
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
