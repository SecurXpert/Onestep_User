import React, { useState } from "react";

// Blog data
const blogData = [
  {
    id: 0,
    title: "Saunf Water Benefits: Nutrients And Health Advantages Of Drinking Saunf Water",
    date: "23.07.25",
    // url: "https://www.apollo247.com/blog/article/saunf-water-benefits-nutrients-and-health-advantages-of-drinking-saunf-water",
    image: "https://images.apollo247.in/pd-cms/cms/2025-02/saunf%20water%20benefits%20(1).jpg",
  },
  {
    id: 1,
    title: "5 Best Massage Oils: Natural Joint Pain Healers",
    date: "22.07.25",
    // url: "https://www.apollo247.com/blog/article/massage-oil-for-joint-pains",
    image: "https://images.apollo247.in/pd-cms/cms/2022-11/man-bent-her-head-grabbed-him-her-after-exercise.jpg",
  },
  {
    id: 2,
    title: "Experiencing Goosebumps Unusually? Know What It Can Mean",
    date: "13.07.25",
    // url: "https://www.apollo247.com/blog/article/goosebumps-and-health-disorders",
    image: "https://images.apollo247.in/pd-cms/cms/2022-06/goosebumps.jpg",
  },
  // Add more blog entries as needed
  {
    id: 3,
    title: "The Importance of Hydration for Overall Health",
    date: "10.07.25",
    url: "https://www.example.com/blog/hydration-importance",
    image: "https://images.example.com/hydration.jpg",
  },
  {
    id: 4,
    title: "10 Simple Yoga Poses for Beginners",
    date: "08.07.25",
    url: "https://www.example.com/blog/yoga-for-beginners",
    image: "https://images.example.com/yoga.jpg",
  },
  {
    id: 5,
    title: "Understanding Sleep Cycles for Better Rest",
    date: "05.07.25",
    url: "https://www.example.com/blog/sleep-cycles",
    image: "https://images.example.com/sleep.jpg",
  },
  {
    id: 6,
    title: "Healthy Meal Prep Ideas for Busy Professionals",
    date: "03.07.25",
    url: "https://www.example.com/blog/meal-prep",
    image: "https://images.example.com/meal-prep.jpg",
  },
  {
    id: 7,
    title: "The Benefits of Meditation for Stress Relief",
    date: "01.07.25",
    url: "https://www.example.com/blog/meditation-benefits",
    image: "https://images.example.com/meditation.jpg",
  },
];

// BlogCard component
const BlogCard = ({ blog }) => {
  const { title, date, url, image } = blog;

  const srcset = `
    ${image}?tr=q-80,f-webp,w-300,dpr-1,c-at_max 300w,
    ${image}?tr=q-80,f-webp,w-300,dpr-2,c-at_max 600w,
    ${image}?tr=q-80,f-webp,w-300,dpr-3,c-at_max 900w
  `;

  return (
    <div className="blog-card">
      <a href={url} className="blog-link">
        <div className="blog-image-container">
          <img
            srcSet={srcset}
            src={`${image}?tr=q-80,f-webp,w-300,dpr-2,c-at_max`}
            sizes="(max-width: 768px) 100vw, 300px"
            alt={title}
            loading="lazy"
            className="blog-image"
          />
        </div>
        <div className="blog-content">
          <h3 className="blog-title">{title}</h3>
          <p className="blog-date">By OneStep Medi - {date}</p>
        </div>
      </a>
    </div>
  );
};

// Blog component
const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="blog-container">
      <h1 className="blog-header">Health Blog</h1>
      
      <div className="blog-grid">
        {currentBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`page-button ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
      
      <style jsx>{`
        .blog-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .blog-header {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }
        
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }
        
        .blog-card {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: white;
        }
        
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        
        .blog-link {
          text-decoration: none;
          color: inherit;
          display: block;
          height: 100%;
        }
        
        .blog-image-container {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }
        
        .blog-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .blog-card:hover .blog-image {
          transform: scale(1.05);
        }
        
        .blog-content {
          padding: 15px;
        }
        
        .blog-title {
          margin: 0 0 10px 0;
          font-size: 16px;
          line-height: 1.4;
          color: #333;
        }
        
        .blog-date {
          margin: 0;
          font-size: 14px;
          color: #666;
        }
        
        .pagination {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 30px;
        }
        
        .page-button {
          padding: 8px 15px;
          border: 1px solid #ddd;
          background: white;
          color: #333;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .page-button:hover {
          background: #f0f0f0;
        }
        
        .page-button.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }
        
        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
          }
        }
        
        @media (max-width: 480px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Blog;