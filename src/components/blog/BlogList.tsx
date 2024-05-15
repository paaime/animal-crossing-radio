'use client';

import { useState } from 'react';
import { blogs } from '@/data/blogs';
import PreviewCard from './PreviewCard';

export default function BlogList({
  navigation = false,
}: {
  navigation?: boolean;
}) {
  const postsPerPage = 5; // Number of blog posts per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range of the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  // Function to handle page navigation
  const nextPage = () => {
    if (currentPage >= Math.ceil(blogs.length / postsPerPage)) return;
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="flex flex-col divide-y divide-gray-700">
        {currentPosts.map((blog, key) => (
          <PreviewCard key={key} blog={blog} />
        ))}
      </div>
      {navigation && (
        <div className="flex items-center justify-between pb-20 underline-offset-4 font-light">
          <p
            className={`hover:underline cursor-pointer ${
              currentPage <= 1 && 'text-gray-400'
            }`}
            onClick={prevPage}
          >
            Previous
          </p>
          <div>
            <p>
              {currentPage} of {Math.ceil(blogs.length / postsPerPage)}
            </p>
          </div>
          <p
            className={`hover:underline cursor-pointer ${
              currentPage >= Math.ceil(blogs.length / postsPerPage) &&
              'text-gray-400'
            }`}
            onClick={nextPage}
          >
            Next
          </p>
        </div>
      )}
    </>
  );
}
