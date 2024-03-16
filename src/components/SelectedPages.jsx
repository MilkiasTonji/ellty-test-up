import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { pages } from "../utils/data";

const SelectedPages = () => {
  const location = useLocation();
  const [selectedPages, setSelectedPages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const selected_ids = location.state ? location.state.selectedIds : [];
    const filteredPages = pages.filter((page) =>
      selected_ids.includes(page.id)
    );
    setSelectedPages(filteredPages);
  }, [location]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="home-container">
      <div className="pages-container">
        <div className="page-header-container">
          <p className="normal-text">Selected Pages</p>
        </div>

        <div className="all-page-container">
          {selectedPages.map((page, index) => (
            <div
              key={`data-${page.id}`}
              className={`page-content ${index == 0 && selectedPages.length > 4 ? 'tp-spaces': index == selectedPages.length-1 && selectedPages.length > 4 ? 'bt-spaces': 'tp-spaces-no'}`}
            >
              <p className="normal-text">{page.name}</p>
              <input
                type="checkbox"
                disabled
                checked={selectedPages.some(
                  (item) => JSON.stringify(item.id) === JSON.stringify(page.id)
                )}
              />
            </div>
          ))}
        </div>
          <div className="button-container">
            <button onClick={handleBack} className="button-style">
              Go Back
            </button>
          </div>
      </div>
    </div>
  );
};

export default SelectedPages;
