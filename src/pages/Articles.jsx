// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import banner from '../assets/banner.jpg';
// import derma from '../assets/derma.png';
// // import food1 from '../assets/avoidfoodskin.jpg';
// // import damageskin from '../assets/damageskin.jpg';
// // import damagingeye from '../assets/damagingeye.jpg';
// import damagteeth from '../assets/damagteeth.jpg';
// import eyedamage from '../assets/eyedamage.jpg';
// import skinacne from '../assets/skinacne.jpg';
// import eyes from '../assets/eyes.jpg';
// import womenfertility from '../assets/womenfertility.jpg';
// // import foodskin from '../assets/foodskin.jpg';
// // import foodteeth from '../assets/foodteeth.jpg';
// import teeth1 from '../assets/teeth-1.jpg';


// const articles = [
//   {
//     name: 'TOP 5 FOODS THAT NATURALLY WHITEN YOUR TEETH',
//     image: teeth1,
//     image1: banner,
//     image2: derma,
//     image3: damagteeth,
//     previewContent: `Dreaming of a brighter smile? Discover the top foods that naturally whiten your teeth...`,
//     fullContent: `Dreaming of a brighter smile? Professional teeth whitening treatments are available, but nature offers powerful solutions too. Foods like strawberries, apples, celery, carrots, and dairy products such as yogurt and cheese can help remove stains and promote oral health. Strawberries contain malic acid, which acts as a natural astringent to remove surface stains. Apples and celery increase saliva production, which helps clean teeth naturally. Carrots are rich in fiber, aiding in scrubbing away plaque, while dairy products provide calcium and phosphates that strengthen enamel. Incorporate these foods into your diet for a naturally brighter smile!`,
//     tags: ['Weight Loss', 'Weight Training'],
//     likes: 702,
//   },
//   {
//     name: 'BEST FERTILITY FOODS FOR WOMEN DURING PREGNANCY',
//     image: womenfertility,
//     image2: eyedamage,
//     image3: skinacne,
//     previewContent: `The foods you choose during pregnancy impact your baby's growth and your health...`,
//     fullContent: `The foods you choose directly impact your baby's growth, brain development, and your overall health. During pregnancy, nutrient-rich foods are essential for a healthy pregnancy and smooth delivery. Include folate-rich foods like leafy greens, avocados, and lentils to support neural tube development. Omega-3 fatty acids from salmon and chia seeds promote brain health. Iron-rich foods such as spinach and lean meats prevent anemia, while calcium from dairy or fortified plant-based milk supports bone development. Probiotics from yogurt can enhance gut health, benefiting both mother and baby. Ensure a balanced diet with these fertility-boosting foods for a healthy pregnancy!`,
//     tags: ['Immunity'],
//     likes: 8,
//   },
//   {
//     name: 'BEST FOODS FOR EYE HEALTH',
//     image: eyes,
//     image2: '/images/skin-care2.jpg',
//     image3: '/images/skin-care3.jpg',
//     previewContent: `Discover the foods for eye health that protect against digital eye strain, dryness, cataracts and macular degeneration...`,
//     fullContent: `While skincare products help externally, true radiance comes from within. The best foods for glowing skin are packed with antioxidants, vitamins, and healthy fats. Berries like blueberries and raspberries are rich in antioxidants that combat free radicals, reducing signs of aging. Avocados provide healthy fats and vitamin E for skin hydration. Nuts like almonds and walnuts offer zinc to fight acne. Leafy greens such as spinach and kale are loaded with vitamins A and C, promoting cell turnover and collagen production. Fatty fish like salmon provides omega-3s to reduce inflammation. Hydrate with water and green tea to flush out toxins and achieve a radiant complexion!`,
//     tags: [],
//     likes: 160,
//   },
// ];

// const ArticlesPage = () => {
//   const navigate = useNavigate();

//   const handleArticleClick = (article) => {
//     navigate(`/article/${encodeURIComponent(article.name)}`, { state: { name: article.name } });
//   };

//   return (
//     <div className="w-full bg-white flex flex-col items-center relative overflow-hidden">
//       {/* Banner Section - Full Width */}
//       <div className="w-full bg-b3d8e4-gradient flex flex-col md:flex-row items-center justify-between rounded-none shadow-lg p-4 sm:p-8 mb-12">
//         {/* Left Content */}
//         <div className="w-full md:w-1/2 mb-6 md:mb-0 text-center px-4 sm:px-8">
//           <h1 className="text-4xl md:text-5xl font-bold text-custom-blue mb-4">
//             ARTICLES
//           </h1>
//           <h1 className="text-3xl md:text-4xl font-bold text-custom-blue mb-4" >
//             Explore Health Tips, Doctor Advice & Wellness Guides
//           </h1>
//           <p className="text-custom-blue font-medium md:text-lg mb-4">
//             Stay updated with the latest health trends, expert wellness tips,
//           </p>
//           <p className="text-custom-blue font-medium  md:text-lg mb-6">
//             and nutrition advice—all simplified to help you and your family live healthier every day.
//           </p>
//         </div>

//         {/* Right Image */}
//         <div className="w-full md:w-1/2 flex justify-center px-4 sm:px-8">
//           <img
//             src={banner}
//             alt="Healthcare"
//             className="w-full max-w-md h-auto object-cover rounded-lg"
//             onError={(e) => {
//               e.target.src = '/images/fallback.jpg'; // Fallback image in case of error
//             }}
//           />
//         </div>
//       </div>

//       {/* Decorative Line Element */}
//       <div className="absolute top-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-1/2"></div>

//       {/* Articles Section */}
//       <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg relative z-10">
//         <h1 className="text-2xl font-semibold text-gray-700 mb-6">Top Health Articles</h1>
//         <p className="text-gray-600 mb-6">Trending tips from doctors and health experts</p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {articles.map((article, index) => (
//             <div
//               key={`${article.name}-${index}`}
//               className="flex flex-col items-start border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
//               onClick={() => handleArticleClick(article)}
//             >
//               <div className="w-full mb-2">
//                 <img
//                   src={article.image}
//                   alt={article.name}
//                   className="w-full h-48 object-cover rounded-lg"
//                   onError={(e) => {
//                     e.target.src = '/images/fallback.jpg'; // Fallback image
//                   }}
//                 />
//               </div>
//               <h3 className="text-md font-medium text-gray-800 mb-2">{article.name}</h3>
//               <p className="text-sm text-gray-600 mb-2">{article.previewContent}</p>
//               <div className="flex flex-wrap gap-2 mb-2">
//                 {article.tags.length > 0 &&
//                   article.tags.map((tag, tagIndex) => (
//                     <span key={`${tag}-${tagIndex}`} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
//                       {tag}
//                     </span>
//                   ))}
//               </div>
//               <div className="flex items-center text-gray-500">
//                 <span className="mr-2">❤️ {article.likes}</span>
//                 <span>💬</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArticlesPage;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/art.png';
import derma from '../assets/derma.png';
import damagteeth from '../assets/damagteeth.jpg';
import eyedamage from '../assets/eyedamage.jpg';
import skinacne from '../assets/skinacne.jpg';
import eyes from '../assets/eyes.jpg';
import womenfertility from '../assets/womenfertility.jpg';
import teeth1 from '../assets/teeth-1.jpg';

const articles = [
  {
    name: 'TOP 5 FOODS THAT NATURALLY WHITEN YOUR TEETH',
    image: teeth1,
    image1: banner,
    image2: derma,
    image3: damagteeth,
    previewContent: `Dreaming of a brighter smile? Discover the top foods that naturally whiten your teeth...`,
    fullContent: `Dreaming of a brighter smile? Professional teeth whitening treatments are available, but nature offers powerful solutions too. Foods like strawberries, apples, celery, carrots, and dairy products such as yogurt and cheese can help remove stains and promote oral health. Strawberries contain malic acid, which acts as a natural astringent to remove surface stains. Apples and celery increase saliva production, which helps clean teeth naturally. Carrots are rich in fiber, aiding in scrubbing away plaque, while dairy products provide calcium and phosphates that strengthen enamel. Incorporate these foods into your diet for a naturally brighter smile!`,
    tags: ['Weight Loss', 'Weight Training'],
    likes: 702,
  },
  {
    name: 'BEST FERTILITY FOODS FOR WOMEN DURING PREGNANCY',
    image: womenfertility,
    image2: eyedamage,
    image3: skinacne,
    previewContent: `The foods you choose during pregnancy impact your baby's growth and your health...`,
    fullContent: `The foods you choose directly impact your baby's growth, brain development, and your overall health. During pregnancy, nutrient-rich foods are essential for a healthy pregnancy and smooth delivery. Include folate-rich foods like leafy greens, avocados, and lentils to support neural tube development. Omega-3 fatty acids from salmon and chia seeds promote brain health. Iron-rich foods such as spinach and lean meats prevent anemia, while calcium from dairy or fortified plant-based milk supports bone development. Probiotics from yogurt can enhance gut health, benefiting both mother and baby. Ensure a balanced diet with these fertility-boosting foods for a healthy pregnancy!`,
    tags: ['Immunity'],
    likes: 8,
  },
  {
    name: 'BEST FOODS FOR EYE HEALTH',
    image: eyes,
    image2: '/images/skin-care2.jpg',
    image3: '/images/skin-care3.jpg',
    previewContent: `Discover the foods for eye health that protect against digital eye strain, dryness, cataracts and macular degeneration...`,
    fullContent: `While skincare products help externally, true radiance comes from within. The best foods for glowing skin are packed with antioxidants, vitamins, and healthy fats. Berries like blueberries and raspberries are rich in antioxidants that combat free radicals, reducing signs of aging. Avocados provide healthy fats and vitamin E for skin hydration. Nuts like almonds and walnuts offer zinc to fight acne. Leafy greens such as spinach and kale are loaded with vitamins A and C, promoting cell turnover and collagen production. Fatty fish like salmon provides omega-3s to reduce inflammation. Hydrate with water and green tea to flush out toxins and achieve a radiant complexion!`,
    tags: [],
    likes: 160,
  },
];

const ArticlesPage = () => {
  const navigate = useNavigate();

  const handleArticleClick = (article) => {
    navigate(`/article/${encodeURIComponent(article.name)}`, { state: { name: article.name, image: article.image } });
  };

  return (
    <div className="w-full bg-white flex flex-col items-center relative overflow-hidden">
      {/* Banner Section - Full Width */}
      <div className="w-full bg-b3d8e4-gradient flex flex-col md:flex-row items-center justify-between rounded-none shadow-lg p-4 sm:p-8 mb-12">
        {/* Left Content */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0 text-center px-4 sm:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-custom-blue mb-4">
            ARTICLES
          </h1>
          <h1 className="text-3xl md:text-4xl font-bold text-custom-blue mb-4" >
            Explore Health Tips, Doctor Advice & Wellness Guides
          </h1>
          <p className="text-custom-blue font-medium md:text-lg mb-4">
            Stay updated with the latest health trends, expert wellness tips,
          </p>
          <p className="text-custom-blue font-medium  md:text-lg mb-6">
            and nutrition advice—all simplified to help you and your family live healthier every day.
          </p>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center px-4 sm:px-8">
          <img
            src={banner}
            alt="Healthcare"
            className="w-full max-w-md h-auto object-cover rounded-lg"
            onError={(e) => {
              e.target.src = '/images/fallback.jpg'; // Fallback image in case of error
            }}
          />
        </div>
      </div>

      {/* Decorative Line Element */}
      <div className="absolute top-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-1/2"></div>

      {/* Articles Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg relative z-10">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Top Health Articles</h1>
        <p className="text-gray-600 mb-6">Trending tips from doctors and health experts</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={`${article.name}-${index}`}
              className="flex flex-col items-start border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleArticleClick(article)}
            >
              <div className="w-full mb-2">
                <img
                  src={article.image}
                  alt={article.name}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = '/images/fallback.jpg'; // Fallback image
                  }}
                />
              </div>
              <h3 className="text-md font-medium text-gray-800 mb-2">{article.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{article.previewContent}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {article.tags.length > 0 &&
                  article.tags.map((tag, tagIndex) => (
                    <span key={`${tag}-${tagIndex}`} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
              </div>
              <div className="flex items-center text-gray-500">
                <span className="mr-2">❤️ {article.likes}</span>
                <span>💬</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;