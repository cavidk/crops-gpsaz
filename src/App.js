import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";
import Main from "./components/Main/Main";

function App() {
    return (
        <Router>
            <main className="app">
                <Routes>
                    <Route path="/signin" element={<Auth />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="/"
                        element={
                            <ProtectedRoute>
                                <Main />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
