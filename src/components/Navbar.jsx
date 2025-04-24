import { Flex, Link, Box, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

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
      <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
        <Text fontSize="xl" fontWeight="bold" color="white">
          Фильмограф
        </Text>
      </Link>
      <Flex gap={6}>
        <Link 
          as={RouterLink} 
          to="/" 
          color="white"
          _hover={{ textDecoration: 'underline' }}
        >
          Все фильмы
        </Link>
        <Link 
          as={RouterLink} 
          to="/favorites" 
          color="white"
          _hover={{ textDecoration: 'underline' }}
        >
          Избранное
        </Link>
        <Link 
          as={RouterLink} 
          to="/add-movie" 
          color="white"
          _hover={{ textDecoration: 'underline' }}
        >
          Добавить фильм
        </Link>
      </Flex>
    </Flex>
  );
}