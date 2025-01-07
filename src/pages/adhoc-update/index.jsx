import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  Stack,
  TextField,
  Typography,MenuItem
} from "@mui/material";
import { useLoginStore } from "../../core/states/login-store";
import { Add, Delete } from "@mui/icons-material";
import { useSetState } from "ahooks";

const AdhocUpdate = () => {
  const { isLoggedIn } = useLoginStore();

  const [state, setState] = useSetState({
    columns: [
      {
        name: "",
        value: "",
      },
    ],
  });

  const onAddColumn = () => {
    setState((prev) => ({
      columns: [...prev.columns, { name: "", value: "" }],
    }));
  };

  const onDeleteColumn = (index) => {
    setState((prev) => {
      const columns = [...prev.columns];
      columns.splice(index, 1);
      return { columns };
    });
  };

  return (
    <>
      <Typography level="h4" component="h1">
        Ad-hoc Updates
      </Typography>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          height: "100%",
        }}
      >
        {isLoggedIn ? (
          <Alert color="warning">Login to Perform Updates</Alert>
        ) : (
          <Stack direction={"row"} sx={{ pt: 4 }} spacing={8}>
            <Stack direction={"column"} spacing={1} sx={{ width: 700 }}>
              <FormControl size="sm" required>
                <FormLabel sx={{ fontSize: 13 }}>Table Name</FormLabel>
                <Select defaultValue="dev" variant="soft" sx={{ width: 280 }}>
                  <MenuItem value="dev">DEV</MenuItem>
                  <MenuItem value="sit">SIT</MenuItem>
                  <MenuItem value="uat">UAT</MenuItem>
                  <MenuItem value="prod">PROD</MenuItem>
                </Select>
              </FormControl>

              <Stack direction={"column"} spacing={1} sx={{ pt: 2 }}>
                {state.columns.map((column, index) => (
                  <Stack direction={"row"} spacing={2} key={12}>
                    <FormControl size="sm" required>
                      <FormLabel sx={{ fontSize: 13 }}>Column Name</FormLabel>
                      <Select
                        defaultValue="dev"
                        variant="soft"
                        sx={{ width: 280 }}
                      >
                        <MenuItem value="dev">DEV</MenuItem>
                        <MenuItem value="sit">SIT</MenuItem>
                        <MenuItem value="uat">UAT</MenuItem>
                        <MenuItem value="prod">PROD</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size="sm" required>
                      <FormLabel sx={{ fontSize: 13 }}>Column Name</FormLabel>
                      <Input variant="soft" sx={{ width: 280 }} />
                    </FormControl>
                    <Stack direction={"row"} sx={{ pt: 3.3 }} spacing={1}>
                      <IconButton
                        variant="soft"
                        color="primary"
                        size="sm"
                        sx={{ height: 32 }}
                        onClick={onAddColumn}
                      >
                        <Add />
                      </IconButton>

                      {index > 0 && (
                        <IconButton
                          variant="soft"
                          size="sm"
                          color="danger"
                          onClick={() => onDeleteColumn(index)}
                          sx={{ height: 32 }}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Stack>
                  </Stack>
                ))}
              </Stack>

              <FormControl size="sm" required>
                <FormLabel sx={{ fontSize: 13 }}>Query</FormLabel>
                <TextField
                  minRows={8}
                  multiline
                  variant="soft"
                  sx={{ width: 680 }}
                  placeholder="Where aplctn_cd='ALL'"
                />
              </FormControl>

              <Stack direction={"row"} spacing={2}>
                <Button variant="solid" color="primary" size="sm">
                  Submit
                </Button>
              </Stack>
            </Stack>
            <Stack direction={"column"} spacing={2} sx={{ width: 350 }}>
              <Box
                sx={{
                  backgroundColor: "warning.softBg",
                  px: 3,
                  py: 2,
                  borderRadius: 8,
                }}
              >
                <ul>
                  <li>
                    <Typography level="body-xs">
                      <b>Disclaimer:</b> Update command will be formed as is
                      provided by User
                    </Typography>
                  </li>
                  <li>
                    <Typography level="body-xs">
                      <b> *</b> Wrap column value with (') single quote
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Stack>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default AdhocUpdate;
