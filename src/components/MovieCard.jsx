import { 
  Box, 
  Heading, 
  Text, 
  Badge, 
  Flex, 
  IconButton,
  Image,
  Stack
} from '@chakra-ui/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie, onToggleFavorite }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
      transition="all 0.2s"
      position="relative"
    >
      <Box position="relative">
        <Image
          src={movie.poster}
          alt={movie.title}
          w="100%"
          h="300px"
          objectFit="cover"
          fallbackSrc="/images/default.jpg"
        />
        <IconButton
          aria-label={movie.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          icon={movie.isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
          position="absolute"
          top={2}
          right={2}
          bg="whiteAlpha.800"
          borderRadius="full"
          onClick={() => onToggleFavorite(movie.id)}
        />
      </Box>

      <Box p={4}>
        <Heading as="h3" size="md" mb={2} noOfLines={1}>
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </Heading>
        
        <Stack direction="row" spacing={2} mb={3}>
          <Badge colorScheme="blue">{movie.genre}</Badge>
          <Badge colorScheme="gray">{movie.duration}</Badge>
        </Stack>

        <Flex justify="space-between" align="center">
          <Link to={`/movie/${movie.id}`}>
            <Text color="blue.500" fontWeight="medium">Подробнее</Text>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}