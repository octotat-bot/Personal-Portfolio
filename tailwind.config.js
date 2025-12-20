/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#000000',
                primary: '#FFFFFF',
                secondary: '#808080',
                accent: '#E5E5E5',
                textPrimary: '#FFFFFF',
                textMuted: '#A0A0A0',
                textDark: '#404040',
                cardBg: 'rgba(255,255,255,0.05)',
                cardBgLight: 'rgba(255,255,255,0.08)',
                borderSubtle: 'rgba(255,255,255,0.1)',
                borderLight: 'rgba(255,255,255,0.15)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'display': ['72px', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
                'h1': ['56px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
                'h2': ['40px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
                'h3': ['28px', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
                'body-lg': ['20px', { lineHeight: '1.6', fontWeight: '400' }],
                'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
                'caption': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
            },
            maxWidth: {
                'container': '1320px',
            },
            spacing: {
                'desktop-margin': '64px',
                'mobile-margin': '24px',
            },
            borderRadius: {
                'card': '20px',
                'button': '12px',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'particle': 'particle 20s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { opacity: '0.5' },
                    '100%': { opacity: '1' },
                },
                particle: {
                    '0%': { transform: 'translateY(0) translateX(0)' },
                    '100%': { transform: 'translateY(-100vh) translateX(50px)' },
                },
            },
        },
    },
    plugins: [],
}
