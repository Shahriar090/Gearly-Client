import { RouterProvider } from "react-router-dom";
import { useAuthInitializer } from "./hooks/useAuthInitializer";
import router from "./routes/Routes";

const App = () => {
  const loading = useAuthInitializer();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
