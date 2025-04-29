import { 
  Box, Heading, VStack, HStack, Text, Button, 
  Badge, Flex, Alert, AlertIcon, Spinner
} from '@chakra-ui/react';
import { FaTrash, FaHeart, FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Favorites({ movies, onToggleFavorite, onDelete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Flex justify="center" mt={20}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box py={8} px={{ base: 4, md: 8 }}>
      <Heading as="h1" size="xl" mb={8}>
        Избранное
      </Heading>

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
                    <Text fontSize="sm">{movie.duration}</Text>
                  </HStack>
                  <Flex align="center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        color={i < movie.rating ? 'gold' : 'lightgray'} 
                      />
                    ))}
                  </Flex>
                </Box>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="red"
                    leftIcon={<FaTrash />}
                    onClick={() => onDelete(movie.id)}
                  >
                    Удалить
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="pink"
                    leftIcon={<FaHeart />}
                    onClick={() => onToggleFavorite(movie.id)}
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