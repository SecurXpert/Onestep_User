import React, { useState, useEffect } from "react";

// Blog data (kept exactly as given)
const blogData = [
  {
    id: 0,
    title:
      "Saunf Water Benefits: Nutrients And Health Advantages Of Drinking Saunf Water",
    date: "23.07.25",
    // url: "https://www.apollo247.com/blog/article/saunf-water-benefits-nutrients-and-health-advantages-of-drinking-saunf-water",
    image:
      "https://images.apollo247.in/pd-cms/cms/2025-02/saunf%20water%20benefits%20(1).jpg",
  },
  {
    id: 1,
    title: "5 Best Massage Oils: Natural Joint Pain Healers",
    date: "22.07.25",
    // url: "https://www.apollo247.com/blog/article/massage-oil-for-joint-pains",
    image:
      "https://images.apollo247.in/pd-cms/cms/2022-11/man-bent-her-head-grabbed-him-her-after-exercise.jpg",
  },
  {
    id: 2,
    title: "Experiencing Goosebumps Unusually? Know What It Can Mean",
    date: "13.07.25",
    // url: "https://www.apollo247.com/blog/article/goosebumps-and-health-disorders",
    image: "https://images.apollo247.in/pd-cms/cms/2022-06/goosebumps.jpg",
  },
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

const PER_PAGE = 6;

const BlogCard = ({ blog }) => {
  const { title, date, url, image } = blog;

  // keep your srcset approach
  const srcset = `
    ${image}?tr=q-80,f-webp,w-300,dpr-1,c-at_max 300w,
    ${image}?tr=q-80,f-webp,w-300,dpr-2,c-at_max 600w,
    ${image}?tr=q-80,f-webp,w-300,dpr-3,c-at_max 900w
  `;

  const safeHref = url || "#";

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm hover:shadow-lg transition">
      <a
        href={safeHref}
        className="block h-full"
        target={url ? "_blank" : undefined}
        rel={url ? "noopener noreferrer" : undefined}
      >
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            srcSet={srcset}
            src={`${image}?tr=q-80,f-webp,w-300,dpr-2,c-at_max`}
            sizes="(max-width: 768px) 100vw, 300px"
            alt={title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/600x450?text=Image";
            }}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
          />
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-[15px] sm:text-base font-semibold text-gray-900">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            By OneStep Medi — {date}
          </p>
        </div>
      </a>

      {/* bottom gradient accent on hover */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </article>
  );
};

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogData.length / PER_PAGE);
  const indexOfLastBlog = currentPage * PER_PAGE;
  const indexOfFirstBlog = indexOfLastBlog - PER_PAGE;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const next = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  useEffect(() => {
    // scroll to top of list on page change (mobile-friendly)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero header (design only; content preserved) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 opacity-90" />
        <svg
          className="absolute -top-10 -right-10 w-[320px] sm:w-[420px] opacity-20"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="#ffffff"
            d="M46.3,-60.4C58.5,-52.6,65.7,-39.2,70.8,-24.9C75.8,-10.6,78.6,4.7,73.7,17.5C68.7,30.4,56,40.7,42.5,51.8C29,62.8,14.5,74.5,-0.4,75.1C-15.3,75.7,-30.6,65.1,-44.7,53.7C-58.9,42.4,-71.9,30.4,-77,15.3C-82.1,0.3,-79.4,-18,-70.9,-31.7C-62.4,-45.4,-48.1,-54.6,-33.6,-62.9C-19.1,-71.2,-9.6,-78.6,3.1,-83.1C15.7,-87.6,31.5,-89.1,46.3,-60.4Z"
          />
        </svg>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Health Blog
          </h1>
          <p className="mt-3 text-center text-indigo-100 text-base sm:text-lg">
            Read quick tips and deep dives on health & wellness.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Pagination (keeps your logic, adds prev/next + better UI) */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={prev}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            <div className="flex flex-wrap items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => paginate(num)}
                  className={`px-3 sm:px-4 py-2 rounded-lg border text-sm font-medium transition
                    ${
                      currentPage === num
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  aria-current={currentPage === num ? "page" : undefined}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              onClick={next}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Blog;
