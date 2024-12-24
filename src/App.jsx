import { CssVarsProvider, extendTheme, selectClasses } from "@mui/joy";
import AppRouter from "./core/router.jsx";
import LoginModal from "./components/dialogs/login-modal.jsx";

function App() {
  const theme = extendTheme({
    fontFamily: {
      body: "Radio Canada, sans-serif",
      display: "Radio Canada, sans-serif",
    },

    components: {
      JoySkeleton: {
        defaultProps: {
          animation: "wave",
        },
      },
      JoyInput: {
        defaultProps: {
          size: "sm",
        },
        styleOverrides: {
          root: ({ ownerState, theme }) => ({
            ...(ownerState.size === "sm" && {
              "--Input-minHeight": "30px",
            }),
          }),
        },
      },
      JoySelect: {
        defaultProps: {
          size: "sm",
        },
        styleOverrides: {
          root: ({ ownerState, theme }) => ({
            ...(ownerState.size === "sm" && {
              "--Select-minHeight": "30px",
            }),
          }),
          listbox: ({ ownerState, theme }) => ({
            ...(ownerState.size === "sm" && {
              "--ListItem-minHeight": "20px",
              fontSize: "12px",
            }),
          }),
        },
      },
      JoyOption: {
        styleOverrides: {
          root: ({ ownerState, theme }) => ({
            fontSize: "12px",
          }),
        },
      },

      JoyFormLabel: {
        styleOverrides: {
          root: ({ ownerState, theme }) => ({
            "--FormLabel-lineHeight": 1,
            "--FormLabel-fontSize": "12px",
            lineHeight: 1,
          }),
        },
      },
    },
  });

  return (
    <CssVarsProvider theme={theme}>
      <LoginModal />
      <AppRouter />
    </CssVarsProvider>
  );
}

export default App;
