module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%': {
            transform: 'translate(3px, 0)',
          },
          '50%': {
            transform: 'translate(-3px, 0)',
          },
          '100%': {
            transform: 'translate(0, 0)',
          },
        },
        rotation: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          }
        },
      },
      animation: {
        shake: 'shake 150ms 2 linear',
        'loader-rotation': 'rotation 1s linear infinite', // Renomeado para 'loader-rotation'
      },
    },
    loader: {
      width: '48px',
      height: '48px',
      border: '5px solid #000',
      borderBottomColor: 'transparent',
      borderRadius: '50%',
      display: 'inline-block',
      boxSizing: 'border-box',
    },
  },
  plugins: [],
};
