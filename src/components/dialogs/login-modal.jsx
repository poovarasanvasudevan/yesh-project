import {
  FormControl,
  FormLabel,
  Modal,
  Stack,
  Input,
  Button,
  Select,
  Box,
  Typography, Dialog, MenuItem, TextField,
} from "@mui/material";
import { useLoginStore } from "../../core/states/login-store";
import { Close, Lock } from "@mui/icons-material";
import { useSetState } from "ahooks";

const LoginModal = () => {
  const { openLoginDialog, setOpenLoginDialog } = useLoginStore();
  const [state, setState] = useSetState({
    loading: false,
    btnText: "Validate",
  });

  const dpValues = Array.from({ length: 150 }, (_, i) => i + 1);
  return (

      <Dialog
        open={openLoginDialog}
        onClose={() => setOpenLoginDialog(false)}
        variant="plain"
        maxWidth={"md"}
        layout="top"
      >
        <Box
          spacing={1}
          color="primary"
          sx={{
            width: 400,
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
            setOpenLoginDialog(false);
          }}
        >
          <Stack spacing={1.5} size="sm" sx={{ px: 3, pt: 1.5, pb: 1.5 }}>
            <TextField id="outlined-basic" name={"anthemID"}
                       inputProps={{
                         autoComplete: 'off'
                       }}
                       autoComplete={"off"} label="Anthem ID" variant="outlined" size={"small"} />
            <TextField id="outlined-basic" name={"password"}
                       inputProps={{
                         autoComplete: 'off'
                       }}
                       autoComplete={"off"} label="Password" type={"password"} variant="outlined" size={"small"} />

            <FormControl size="small" required>
              <FormLabel>App Code</FormLabel>
              <Select>
                {dpValues.map((value) => (
                  <MenuItem  key={value} value={value}>{value}</MenuItem>
                ))}
                <MenuItem  value="aedl">AEDL</MenuItem >
                <MenuItem  value="edl">EDL</MenuItem >
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
      </Dialog>
  );
};

export default LoginModal;
