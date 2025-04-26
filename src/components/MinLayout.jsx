import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box as="main" pt={20} pb={10}>
        <Outlet />
      </Box>
    </Box>
  );
}