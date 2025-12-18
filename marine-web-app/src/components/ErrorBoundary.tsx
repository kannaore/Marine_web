"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error to console (can be replaced with error reporting service)
        console.error("ErrorBoundary caught an error:", error, errorInfo);

        // TODO: Send to error reporting service (e.g., Sentry)
        // if (typeof window !== "undefined") {
        //   Sentry.captureException(error);
        // }
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-[400px] flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-white mb-2">
                            문제가 발생했습니다
                        </h2>
                        <p className="text-white/60 mb-4">
                            잠시 후 다시 시도해주세요
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="px-4 py-2 bg-ocean-500 text-white rounded-lg hover:bg-ocean-600 transition-colors"
                        >
                            다시 시도
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
