const PageContainer = ({ children }) => (
  <div
    className="
    min-h-screen
    bg-white
    text-zinc-900
    dark:bg-zinc-950
    dark:text-zinc-100
    transition-colors
  "
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </div>
);

export default PageContainer;
