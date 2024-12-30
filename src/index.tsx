import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const AppRender = () =>
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);

const initializeWorker = async () => {
  try {
    const { worker } = await import("./mocks/handlers");
    await worker.start({
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });
    console.log("[MSW] Service Worker registered successfully.");
    AppRender();
  } catch (error) {
    console.error("[MSW] Failed to register the Service Worker:", error);
  }
};

initializeWorker();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
