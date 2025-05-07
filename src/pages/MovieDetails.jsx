import { 
  Box, 
  Heading, 
  Text, 
  Badge, 
  Flex, 
  Button,
  Image,
  VStack,
  HStack,
  useToast,
  Spinner
} from '@chakra-ui/react';
import { FaHeart, FaRegHeart, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function MovieDetails({ movies, onToggleFavorite, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      const foundMovie = movies.find(m => m.id === Number(id));
      setMovie(foundMovie);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, movies]);

  const handleDelete = () => {
    onDelete(movie.id);
    toast({
      title: 'Фильм удалён',
      description: `${movie.title} успешно удалён из вашей коллекции`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/');
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (!movie) {
    return (
      <Box textAlign="center" py={20} px={4}>
        <Heading as="h2" size="lg" mb={4} color="gray.700">
          Фильм не найден
        </Heading>
        <Text fontSize="lg" mb={6} color="gray.500">
          Запрошенный фильм не существует или был удалён
        </Text>
        <Button 
          as={Link} 
          to="/" 
          colorScheme="pink"
          size="lg"
          leftIcon={<FaArrowLeft />}
        >
          Вернуться к списку фильмов
        </Button>
      </Box>
    );
  }

  return (
    <Box py={8} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <Flex justify="space-between" align="center" mb={8} flexWrap="wrap" gap={4}>
        <Heading as="h1" size="xl" flex="1" minW="200px">
          {movie.title} ({movie.year})
        </Heading>
        <Button
          colorScheme={movie.isFavorite ? 'pink' : 'gray'}
          leftIcon={movie.isFavorite ? <FaHeart /> : <FaRegHeart />}
          onClick={() => onToggleFavorite(movie.id)}
          size="lg"
        >
          {movie.isFavorite ? 'В избранном' : 'В избранное'}
        </Button>
      </Flex>

      <Flex direction={{ base: 'column', md: 'row' }} gap={8} align="flex-start">
        <Box flexShrink={0} w={{ base: '100%', md: '300px' }}>
          <Image
            src={movie.poster}
            alt={movie.title}
            w="100%"
            maxW="300px"
            h="450px"
            objectFit="cover"
            borderRadius="md"
            fallbackSrc="/images/default.jpg"
            boxShadow="lg"
          />
        </Box>

        <Box flex="1">
          <HStack spacing={4} mb={6} flexWrap="wrap">
            <Badge colorScheme="pink" fontSize="md" px={3} py={1}>
              {movie.genre}
            </Badge>
            <Text fontSize="lg" fontWeight="medium">
              {movie.duration}
            </Text>
          </HStack>
          
          <Text 
            fontSize="lg" 
            mb={8} 
            whiteSpace="pre-line"
            lineHeight="1.6"
          >
            {movie.description || 'Описание отсутствует'}
          </Text>

          <VStack align="start" spacing={4}>
            <Button
              colorScheme="pink"
              leftIcon={<FaEdit />}
              onClick={() => navigate(`/edit-movie/${movie.id}`)}
              size="lg"
            >
              Редактировать
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              leftIcon={<FaTrash />}
              onClick={handleDelete}
              size="lg"
            >
              Удалить фильм
            </Button>
            <Button 
              as={Link} 
              to="/" 
              variant="ghost" 
              leftIcon={<FaArrowLeft />}
              size="lg"
            >
              Назад к списку
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}