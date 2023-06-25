import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Layout from "./layouts";
import router from "./router";
interface IApp {}
const App: React.FC<IApp> = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
};

export default App;
