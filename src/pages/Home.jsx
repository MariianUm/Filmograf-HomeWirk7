import { 
  Box, Heading, SimpleGrid, Flex, Button, Select, 
  Text, Badge, InputGroup, InputLeftElement, Input
} from '@chakra-ui/react';
import { FaSearch, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import MovieCard from '../components/MovieCard';

export default function Home({ movies, onToggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('Все');
  const [sortBy, setSortBy] = useState('newest');

  const filteredMovies = movies
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = filterGenre === 'Все' || movie.genre === filterGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.year - a.year;
      if (sortBy === 'oldest') return a.year - b.year;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <Box py={8} px={{ base: 4, md: 8 }}>
      <Heading as="h1" size="xl" mb={8} textAlign="center" color="pink.600">
        Фильмы
      </Heading>

      <Flex mb={8} gap={4} flexWrap="wrap" justify="space-between">
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Поиск фильмов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            focusBorderColor="pink.400"
          />
        </InputGroup>

        <Flex gap={4}>
          <Select 
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            w="200px"
            focusBorderColor="pink.400"
          >
            {['Все', ...new Set(movies.map(movie => movie.genre))].map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </Select>

          <Select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            w="200px"
            focusBorderColor="pink.400"
          >
            <option value="newest">Сначала новые</option>
            <option value="oldest">Сначала старые</option>
            <option value="rating">По рейтингу</option>
          </Select>
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
        <Box textAlign="center" p={10} bg="white" borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="md" mb={4} color="gray.600">
            Фильмы не найдены
          </Heading>
          <Text color="gray.500">
            Попробуйте изменить параметры поиска или добавить новый фильм
          </Text>
        </Box>
      )}
    </Box>
  );
}