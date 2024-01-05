import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {});

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header/>
          <main>
            <Outlet />
          </main>
        </>
      )}
    </>
  );
};

export default MainLayout;