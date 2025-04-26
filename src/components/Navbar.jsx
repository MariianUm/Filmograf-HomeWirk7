import { Flex, Box, Text, IconButton } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { FaFilm, FaHeart, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function Navbar() {
  return (
    <Flex
      as="nav"
      bg="blue.600"
      p={4}
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex="sticky"
      boxShadow="md"
    >
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <Flex align="center" gap={2}>
          <MotionBox
            animate={{ rotate: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <FaFilm color="white" size="24px" />
          </MotionBox>
          <Text fontSize="xl" fontWeight="bold" color="white">
            Фильмограф
          </Text>
        </Flex>
      </NavLink>

      <Flex gap={{ base: 3, md: 6 }}>
        <NavLink 
          to="/"
          style={({ isActive }) => ({
            color: 'white',
            fontWeight: isActive ? 'bold' : 'normal',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          })}
        >
          <FaFilm />
          <Text display={{ base: 'none', md: 'block' }}>Все фильмы</Text>
        </NavLink>
        
        <NavLink 
          to="/favorites"
          style={({ isActive }) => ({
            color: 'white',
            fontWeight: isActive ? 'bold' : 'normal',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          })}
        >
          <FaHeart />
          <Text display={{ base: 'none', md: 'block' }}>Избранное</Text>
        </NavLink>
        
        <NavLink 
          to="/add-movie"
          style={({ isActive }) => ({
            color: 'white',
            fontWeight: isActive ? 'bold' : 'normal',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          })}
        >
          <FaPlus />
          <Text display={{ base: 'none', md: 'block' }}>Добавить</Text>
        </NavLink>
      </Flex>
    </Flex>
  );
}