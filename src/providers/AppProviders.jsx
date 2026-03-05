import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AuthObserver from "../components/auth/AuthObserver.jsx";
import ThemeProvider from "../context/theme/ThemeProvider.jsx";
import { AppErrorBoundary } from "../shared/error-boundary";
import { store } from "../store";

export const AppProviders = ({ children }) => {
  return (
    // Redux має бути найвище, щоб усі інші могли читати стейт
    <Provider store={store}>
      {/* AuthObserver потребує Redux, тому він всередині Provider */}
      <AuthObserver>
        <BrowserRouter>
          <ThemeProvider>
            <AppErrorBoundary>{children}</AppErrorBoundary>
          </ThemeProvider>
        </BrowserRouter>
      </AuthObserver>
    </Provider>
  );
};
