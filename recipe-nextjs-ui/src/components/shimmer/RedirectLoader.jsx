import React from "react";

function RedirectLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div class="flex flex-row space-x-4 justify-center">
        <div
          class="w-12 h-12 rounded-full animate-spin
border-8 border-solid border-purple-500 border-t-transparent"
        ></div>
      </div>
    </div>
  );
}

export default RedirectLoader;
