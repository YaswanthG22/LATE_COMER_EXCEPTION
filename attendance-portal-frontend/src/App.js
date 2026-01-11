import React from "react";
import AppRouter from "./app/router";

const App = () => {
  return (
    <>
      {/* Background glow effects */}
      <div className="portal-bg-circle portal-bg-1" />
      <div className="portal-bg-circle portal-bg-2" />

      <AppRouter />
    </>
  );
};

export default App;
