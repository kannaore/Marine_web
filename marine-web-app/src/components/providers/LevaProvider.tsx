"use client";

import { Leva } from 'leva';

interface LevaProviderProps {
    children: React.ReactNode;
}

export function LevaProvider({ children }: LevaProviderProps) {
    const isProduction = process.env.NODE_ENV === 'production';
    
    return (
        <>
            <Leva 
                hidden={isProduction}
                collapsed={false}
                oneLineLabels={false}
                flat={false}
                fill={false}
                titleBar={{
                    drag: true,
                    filter: true,
                    title: '🎨 Hero Debug',
                }}
                theme={{
                    sizes: {
                        rootWidth: '340px',
                        controlWidth: '160px',
                        rowHeight: '28px',
                        folderTitleHeight: '28px',
                        titleBarHeight: '32px',
                    },
                    colors: {
                        elevation1: '#1a1a2e',
                        elevation2: '#16213e',
                        elevation3: '#0f3460',
                        accent1: '#70D1E5',
                        accent2: '#e94560',
                        accent3: '#533483',
                        highlight1: '#ffffff',
                        highlight2: '#8f8f8f',
                        highlight3: '#5c5c5c',
                    },
                    fontSizes: {
                        root: '12px',
                    },
                    fonts: {
                        mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    },
                }}
            />
            {/* Custom CSS to fix scrolling */}
            <style jsx global>{`
                /* Fix leva panel scrolling - force max-height and overflow */
                [class*="leva-c-"][class*="kWgxhW"],
                [class*="leva-"][data-leva-root] > div,
                .leva-container > div {
                    max-height: calc(100vh - 40px) !important;
                    overflow-y: auto !important;
                }
                
                /* Target leva panel wrapper */
                div[style*="position: fixed"][style*="right: 10px"] > div {
                    max-height: calc(100vh - 60px) !important;
                    overflow-y: auto !important;
                }
                
                /* Custom scrollbar for leva */
                [class*="leva-"]::-webkit-scrollbar {
                    width: 6px;
                }
                [class*="leva-"]::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 3px;
                }
                [class*="leva-"]::-webkit-scrollbar-thumb {
                    background: rgba(112, 209, 229, 0.4);
                    border-radius: 3px;
                }
                [class*="leva-"]::-webkit-scrollbar-thumb:hover {
                    background: rgba(112, 209, 229, 0.6);
                }
            `}</style>
            {children}
        </>
    );
}
