import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useViewerLoad = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('load') === 'true') {
      // Remove the 'load' query parameter
      queryParams.delete('load');
      // Construct the new URL without 'load=true'
      const newUrl = `${location.pathname}?${queryParams.toString()}`;
      // Replace the current entry in the history stack
      navigate(newUrl, { replace: true });
      // Reload the page
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array
};

export default useViewerLoad;
