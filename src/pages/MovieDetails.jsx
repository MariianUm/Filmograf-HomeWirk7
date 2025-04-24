import { 
  Box, 
  Heading, 
  Text, 
  Badge, 
  Flex, 
  Button,
  Image,
  VStack,
  HStack
} from '@chakra-ui/react';
import { FaHeart, FaRegHeart, FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function MovieDetails({ movies, onToggleFavorite, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === Number(id));

  if (!movie) {
    return (
      <Box textAlign="center" py={20}>
        <Text fontSize="xl">Фильм не найден</Text>
        <Button mt={4} onClick={() => navigate('/')}>На главную</Button>
      </Box>
    );
  }

  return (
    <Box py={8} px={{ base: 4, md: 8 }}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="xl">{movie.title}</Heading>
        <Button
          colorScheme={movie.isFavorite ? 'pink' : 'gray'}
          leftIcon={movie.isFavorite ? <FaHeart /> : <FaRegHeart />}
          onClick={() => onToggleFavorite(movie.id)}
        >
          {movie.isFavorite ? 'В избранном' : 'В избранное'}
        </Button>
      </Flex>

      <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
        <Box flexShrink={0}>
          <Image
            src={movie.poster}
            alt={movie.title}
            w="300px"
            h="450px"
            objectFit="cover"
            borderRadius="md"
            fallbackSrc="/images/default.jpg"
          />
        </Box>
        <Box>
          <HStack spacing={4} mb={4}>
            <Badge colorScheme="blue" fontSize="md">{movie.genre}</Badge>
            <Text fontSize="lg" fontWeight="medium">{movie.duration}</Text>
          </HStack>
          
          <Text fontSize="lg" mb={6} whiteSpace="pre-line">
            {movie.description}
          </Text>

          <VStack align="start" spacing={4}>
            <Button
              colorScheme="blue"
              leftIcon={<FaEdit />}
              onClick={() => navigate(`/edit-movie/${movie.id}`)}
            >
              Редактировать
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              leftIcon={<FaTrash />}
              onClick={() => {
                onDelete(movie.id);
                navigate('/');
              }}
            >
              Удалить фильм
            </Button>
            <Button as={Link} to="/" variant="ghost">
              Назад к списку
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}