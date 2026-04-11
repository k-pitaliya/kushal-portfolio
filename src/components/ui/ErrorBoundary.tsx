"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[200px] items-center justify-center px-6 py-20">
            <div className="text-center">
              <p className="text-lg font-semibold text-text-muted">
                Something went wrong loading this section.
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="mt-4 rounded-full bg-accent/10 px-6 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
