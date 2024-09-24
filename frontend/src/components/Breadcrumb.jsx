
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav className=" mb-4">
      <ol className="inline-flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="text-gray-500 ">/ </span>}
            {item.link ? (
              <Link to={item.link} className="text-gray-500  hover:text-indigo-600">
                {item.label}
              </Link>
            ) : (
              <span className="text-indigo-600 hover:text-gray-500"> {item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
