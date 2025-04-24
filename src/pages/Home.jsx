import { 
  Box, 
  Heading, 
  SimpleGrid, 
  InputGroup, 
  InputLeftElement,
  Input,
  Flex,
  Badge,
  Text,
  Button
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import MovieCard from '../components/MovieCard';
import { useState } from 'react';

export default function Home({ movies, onToggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('Все жанры');

  const genres = ['Все жанры', ...new Set(movies.map(movie => movie.genre))];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre === 'Все жанры' || movie.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <Box py={8} px={{ base: 4, md: 8 }}>
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        Фильмы
      </Heading>

      <Flex mb={8} gap={4} flexWrap="wrap">
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Поиск фильмов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="lg"
          />
        </InputGroup>

        <Flex gap={2} flexWrap="wrap">
          {genres.map(genre => (
            <Button
              key={genre}
              size="sm"
              variant={filterGenre === genre ? 'solid' : 'outline'}
              colorScheme="blue"
              onClick={() => setFilterGenre(genre)}
            >
              {genre}
            </Button>
          ))}
        </Flex>
      </Flex>

      {filteredMovies.length > 0 ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {filteredMovies.map(movie => (
            <MovieCard 
              key={movie.id}
              movie={movie}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text textAlign="center" fontSize="xl" color="gray.500" mt={20}>
          Фильмы не найдены. Попробуйте изменить параметры поиска.
        </Text>
      )}
    </Box>
  );
}