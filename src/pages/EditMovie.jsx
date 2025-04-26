import { 
  Box, 
  Heading, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea,
  Button, 
  VStack,
  RadioGroup,
  Radio,
  HStack,
  useToast,
  Flex,
  Spinner,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { FaSave, FaArrowLeft, FaTrash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const genres = ['Боевик', 'Триллер', 'Комедия', 'Драма'];

export default function EditMovie({ movies, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    genre: 'Боевик',
    duration: '',
    description: '',
    poster: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundMovie = movies.find(m => m.id === Number(id));
      setMovie(foundMovie);
      
      if (foundMovie) {
        setFormData({
          title: foundMovie.title,
          genre: foundMovie.genre,
          duration: foundMovie.duration.replace(' мин.', ''),
          description: foundMovie.description,
          poster: foundMovie.poster
        });
      }
      
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, movies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    }
    
    if (!formData.duration) {
      newErrors.duration = 'Укажите длительность';
    } else if (isNaN(formData.duration)) {
      newErrors.duration = 'Должно быть числом';
    } else if (formData.duration <= 0) {
      newErrors.duration = 'Длительность должна быть положительной';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Ошибка валидации',
        description: 'Проверьте правильность заполнения полей',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onUpdate({
      ...formData,
      id: Number(id),
      duration: `${formData.duration} мин.`,
      isFavorite: movie.isFavorite,
      year: movie.year
    });

    toast({
      title: 'Фильм обновлен',
      description: `${formData.title} успешно сохранен`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    navigate(`/movie/${id}`);
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
          Невозможно редактировать — фильм не существует или был удалён
        </Text>
        <Button 
          as="a"
          href="/"
          colorScheme="blue"
          size="lg"
          leftIcon={<FaArrowLeft />}
        >
          Вернуться к списку
        </Button>
      </Box>
    );
  }

  return (
    <Box py={8} px={{ base: 4, md: 8 }} maxW="800px" mx="auto">
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="xl" textAlign="center">
          Редактировать {movie.title}
        </Heading>
        <Button
          onClick={() => navigate(`/movie/${id}`)}
          leftIcon={<FaArrowLeft />}
          variant="outline"
        >
          Назад
        </Button>
      </Flex>

      <Box 
        as="form" 
        onSubmit={handleSubmit} 
        bg="white" 
        p={6} 
        borderRadius="lg" 
        boxShadow="md"
      >
        <VStack spacing={6}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Название фильма</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Например: Матрица"
              size="lg"
            />
            {errors.title && (
              <Alert status="error" mt={2} borderRadius="md">
                <AlertIcon />
                {errors.title}
              </Alert>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Жанр</FormLabel>
            <RadioGroup 
              name="genre"
              value={formData.genre}
              onChange={(value) => setFormData({...formData, genre: value})}
            >
              <HStack spacing={4} wrap="wrap">
                {genres.map(genre => (
                  <Radio key={genre} value={genre} size="lg">{genre}</Radio>
                ))}
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl isInvalid={!!errors.duration}>
            <FormLabel>Длительность (минут)</FormLabel>
            <Input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Например: 136"
              size="lg"
            />
            {errors.duration && (
              <Alert status="error" mt={2} borderRadius="md">
                <AlertIcon />
                {errors.duration}
              </Alert>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Описание</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Описание фильма..."
              rows={5}
              size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Постер (URL)</FormLabel>
            <Input
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              placeholder="Ссылка на изображение"
              size="lg"
            />
          </FormControl>

          <Flex justify="space-between" w="full" gap={4} pt={4}>
            <Button
              variant="outline"
              onClick={() => navigate(`/movie/${id}`)}
              leftIcon={<FaTrash />}
              colorScheme="red"
              size="lg"
            >
              Отменить
            </Button>
            <Button 
              colorScheme="blue" 
              type="submit" 
              leftIcon={<FaSave />}
              size="lg"
              flex="1"
            >
              Сохранить изменения
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}