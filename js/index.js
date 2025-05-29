
    // Tailwind CSS configuration
    tailwind.config = {
        theme: {
            extend: {
                animation: { // Custom animations
                    'float': 'float 6s ease-in-out infinite',
                    'glow': 'glow 2s ease-in-out infinite alternate',
                    'slide-up': 'slideUp 0.8s ease-out',
                    'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    'bounce-slow': 'bounce 2s infinite', // Slower bounce animation
                    'spin-slow': 'spin 3s linear infinite', // Slower spin animation
                },
                keyframes: { // Definitions for custom animations
                    float: {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-20px)' }
                    },
                    glow: {
                        '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
                        '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)' }
                    },
                    slideUp: {
                        '0%': { transform: 'translateY(100px)', opacity: '0' },
                        '100%': { transform: 'translateY(0)', opacity: '1' }
                    }
                }
            }
        }
    }
