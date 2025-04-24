import { 
  Box, 
  Heading, 
  VStack, 
  HStack, 
  Text, 
  Button,
  Badge,
  Flex
} from '@chakra-ui/react';
import { FaTrash, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Favorites({ movies, onToggleFavorite, onDelete }) {
  return (
    <Box py={8} px={{ base: 4, md: 8 }}>
      <Heading as="h1" size="xl" mb={8} textAlign="center">
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
                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                  </Heading>
                  <HStack spacing={2}>
                    <Badge colorScheme="blue">{movie.genre}</Badge>
                    <Text fontSize="sm" color="gray.500">{movie.duration}</Text>
                  </HStack>
                </Box>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
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
        <Text textAlign="center" fontSize="xl" color="gray.500" mt={20}>
          Нет избранных фильмов
        </Text>
      )}
    </Box>
  );
}