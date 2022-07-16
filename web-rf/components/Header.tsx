import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <p>Header?</p>
      <Button
        variant="contained"
        size="small"
        onClick={() => router.push("/projects/create")}
      >
        Create new project
      </Button>
    </Box>
  );
}
