import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Button, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import JobProposalsPage from './pages/JobProposalsPage';
import SubmitProposalPage from './pages/SubmitProposalPage';
import SelectedFreelancerPage from './pages/SelectedFreelancerPage';
import JobDetailsPage from './pages/JobDetailsPage';

const App: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F9F9F9' }}>
        {/* Header */}
        <AppBar position="static" sx={{ backgroundColor: 'white', color: '#333', boxShadow: 1 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                KHADMA HUB
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button color="inherit" href="/">
                Jobs
              </Button>
              <Button color="inherit" href="/proposals">
                Proposals
              </Button>
              <Button color="inherit" href="/messages">
                Messages
              </Button>

              {/* User Menu */}
              <Avatar
                src="/avatar.jpg"
                sx={{ cursor: 'pointer', width: 40, height: 40 }}
                onClick={handleMenuOpen}
              />
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<JobProposalsPage />} />
            <Route path="/proposals/:jobId" element={<SubmitProposalPage />} />
            <Route path="/selected-freelancer/:jobId" element={<SelectedFreelancerPage />} />
            <Route path="/job-details/:jobId" element={<JobDetailsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            backgroundColor: '#2D3748',
            color: 'white',
            py: 3,
            textAlign: 'center',
            borderTop: '1px solid #E2E8F0',
          }}
        >
          <Typography variant="body2">© 2024 KHADMA HUB. All rights reserved.</Typography>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
