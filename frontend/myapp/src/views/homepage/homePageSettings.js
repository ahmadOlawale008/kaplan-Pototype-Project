import {
  Typography,
  Box,
  Stack,
  TextField,
  FormLabel,
  Divider,
  FormHelperText,
  Grid,
} from "@mui/material";

export default function HomePageSettings() {
  return (
    <Stack spacing={3} p={2}>
      <Typography component={"header"} variant="h4" fontWeight={700}>
        Settings
      </Typography>
      <Box>
        <Divider sx={{ my: 4 }} />
        <Grid spacing={4} container
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Grid item md={4} lg={4} xl={4}>
            <Typography fontWeight={600}>Page settings: </Typography>
            <FormHelperText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              aperiam porro dolore est!
            </FormHelperText>
          </Grid>
          <Grid item md={8} lg={8} xl={8}>
            <form>
              <FormLabel></FormLabel>
              <TextField size="small" fullWidth label="" />
            </form>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
