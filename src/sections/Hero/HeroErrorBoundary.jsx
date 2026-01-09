import { Component } from "react";
import HeroSkeleton from "./HeroSkeleton";

export default class HeroErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    //info

    // sentry.captureException(error, { extra: info });
    console.error("Hero crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="h-[85vh] w-full bg-black flex items-center">
          <HeroSkeleton />
        </section>
      );
    }

    return this.props.children;
  }
}
