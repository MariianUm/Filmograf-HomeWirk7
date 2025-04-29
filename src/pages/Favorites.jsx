import { 
  Box, Heading, VStack, HStack, Text, Button, 
  Badge, Flex, Alert, AlertIcon
} from '@chakra-ui/react';
import { FaTrash, FaHeart, FaArrowLeft, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Favorites({ movies, onToggleFavorite, onDelete }) {
  const handleRemove = (id) => {
    if (window.confirm('Удалить фильм из избранного?')) {
      onToggleFavorite(id);
    }
  };

  return (
    <Box py={8} px={{ base: 4, md: 8 }}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="xl">
          Избранное
        </Heading>
        <Button as={Link} to="/" leftIcon={<FaArrowLeft />} variant="outline">
          Назад
        </Button>
      </Flex>

      {movies.length > 0 ? (
        <VStack spacing={4} align="stretch">
          {movies.map(movie => (
            <Box
              key={movie.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              boxShadow="sm"
            >
              <Flex justify="space-between" align="center">
                <Box>
                  <Heading as="h3" size="md" mb={1}>
                    {movie.title} ({movie.year})
                  </Heading>
                  <HStack spacing={2} mb={2}>
                    <Badge colorScheme="blue">{movie.genre}</Badge>
                    <Text fontSize="sm" color="gray.500">
                      <FaClock style={{ display: 'inline', marginRight: '4px' }} />
                      {movie.duration}
                    </Text>
                  </HStack>
                  <Flex align="center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        color={i < movie.rating ? '#ffc107' : '#e4e5e9'} 
                        size={14}
                      />
                    ))}
                  </Flex>
                </Box>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    leftIcon={<FaTrash />}
                    onClick={() => handleRemove(movie.id)}
                  >
                    Удалить
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="pink"
                    leftIcon={<FaHeart />}
                  >
                    В избранном
                  </Button>
                </HStack>
              </Flex>
            </Box>
          ))}
        </VStack>
      ) : (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          Нет избранных фильмов. Добавьте их со страницы всех фильмов.
        </Alert>
      )}
    </Box>
  );
}