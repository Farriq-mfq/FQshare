import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Layout from "./layouts";
import router from "./router";
import { Helmet } from "react-helmet";
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
    <>
      <Helmet>
        <title>Fqshare - Make it easy</title>
        <meta name="description" content="Fqshare application" />
      </Helmet>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </>
  );
};

export default App;
