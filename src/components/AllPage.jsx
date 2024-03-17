import React, { useState } from "react";
import { pages } from "../utils/data";
import { useNavigate } from "react-router-dom";

const AllPage = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedPages, setSelectedPages] = useState([]);
  const navigate = useNavigate();

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (!selectAll) {
      setSelectedPages(pages.map((page) => page.id));
    } else {
      setSelectedPages([]);
    }
  };

  const handleItemChange = (id, checked) => {
    setSelectedPages((prev) => {
      if (checked) {
        return [...prev, id];
      }
      return prev.filter((i) => i !== id);
    });
  };

  const handleDone = () => {
    if (selectedPages.length == 0) {
      return;
    }
    navigate("/selected-pages", { state: { selectedIds: selectedPages } });
  };

  return (
    <div className="pages-container">
      <div className="page-header-container">
        <p className="normal-text">All pages</p>
        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
      </div>
      <div className={`all-page-container ${pages.length > 4 ? 'scroller' : ''}`}>
        {pages.map((page, index) => (
          <div key={index} className={`page-content ${index == 0 && pages.length > 4 ? 'tp-spaces': index == pages.length-1 && pages.length > 4 ? 'bt-spaces': 'tp-spaces-no'}`}>
            <p className="normal-text">{page.name}</p>
            <input
              type="checkbox"
              checked={selectedPages.includes(page.id)}
              onChange={(e) => handleItemChange(page.id, e.target.checked)}
            />
          </div>
        ))}

      </div>
        <div className="button-container">
          <button onClick={handleDone} className="button-style">
            Done
          </button>
        </div>
    </div>
  );
};

export default AllPage;
