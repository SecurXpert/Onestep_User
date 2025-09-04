// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
          screens: {
        '2xs': '320px',
        xs: '475px',
        '2sm': '576px',
        sm: '640px',
        md: '768px',
        md800: '800px',
        md900: '900px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1792px',
      },
      colors:{
        'primary': "#5f6fff",
        'custom-blue': '#03045e',
      },

       backgroundImage: {
        'b3d8e4-gradient': 'radial-gradient(circle at center, #EDF8FF 30%, #B3D8E4 100%)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite', // 20s duration, adjustable
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' }, // Start at original position
          '100%': { transform: 'translateX(-50%)' }, // Move left by half (for seamless loop)
        },
        
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.overflow-x-auto': {
          'overflow-x': 'auto',
          /* Hide scrollbar but keep functionality */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
      });
    },
  ],
}
