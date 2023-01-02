import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { publicRoutes } from "./routes";

import Layout from "./components/Layout";
function App() {
  
 
  return (
    <Router>
        <Routes>
            {publicRoutes.map((route,index) => {
              const Comp = route.component;
              if(route.wrapper === null) {
                return (
                <Route key={index} path={route.path} element={
                      <Comp/>
                }/>
              )
              }
              return (
                <Route key={index} path={route.path} element={
                  <Layout >
                      <Comp />
                  </Layout>
                }/>
              )
             } )}
        </Routes>
    </Router>
  );
}

export default App;
