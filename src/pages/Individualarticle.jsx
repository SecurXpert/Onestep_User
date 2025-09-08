// import React, { useEffect } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// // import derma from '../assets/derma.png';
// // import food1 from '../assets/avoidfoodskin.jpg';
// // import damageskin from '../assets/damageskin.jpg';
// import damagingeye from '../assets/damagingeye.jpg';
// import damagteeth from '../assets/damagteeth.jpg';
// import eyedamage from '../assets/eyedamage.jpg';
// // import skinacne from '../assets/skinacne.jpg';
//  import foodteeth from '../assets/foodteeth.jpg';
//  import teeths from '../assets/teeths.jpg';
//  import avoidfood from '../assets/foodavoidPregnency.jpg';
//  import womenfertility from '../assets/womenfertility.jpg';
//  import boost from '../assets/fertilityboost.jpg';
//  import foodeye from '../assets/foodeye.jpg'

// const IndividualArticle = () => {
//   const { name } = useParams();
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [name]);

//   // Articles data array with correct image references
//   const articlesData = [
//     {
//       id: '1',
//       title: 'TOP 5 FOODS THAT NATURALLY WHITEN YOUR TEETH',
//       author: 'Ms. Swati Kapoor, Dentist',
//       summary: `If you're dreaming of a brighter smile, you'll want to learn about the food that **_naturally whiten your teeth_**. Professional teeth whitening treatments are available, but nature offers powerful alternatives right in your kitchen. These foods can help to make your teeth appear brighter and support overall oral health. Add these delicious additions to your daily routine.
// Common Causes of Tooth Discoloration
// Discoloured or stained teeth are a common issue caused by:
// 1. Coffee, tea or red wine
// 2. Smoking or tobacco use
// 3. Poor oral hygiene
// 4. Sugary or acidic foods
// While brushing, flossing and dental visits are important, your food choices also play a major role in keeping your teeth white. Let's dive into the top foods that act like natural cleansers. Add these delicious additions to your daily routine.

// 1. Fresh Fruits and Vegetables (Apples, Carrots & Celery)
// 2. Strawberries
// 3. Pineapple
// 4. Dairy Products (Cheese, Milk & Yoghurt)
// 5. Nuts and Seeds
// `,
//       tips: [
//         'Eat these top 5 foods that naturally whiten your teeth regularly as part of a balanced diet.',
//         'Wait at least 30 minutes before brushing your teeth.',
//         'Limit or avoid foods and drinks known to stain teeth, such as coffee and red wine.',
//         'Add these foods to your routine grocery list.',
//         'Create snack boxes with raw carrots, apples or cheese.',
//         'Share this with your family or friends—they may not know how diet helps in whitening teeth.'
//       ],
//       note: 'Please give internal links for the text "naturally whiten your teeth," which is written in bold and italic.',
//       conclusion: `Achieving a radiant smile doesn't have to rely solely on expensive or chemical treatments. By incorporating the Top 5 Foods That Naturally Whiten Your Teeth into your routine, you'll naturally brighten your teeth and enhance oral health. Remember to combine these foods with proper oral hygiene practices and regular dental care for the best results.`,
//       image: damagteeth,
//       image2: foodteeth,
//       image3: teeths,
//       tags: ['Weight Loss', 'Weight Training'],
//       likes: 702,
//       metaTitle: 'Top 5 Foods That Naturally Whiten Your Teeth',
//       description: 'Brighten your smile naturally. Discover five teeth-whitening foods like apples, nuts & cheese. Get expert oral care tips from One Step Medi.'
//     },
//     {
//       id: '2',
//       title: 'BEST FERTILITY FOODS FOR WOMEN DURING PREGNANCY',
//       author: 'Dr. Govindaraja S.J, Gynecologist',
//       summary: `Eating right during pregnancy isn't just about satisfying cravings it's about nourishing your baby from the very beginning. The foods you choose directly impact your baby's growth, brain development and your overall health. In this guide, we'll explore the **_fertility foods for women_** during pregnancy, boosting and healthy pregnancy foods every woman should include in her diet to ensure a healthy pregnancy and smooth delivery.

// Why Eating Healthy Matters When You're Trying to Get Pregnant
// Eating healthy before and during early pregnancy gives your baby the best start. Here's why:
// Supports Hormonal Balance – Nutrients help regulate estrogen, progesterone and ovulation.
// Improves Egg Quality – Antioxidants, vitamins and minerals protect reproductive cells.
// Reduces Risk of Birth Defects – Folate, iron and B vitamins are crucial in the early stages.
// Prepares for a Smooth Pregnancy – A well-nourished body handles pregnancy stress better.
// Boosts Fertility Naturally – Healthy eating improves chances of natural conception.

// Top Fertility-Boosting Foods
// Leafy Greens & Broccoli – Rich in folate and iron for ovulation support
// Avocados, Nuts & Chia Seeds – Healthy fats that boost hormone health
// Whole Grains (Oats & Quinoa) – Balance blood sugar and support ovulation
// Lentils, Beans & Tofu – Plant proteins improve egg quality
// Berries & Citrus Fruits – Antioxidants protect eggs and sperm
// Full Fat Dairy – Linked to better fertility outcomes in women
// Eggs, Seeds & Shellfish – High in zinc and selenium for reproductive health
// Plenty of Water – Keeps cervical mucus healthy

// Foods to Avoid
// Sugary & processed foods
// Red & processed meats
// Excess caffeine & alcohol
// Trans fats (found in fried/junk foods)

// DIET PLAN: What to eat in a day
// Breakfast: Oatmeal + berries + boiled egg or one seasonal fruit + vegetable upma + 5 soaked almonds
// Lunch: Brown rice/roti + seasonal sabzi + curd + raw salad
// Dinner: Vegetable khichdi or roti + light sabzi + dal + warm milk before bed
// Snacks: Yoghurt, nuts & citrus fruits`,
//       tips: [
//         'Eat fresh & hygienic foods daily',
//         'Stay hydrated (8–10 glasses of water)',
//         'Include both partners in the fertility diet',
//         'Take a prenatal vitamin (with folate)'
//       ],
//       note: 'Give internal links for the text "fertility foods for women" which is in bold and italic.',
//       conclusion: `A nutrient-rich diet filled with fertility foods for women can significantly enhance your chances of conceiving naturally and support a healthy early pregnancy. Start with small & consistent changes like adding leafy greens, seeds and whole grains to give your body the nourishment it needs for optimal reproductive health.`,
//       image: avoidfood,
//       image2: womenfertility,
//       image3: boost,
//       tags: ['Immunity'],
//       likes: 8,
//       metaTitle: 'Best fertility foods for women during pregnancy.',
//       description: 'Discover the best fertility-boosting foods for women during pregnancy. Support baby\'s growth and your health with these nutrient-rich, natural foods.'
//     },
//     {
//       id: '3',
//       title: 'BEST FOODS FOR EYE HEALTH',
//       author: 'Women\'s Health',
//       summary: `Discover the **_foods for eye health_** that protect against digital eye strain, dryness, cataracts and macular degeneration. Rich in vitamin A, lutein and omega-3s, these superfoods help maintain clear, healthy vision in the digital age.

// Everyday Habits That Damage Vision
// With the rise of screen usage in our daily lives, maintaining optimal eye health has become more crucial than ever. Digital eye strain, dry eyes, blurred vision and long-term conditions such as cataracts or macular degeneration are increasingly common.

// Nutrition Tips for Digital Eye Health
// The good news is that a nutrient-rich diet can help protect your vision. In this article, you'll discover top eye-friendly foods that reduce digital strain, nourish your eyes and support long-term eye health. Start eating smart for clearer, stronger vision.

// 1. Carrots: Rich in Vitamin A
// 2. Leafy Greens: Lutein & Zeaxanthin Essentials
// 3. Fatty Fish: Omega-3 for Retinal & Tear Health
// 4. Eggs: A Complete Eye Health Package
// 5. Citrus Fruits: Vitamin C for Eye Tissue Repair
// 6. Nuts and Seeds: Vitamin E & Zinc Power
// 7. Sweet Potatoes: Hydration & Beta-Carotene Support

// Foods to avoid for eye health
// - Sugary foods & white carbs
// - Fried & processed foods
// - Too much salt
// - Alcohol
// - Artificial sweeteners & preservatives
// - Processed meats`,
//       tips: [
//         'Include a rainbow of fruits and vegetables high in antioxidants.',
//         'Consume omega-3-rich foods at least twice a week.',
//         'Stay hydrated to support tear production.',
//         'Reduce processed foods and added sugars, which can trigger inflammation.',
//         'Take regular screen breaks to reduce digital strain (20-20-20 rule)'
//       ],
//       note: 'Give internal links for the text which has bold and italic text "foods for eye health".',
//       conclusion: `In an era dominated by screens and digital interaction, prioritising foods for eye health is more important than ever. Including these scientifically-backed, vision-boosting foods in your daily routine can help protect against digital strain, dryness and long-term degeneration naturally and effectively.`,
//       image: damagingeye,
//       image2: foodeye,
//       image3: eyedamage,
//       tags: [],
//       likes: 160,
//       metaTitle: 'Best foods for eye health',
//       description: 'Protect your vision from digital strain and more with the best foods for eye health, rich in vitamin A, lutein and omega-3s. Eat smart for healthy eyes.'
//     }
//   ];

//   // Find the article by name (from URL params or state)
//   const articleName = decodeURIComponent(name) || state?.name || '';
//   const selectedArticle = articlesData.find((item) => item.title.toLowerCase() === articleName.toLowerCase()) || {};

//   // Handle internal links for bold and italic text as specified in the note
//   const renderSummaryWithLinks = (summary, note) => {
//     if (!summary || !note) return summary;
//     const linkTextMatch = note.match(/"([^"]+)"/); // Extract text between quotes
//     if (!linkTextMatch) return summary;
//     const linkText = linkTextMatch[1];
//     const regex = new RegExp(`(\\*\\*\\_${linkText}\\*\\*\\_)`, 'g');
//     return summary.replace(regex, `<a href="/${linkText.replace(/\s+/g, '-').toLowerCase()}" class="text-blue-600 underline">${linkText}</a>`);
//   };

//   const handleBack = () => {
//     navigate(-1); // Go back to the previous page
//   };

//   // If no article is found, display a fallback message
//   if (!selectedArticle.title) {
//     return (
//       <div className="w-full bg-white flex flex-col items-center relative overflow-hidden">
//         <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg relative z-10">
//           <button
//             onClick={handleBack}
//             className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Back
//           </button>
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Article Not Found</h2>
//           <p className="text-gray-600">Sorry, the article you are looking for does not exist.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full bg-white flex flex-col items-center relative overflow-hidden">
//       {/* Banner Section - Full Width */}
//       <div className="w-full bg-gradient-to-r min-h-[40vh] from-blue-100 to-teal-100 flex flex-col items-center justify-center rounded-none shadow-lg p-4 sm:p-8 mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
//           {selectedArticle.title || 'Article'}
//         </h1>
//         <p className="text-lg text-gray-700">{selectedArticle.author || 'Unknown Author'}</p>
//       </div>

//       {/* Decorative Line Element */}
//       <div className="absolute top-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-1/2"></div>

//       {/* Article Content - Two-Column Layout */}
//       <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg relative z-10">
//         <button
//           onClick={handleBack}
//           className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Back
//         </button>

//         {/* First Row: Description and Summary (Left), Image (Right) */}
//         <div className="flex flex-col md:flex-row gap-6 mb-12">
//           <div className="md:w-1/2">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description & Summary</h2>
//             <div
//               className="text-gray-600 mb-4"
//               dangerouslySetInnerHTML={{ __html: renderSummaryWithLinks(selectedArticle.summary, selectedArticle.note) }}
//             />
//           </div>
//           <div className="md:w-1/2 flex justify-center">
//             <img
//               src={selectedArticle.image}
//               alt={`${selectedArticle.title || 'Article'} - Image 1`}
//               className="w-full max-w-md h-auto object-cover rounded-lg"
//               onError={(e) => {
//                 e.target.src = '/images/fallback.jpg';
//               }}
//             />
//           </div>
//         </div>

//         {/* Second Row: Image (Left), Tips (Right) */}
//         <div className="flex flex-col md:flex-row gap-6 mb-12">
//           <div className="md:w-1/2 flex justify-center">
//             <img
//               src={selectedArticle.image2}
//               alt={`${selectedArticle.title || 'Article'} - Image 2`}
//               className="w-full max-w-md h-auto object-cover rounded-lg"
//               onError={(e) => {
//                 e.target.src = '/images/fallback2.jpg';
//               }}
//             />
//           </div>
//           <div className="md:w-1/2">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tips</h2>
//             {selectedArticle.tips && selectedArticle.tips.length > 0 ? (
//               <ul className="list-disc pl-5 text-gray-600">
//                 {selectedArticle.tips.map((tip, index) => (
//                   <li key={index} className="mb-2">{tip}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-600">No tips available.</p>
//             )}
//           </div>
//         </div>

//         {/* Third Row: Conclusion and Note (Left), Image (Right) */}
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="md:w-1/2">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Conclusion</h2>
//             <p className="text-gray-600 mb-4">{selectedArticle.conclusion || 'No conclusion available.'}</p>
//             {selectedArticle.note && (
//               <>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Note</h3>
//                 <p className="text-gray-600">{selectedArticle.note}</p>
//               </>
//             )}
//           </div>
//           <div className="md:w-1/2 flex justify-center">
//             <img
//               src={selectedArticle.image3}
//               alt={`${selectedArticle.title || 'Article'} - Image 3`}
//               className="w-full max-w-md h-auto object-cover rounded-lg"
//               onError={(e) => {
//                 e.target.src = '/images/fallback3.jpg';
//               }}
//             />
//           </div>
//         </div>

//         {/* Tags and Likes */}
//         {selectedArticle.tags && selectedArticle.tags.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-4 mt-8">
//             {selectedArticle.tags.map((tag, index) => (
//               <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}
//         <div className="flex items-center text-gray-500">
//           <span className="mr-2">❤️ {selectedArticle.likes || 0}</span>
//           <span>💬</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IndividualArticle;


import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import damagingeye from '../assets/damagingeye.jpg';
import damagteeth from '../assets/damagteeth.jpg';
import eyedamage from '../assets/eyedamage.jpg';
import foodteeth from '../assets/foodteeth.jpg';
import teeths from '../assets/teeths.jpg';
import avoidfood from '../assets/foodavoidPregnency.jpg';
import womenfertility from '../assets/womenfertility.jpg';
import boost from '../assets/fertilityboost.jpg';
import foodeye from '../assets/foodeye.jpg';

const IndividualArticle = () => {
  const { name } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [name]);

  // Articles data array with correct image references
  const articlesData = [
    {
      id: '1',
      title: 'TOP 5 FOODS THAT NATURALLY WHITEN YOUR TEETH',
      author: 'Ms. Swati Kapoor, Dentist',
      summary: `If you're dreaming of a brighter smile, you'll want to learn about the food that **_naturally whiten your teeth_**. Professional teeth whitening treatments are available, but nature offers powerful alternatives right in your kitchen. These foods can help to make your teeth appear brighter and support overall oral health. Add these delicious additions to your daily routine.
Common Causes of Tooth Discoloration
Discoloured or stained teeth are a common issue caused by:
1. Coffee, tea or red wine
2. Smoking or tobacco use
3. Poor oral hygiene
4. Sugary or acidic foods
While brushing, flossing and dental visits are important, your food choices also play a major role in keeping your teeth white. Let's dive into the top foods that act like natural cleansers. Add these delicious additions to your daily routine.

1. Fresh Fruits and Vegetables (Apples, Carrots & Celery)
2. Strawberries
3. Pineapple
4. Dairy Products (Cheese, Milk & Yoghurt)
5. Nuts and Seeds
`,
      tips: [
        'Eat these top 5 foods that naturally whiten your teeth regularly as part of a balanced diet.',
        'Wait at least 30 minutes before brushing your teeth.',
        'Limit or avoid foods and drinks known to stain teeth, such as coffee and red wine.',
        'Add these foods to your routine grocery list.',
        'Create snack boxes with raw carrots, apples or cheese.',
        'Share this with your family or friends—they may not know how diet helps in whitening teeth.'
      ],
      note: 'Please give internal links for the text "naturally whiten your teeth," which is written in bold and italic.',
      conclusion: `Achieving a radiant smile doesn't have to rely solely on expensive or chemical treatments. By incorporating the Top 5 Foods That Naturally Whiten Your Teeth into your routine, you'll naturally brighten your teeth and enhance oral health. Remember to combine these foods with proper oral hygiene practices and regular dental care for the best results.`,
      image: damagteeth,
      image2: foodteeth,
      image3: teeths,
      tags: ['Weight Loss', 'Weight Training'],
      likes: 702,
      metaTitle: 'Top 5 Foods That Naturally Whiten Your Teeth',
      description: 'Brighten your smile naturally. Discover five teeth-whitening foods like apples, nuts & cheese. Get expert oral care tips from One Step Medi.'
    },
    {
      id: '2',
      title: 'BEST FERTILITY FOODS FOR WOMEN DURING PREGNANCY',
      author: 'Dr. Govindaraja S.J, Gynecologist',
      summary: `Eating right during pregnancy isn't just about satisfying cravings it's about nourishing your baby from the very beginning. The foods you choose directly impact your baby's growth, brain development and your overall health. In this guide, we'll explore the **_fertility foods for women_** during pregnancy, boosting and healthy pregnancy foods every woman should include in her diet to ensure a healthy pregnancy and smooth delivery.

Why Eating Healthy Matters When You're Trying to Get Pregnant
Eating healthy before and during early pregnancy gives your baby the best start. Here's why:
Supports Hormonal Balance – Nutrients help regulate estrogen, progesterone and ovulation.
Improves Egg Quality – Antioxidants, vitamins and minerals protect reproductive cells.
Reduces Risk of Birth Defects – Folate, iron and B vitamins are crucial in the early stages.
Prepares for a Smooth Pregnancy – A well-nourished body handles pregnancy stress better.
Boosts Fertility Naturally – Healthy eating improves chances of natural conception.

Top Fertility-Boosting Foods
Leafy Greens & Broccoli – Rich in folate and iron for ovulation support
Avocados, Nuts & Chia Seeds – Healthy fats that boost hormone health
Whole Grains (Oats & Quinoa) – Balance blood sugar and support ovulation
Lentils, Beans & Tofu – Plant proteins improve egg quality
Berries & Citrus Fruits – Antioxidants protect eggs and sperm
Full Fat Dairy – Linked to better fertility outcomes in women
Eggs, Seeds & Shellfish – High in zinc and selenium for reproductive health
Plenty of Water – Keeps cervical mucus healthy

Foods to Avoid
Sugary & processed foods
Red & processed meats
Excess caffeine & alcohol
Trans fats (found in fried/junk foods)

DIET PLAN: What to eat in a day
Breakfast: Oatmeal + berries + boiled egg or one seasonal fruit + vegetable upma + 5 soaked almonds
Lunch: Brown rice/roti + seasonal sabzi + curd + raw salad
Dinner: Vegetable khichdi or roti + light sabzi + dal + warm milk before bed
Snacks: Yoghurt, nuts & citrus fruits`,
      tips: [
        'Eat fresh & hygienic foods daily',
        'Stay hydrated (8–10 glasses of water)',
        'Include both partners in the fertility diet',
        'Take a prenatal vitamin (with folate)'
      ],
      note: 'Give internal links for the text "fertility foods for women" which is in bold and italic.',
      conclusion: `A nutrient-rich diet filled with fertility foods for women can significantly enhance your chances of conceiving naturally and support a healthy early pregnancy. Start with small & consistent changes like adding leafy greens, seeds and whole grains to give your body the nourishment it needs for optimal reproductive health.`,
      image: avoidfood,
      image2: womenfertility,
      image3: boost,
      tags: ['Immunity'],
      likes: 8,
      metaTitle: 'Best fertility foods for women during pregnancy.',
      description: 'Discover the best fertility-boosting foods for women during pregnancy. Support baby\'s growth and your health with these nutrient-rich, natural foods.'
    },
    {
      id: '3',
      title: 'BEST FOODS FOR EYE HEALTH',
      author: 'Women\'s Health',
      summary: `Discover the **_foods for eye health_** that protect against digital eye strain, dryness, cataracts and macular degeneration. Rich in vitamin A, lutein and omega-3s, these superfoods help maintain clear, healthy vision in the digital age.

Everyday Habits That Damage Vision
With the rise of screen usage in our daily lives, maintaining optimal eye health has become more crucial than ever. Digital eye strain, dry eyes, blurred vision and long-term conditions such as cataracts or macular degeneration are increasingly common.

Nutrition Tips for Digital Eye Health
The good news is that a nutrient-rich diet can help protect your vision. In this article, you'll discover top eye-friendly foods that reduce digital strain, nourish your eyes and support long-term eye health. Start eating smart for clearer, stronger vision.

1. Carrots: Rich in Vitamin A
2. Leafy Greens: Lutein & Zeaxanthin Essentials
3. Fatty Fish: Omega-3 for Retinal & Tear Health
4. Eggs: A Complete Eye Health Package
5. Citrus Fruits: Vitamin C for Eye Tissue Repair
6. Nuts and Seeds: Vitamin E & Zinc Power
7. Sweet Potatoes: Hydration & Beta-Carotene Support

Foods to avoid for eye health
- Sugary foods & white carbs
- Fried & processed foods
- Too much salt
- Alcohol
- Artificial sweeteners & preservatives
- Processed meats`,
      tips: [
        'Include a rainbow of fruits and vegetables high in antioxidants.',
        'Consume omega-3-rich foods at least twice a week.',
        'Stay hydrated to support tear production.',
        'Reduce processed foods and added sugars, which can trigger inflammation.',
        'Take regular screen breaks to reduce digital strain (20-20-20 rule)'
      ],
      note: 'Give internal links for the text which has bold and italic text "foods for eye health".',
      conclusion: `In an era dominated by screens and digital interaction, prioritising foods for eye health is more important than ever. Including these scientifically-backed, vision-boosting foods in your daily routine can help protect against digital strain, dryness and long-term degeneration naturally and effectively.`,
      image: damagingeye,
      image2: foodeye,
      image3: eyedamage,
      tags: [],
      likes: 160,
      metaTitle: 'Best foods for eye health',
      description: 'Protect your vision from digital strain and more with the best foods for eye health, rich in vitamin A, lutein and omega-3s. Eat smart for healthy eyes.'
    }
  ];

  // Find the article by name (from URL params or state)
  const articleName = decodeURIComponent(name) || state?.name || '';
  const selectedArticle = articlesData.find((item) => item.title.toLowerCase() === articleName.toLowerCase()) || {};

  // Handle internal links for bold and italic text as specified in the note
  const renderSummaryWithLinks = (summary, note) => {
    if (!summary || !note) return summary;
    const linkTextMatch = note.match(/"([^"]+)"/); // Extract text between quotes
    if (!linkTextMatch) return summary;
    const linkText = linkTextMatch[1];
    const regex = new RegExp(`(\\*\\*\\_${linkText}\\*\\*\\_)`, 'g');
    return summary.replace(regex, `<a href="/${linkText.replace(/\s+/g, '-').toLowerCase()}" class="text-blue-600 underline">${linkText}</a>`);
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // If no article is found, display a fallback message
  if (!selectedArticle.title) {
    return (
      <div className="w-full bg-white flex flex-col items-center relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg relative z-10">
          <button
            onClick={handleBack}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back
          </button>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Article Not Found</h2>
          <p className="text-gray-600">Sorry, the article you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white flex flex-col items-center relative overflow-hidden">
      {/* Banner Section - Full Width */}
      <div className="w-full bg-b3d8e4-gradient min-h-[40vh] from-blue-100 to-teal-100 flex flex-row items-center justify-center rounded-none shadow-lg p-4 sm:p-8 mb-12 gap-6">
       
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            {selectedArticle.title || 'Article'}
          </h1>
          <p className="text-lg text-gray-700">{selectedArticle.author || 'Unknown Author'}</p>
        </div>
         <div className="flex-shrink-0">
          <img
            src={state?.image || selectedArticle.image}
            alt={`${selectedArticle.title || 'Article'} - Banner`}
            className="w-full max-w-md h-auto object-cover rounded-lg"
            onError={(e) => {
              e.target.src = '/images/fallback.jpg';
            }}
          />
        </div>
      </div>

      {/* Decorative Line Element */}
      <div className="absolute top-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-1/2"></div>

      {/* Article Content - Two-Column Layout */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg relative z-10">
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back
        </button>

        {/* First Row: Description and Summary (Left), Image (Right) */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description & Summary</h2>
            <div
              className="text-gray-600 mb-4"
              dangerouslySetInnerHTML={{ __html: renderSummaryWithLinks(selectedArticle.summary, selectedArticle.note) }}
            />
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={selectedArticle.image}
              alt={`${selectedArticle.title || 'Article'} - Image 1`}
              className="w-full max-w-md h-auto object-cover rounded-lg"
              onError={(e) => {
                e.target.src = '/images/fallback.jpg';
              }}
            />
          </div>
        </div>

        {/* Second Row: Image (Left), Tips (Right) */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="md:w-1/2 flex justify-center">
            <img
              src={selectedArticle.image2}
              alt={`${selectedArticle.title || 'Article'} - Image 2`}
              className="w-full max-w-md h-auto object-cover rounded-lg"
              onError={(e) => {
                e.target.src = '/images/fallback2.jpg';
              }}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tips</h2>
            {selectedArticle.tips && selectedArticle.tips.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-600">
                {selectedArticle.tips.map((tip, index) => (
                  <li key={index} className="mb-2">{tip}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No tips available.</p>
            )}
          </div>
        </div>

        {/* Third Row: Conclusion and Note (Left), Image (Right) */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Conclusion</h2>
            <p className="text-gray-600 mb-4">{selectedArticle.conclusion || 'No conclusion available.'}</p>
            {selectedArticle.note && (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Note</h3>
                <p className="text-gray-600">{selectedArticle.note}</p>
              </>
            )}
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={selectedArticle.image3}
              alt={`${selectedArticle.title || 'Article'} - Image 3`}
              className="w-full max-w-md h-auto object-cover rounded-lg"
              onError={(e) => {
                e.target.src = '/images/fallback3.jpg';
              }}
            />
          </div>
        </div>

        {/* Tags and Likes */}
        {selectedArticle.tags && selectedArticle.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 mt-8">
            {selectedArticle.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center text-gray-500">
          <span className="mr-2">❤️ {selectedArticle.likes || 0}</span>
          <span>💬</span>
        </div>
      </div>
    </div>
  );
};

export default IndividualArticle;