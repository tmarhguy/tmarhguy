import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen bg-bg-void flex flex-col items-center justify-center text-center"
          style={{ padding: '4rem 3rem' }}
        >
          <div className="max-w-md">
            <div className="font-mono text-[0.65rem] tracking-[0.25em] text-gold-dim uppercase mb-6">
              Something went wrong
            </div>
            <h1 className="font-display text-4xl font-bold text-text-primary mb-4">
              Oops
            </h1>
            <p className="text-[0.95rem] text-cream-dim leading-relaxed mb-8">
              An unexpected error occurred. Please try refreshing the page or return home.
            </p>
            <Link
              to="/"
              className="font-mono text-[0.72rem] tracking-[0.12em] text-gold-champagne hover:text-cream transition-colors no-underline uppercase"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
