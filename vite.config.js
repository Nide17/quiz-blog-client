import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
        server: {
            port: 3000,
            host: '0.0.0.0'
        },
        build: {
            outDir: 'build',
            chunkSizeWarningLimit: 1000,
            // Enable asset compression
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                }
            },
            rollupOptions: {
                output: {
                    // Separate assets by type for better caching
                    assetFileNames: (assetInfo) => {
                        if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
                            return `assets/media/[name]-[hash][extname]`;
                        }
                        if (/\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(assetInfo.name)) {
                            return `assets/images/[name]-[hash][extname]`;
                        }
                        if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
                            return `assets/fonts/[name]-[hash][extname]`;
                        }
                        return `assets/[name]-[hash][extname]`;
                    },
                    manualChunks(id) {
                        if (!id.includes('node_modules')) return;

                        // Map packages to their respective chunks
                        const chunks = {
                            'react-vendor': ['react', 'react-dom'],
                            'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
                            'router-vendor': ['react-router-dom'],
                            'ui-vendor': ['bootstrap', 'reactstrap', 'react-tabs', 'react-collapse', 'react-toastify'],
                            'charts-vendor': ['react-google-charts'],
                            'pdf-vendor': ['@react-pdf/renderer'],
                            'utils-vendor': ['axios', 'uuid', 'socket.io-client'],
                            'content-vendor': ['react-markdown', 'rehype-highlight'],
                            'analytics-vendor': ['react-ga4', 'react-adsense', 'web-vitals']
                        };

                        for (const [chunkName, packages] of Object.entries(chunks)) {
                            if (packages.some(pkg => id.includes(`node_modules/${pkg}/`))) {
                                return chunkName;
                            }
                        }
                    }
                }
            }
        },
        plugins: [react()],
        resolve: {
            alias: [{ find: "@", replacement: "/src" }],
        },
        define: {
            global: {},
        }
    };
});
