/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./frontend/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: 'var(--bg)',
                surface: 'var(--surface)',
                raised: 'var(--raised)',
                sunk: 'var(--sunk)',
                ink: 'var(--ink)',
                'ink-2': 'var(--ink-2)',
                'ink-3': 'var(--ink-3)',
                'ink-4': 'var(--ink-4)',
                rule: 'var(--rule)',
                'rule-strong': 'var(--rule-strong)',
                accent: 'var(--accent)',
                'accent-soft': 'var(--accent-soft)',
                danger: 'var(--danger)',
            },
            fontFamily: {
                display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
                sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
            },
            boxShadow: {
                sm: 'var(--shadow-sm)',
                md: 'var(--shadow-md)',
                lg: 'var(--shadow-lg)',
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
