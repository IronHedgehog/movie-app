import { Component } from "react";

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white px-6">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-2xl font-bold">Something went wrong</h1>

            <p className="text-gray-400 text-sm">
              An unexpected error occurred. Please try refreshing the page.
            </p>

            <button
              onClick={this.handleReset}
              className="mt-4 inline-flex items-center justify-center
                         bg-white text-black px-6 py-2 rounded-md font-semibold
                         hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-white"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
