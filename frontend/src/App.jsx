import React from "react";
import {Toaster} from "react-hot-toast";


function App() {
  return (
    <div className="bg-base-200 min-h-screen">
      {/* Global Toaster for notifications */}
      <Toaster position="center" reverseOrder={false} />
    </div>
  );
}

export default App;
