import { Box, Container, Typography, Link, Stack, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3, mt: 'auto' }}>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Iris ML System. All rights reserved.
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <IconButton size="small" href="https://github.com" target="_blank">
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton size="small" href="https://linkedin.com" target="_blank">
              <LinkedIn fontSize="small" />
            </IconButton>
            <IconButton size="small" href="https://twitter.com" target="_blank">
              <Twitter fontSize="small" />
            </IconButton>
          </Stack>
          
          <Stack direction="row" spacing={2}>
            <Link href="#" color="text.secondary" underline="hover">Privacy</Link>
            <Link href="#" color="text.secondary" underline="hover">Terms</Link>
            <Link href="#" color="text.secondary" underline="hover">Contact</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;