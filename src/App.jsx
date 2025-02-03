import AppRouter from "./core/router.jsx";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Flowbite } from "flowbite-react";
import { ModalProvider } from "@saimin/react-modal-manager";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {

  const customTheme = {
    sidebar: {
      collapse: {
        list: 'py-2'
      }
    },
    tabs: {
      tablist: {
        tabitem: {
          base: 'px-4 py-1 text-[13px]'
        }
      }

    }

  }

  return (
    <Flowbite theme={{theme: customTheme}}>
      <ModalProvider config={{
        backdropOpacity: 0.5,
        fullscreen: false,
        position: 'center',
        animationType: 'fade',
      }}>
        <AppRouter/>
      </ModalProvider>
    </Flowbite>
  );
}

export default App;
