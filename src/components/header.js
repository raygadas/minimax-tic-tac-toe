import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";

function Header({ siteTitle }) {
  const [isExpanded, toggleExpansion] = useState(false);

  return (
    <nav>
      <div className="max-w-2xl mx-auto py-4 md:py-8">
        <div className="flex justify-between items-baseline px-4">
          <Link to="/" className="flex items-center no-underline text-gray-800">
            <span className="font-bold text-4xl tracking-tight">
              {siteTitle}
            </span>
          </Link>

          <button
            className="block md:hidden border border-white flex items-center px-3 py-2 rounded text-gray-800"
            onClick={() => toggleExpansion(!isExpanded)}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          className={`${
            isExpanded ? `block` : `hidden`
          } md:block md:flex md:items-center w-full md:w-auto px-4 bg-gray-100 md:bg-transparent py-2`}
        >
          <Link
            to="/"
            className="block md:inline-block mt-4 md:mt-0 mr-6 no-underline text-gray-600 uppercase text-sm font-medium tracking-widest"
          >
            Play
          </Link>
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
