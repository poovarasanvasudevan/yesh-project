import {
  FormControl,
  FormLabel,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Input,
  Button,
  DialogTitle,
  Select,
  Option,
  Box,
  Typography,
} from "@mui/joy";
import { useLoginStore } from "../../core/states/login-store";
import { Close, Lock } from "@mui/icons-material";
import { useSetState } from "ahooks";

const LoginModal = ({ open, onClose }) => {
  const { openLoginDialog, setOpenLoginDialog } = useLoginStore();
  const [state, setState] = useSetState({
    loading: false,
    btnText: "Validate",
  });

  const dpValues = Array.from({ length: 150 }, (_, i) => i + 1);
  return (
    <Modal
      open={openLoginDialog}
      size="sm"
      onClose={() => setOpenLoginDialog(false)}
    >
      <ModalDialog
        variant="plain"
        sx={{ width: 420, z: 9999, p: 0, top: "12vh", left: "38%" }}
        layout="top"
      >
        <Box
          spacing={1}
          color="primary"
          sx={{
            py: 1,
            px: 2,
            backgroundColor: "neutral.softBg",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            display: "flex",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Lock sx={{ mr: 1, fontSize: "18px" }} />
            <Typography fontWeight="500" fontSize="14px" sx={{ mt: 0.5 }}>
              Login
            </Typography>
          </Box>

          <Close
            sx={{ fontSize: "18px", mt: 0.5, cursor: "pointer" }}
            onClick={() => setOpenLoginDialog(false)}
          />
        </Box>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
        >
          <Stack spacing={1.5} size="sm" sx={{ px: 3, pt: 1.5, pb: 1.5 }}>
            <FormControl size="sm" required>
              <FormLabel>Anthem ID</FormLabel>
              <Input autoFocus required variant="soft" />
            </FormControl>

            <FormControl size="sm" required>
              <FormLabel>Password</FormLabel>
              <Input required variant="soft" />
            </FormControl>

            <FormControl size="sm" required>
              <FormLabel>App Code</FormLabel>
              <Select defaultValue="aedl" variant="soft">
                {dpValues.map((value) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
                <Option value="aedl">AEDL</Option>
                <Option value="edl">EDL</Option>
              </Select>
            </FormControl>

            <Stack
              direction="row"
              spacing={1}
              sx={{ pt: 2 }}
              size="sm"
              justifyContent={"flex-end"}
            >
              <Button
                type="submit"
                variant="soft"
                size="xs"
                onClick={() => {
                  setState({ loading: true, btnText: "Validating..." });
                  setTimeout(() => {
                    setState({ loading: false, btnText: "Validate" });
                    setOpenLoginDialog(false);
                  }, 2000);
                }}
                loading={state.loading}
                loadingIndicator="Validating..."
                sx={{ fontSize: 12, px: 2, py: 0.8 }}
              >
                {state.btnText}
              </Button>
              <Button
                onClick={() => setOpenLoginDialog(false)}
                variant="plain"
                size="xs"
                color="danger"
                sx={{ fontSize: 12, px: 2, py: 0.8 }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default LoginModal;
