import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Stack, 
  IconButton, 
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  alpha
} from "@mui/material";
import { 
  Link, 
  useNavigate,
  useLocation 
} from "react-router-dom";
import { 
  Brightness4, 
  Brightness7, 
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Dashboard,
  Analytics,
  Info,
  History as HistoryIcon,
  CompareArrows
} from "@mui/icons-material";
import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { styled } from "@mui/material/styles";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Navbar() {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenu = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationAnchor(null);
  };

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: Dashboard },
    { path: '/predict', label: 'Predict', icon: Analytics },
    { path: '/history', label: 'History', icon: HistoryIcon },
    { path: '/comparison', label: 'Compare', icon: CompareArrows },
    { path: '/model-info', label: 'Model Info', icon: Info },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <AppBar position="sticky" elevation={0} sx={{ backdropFilter: 'blur(10px)', backgroundColor: mode === 'light' ? 'rgba(99, 102, 241, 0.9)' : 'rgba(30, 41, 59, 0.9)' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 0, 
            mr: 3,
            background: 'linear-gradient(45deg, #fff 30%, #e0e7ff 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          🌸 Iris ML System
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              component={Link}
              to={item.path}
              startIcon={<item.icon />}
              sx={{
                backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Tooltip title="Toggle theme">
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton color="inherit" onClick={handleNotificationMenu}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleClose}
          PaperProps={{
            sx: { width: 320, maxHeight: 400 }
          }}
        >
          <MenuItem onClick={handleClose}>New prediction available</MenuItem>
          <MenuItem onClick={handleClose}>Model updated to v2.0</MenuItem>
          <MenuItem onClick={handleClose}>System maintenance tonight</MenuItem>
        </Menu>

        <Tooltip title="Account">
          <IconButton color="inherit" onClick={handleProfileMenu}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
              U
            </Avatar>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;