import AppRouter from "./core/router.jsx";
import LoginModal from "./components/dialogs/login-modal.jsx";
import {  ModuleRegistry, AllCommunityModule } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  return (
    <>
      <LoginModal />
      <AppRouter />
    </>
  );
}

export default App;
