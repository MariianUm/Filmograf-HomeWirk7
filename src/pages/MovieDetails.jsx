import { 
  Box, Heading, Text, Badge, Flex, Button,
  Image, VStack, HStack, useToast, Spinner
} from '@chakra-ui/react';
import { FaHeart, FaRegHeart, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function MovieDetails({ movies, onToggleFavorite, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const foundMovie = movies.find(m => m.id === Number(id));
    
    if (!foundMovie) {
      toast({
        title: 'Фильм не найден',
        description: 'Запрошенный фильм не существует',
        status: 'error',
        duration: 3000,
      });
      navigate('/');
      return;
    }

    setMovie(foundMovie);
    setIsLoading(false);
  }, [id, movies, navigate, toast]);

  const handleDelete = () => {
    onDelete(movie.id);
    toast({
      title: 'Фильм удалён',
      description: `${movie.title} успешно удалён`,
      status: 'success',
      duration: 3000,
    });
    navigate('/');
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Spinner size="xl" color="pink.500" thickness="4px" />
      </Flex>
    );
  }

  return (
    <Box py={8} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <Flex justify="space-between" align="center" mb={8} flexWrap="wrap" gap={4}>
        <Heading as="h1" size="xl" flex="1" minW="200px" color="pink.600">
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
            color="gray.600"
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
              onClick={() => navigate('/')}
              variant="ghost" 
              leftIcon={<FaArrowLeft />}
              size="lg"
              color="pink.600"
            >
              Назад к списку
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}