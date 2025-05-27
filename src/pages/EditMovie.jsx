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
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

const genres = ['Боевик', 'Триллер', 'Комедия', 'Драма'];

export default function EditMovie({ movies, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { 
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm();

  const movie = movies.find(m => m.id === Number(id));

  useEffect(() => {
    if (!movie) {
      toast({
        title: 'Ошибка',
        description: 'Фильм не найден',
        status: 'error',
        duration: 3000,
      });
      navigate('/');
      return;
    }

    // Парсим длительность из формата "136 мин."
    const durationValue = parseInt(movie.duration) || 0;
    
    reset({
      title: movie.title,
      genre: movie.genre,
      duration: durationValue,
      description: movie.description,
      poster: movie.poster
    });
  }, [movie, reset, navigate, toast]);

  const onSubmit = async (data) => {
    try {
      const updatedMovie = {
        ...data,
        id: Number(id),
        duration: `${data.duration} мин.`,
        isFavorite: movie.isFavorite,
        year: movie.year,
        rating: movie.rating
      };

      await onUpdate(updatedMovie);

      toast({
        title: 'Фильм обновлен',
        description: `${updatedMovie.title} успешно сохранен`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate(`/movie/${id}`);
    } catch (error) {
      toast({
        title: 'Ошибка обновления',
        description: error.message || 'Не удалось обновить фильм',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!movie) {
    return (
      <Box textAlign="center" py={20} px={4}>
        <Heading as="h2" size="lg" mb={4} color="pink.600">
          Фильм не найден
        </Heading>
        <Text fontSize="lg" mb={6} color="pink.500">
          Невозможно редактировать — фильм не существует или был удалён
        </Text>
        <Button 
          onClick={() => navigate('/')}
          colorScheme="pink"
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
        <Heading as="h1" size="xl" textAlign="center" color="pink.600">
          Редактировать {movie.title}
        </Heading>
        <Button
          onClick={() => navigate(`/movie/${id}`)}
          leftIcon={<FaArrowLeft />}
          variant="outline"
          color="pink.600"
          borderColor="pink.200"
          isDisabled={isSubmitting}
        >
          Назад
        </Button>
      </Flex>

      <Box 
        as="form" 
        onSubmit={handleSubmit(onSubmit)} 
        bg="white" 
        p={6} 
        borderRadius="lg" 
        boxShadow="md"
      >
        <VStack spacing={6}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel color="pink.600">Название фильма</FormLabel>
            <Controller
              name="title"
              control={control}
              rules={{ 
                required: 'Обязательное поле',
                minLength: {
                  value: 2,
                  message: 'Минимум 2 символа'
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Например: Матрица"
                  focusBorderColor="pink.400"
                  isDisabled={isSubmitting}
                />
              )}
            />
            {errors.title && (
              <Alert status="error" mt={2} borderRadius="md">
                <AlertIcon />
                {errors.title.message}
              </Alert>
            )}
          </FormControl>

          <FormControl>
            <FormLabel color="pink.600">Жанр</FormLabel>
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack spacing={4} wrap="wrap">
                    {genres.map(genre => (
                      <Radio 
                        key={genre} 
                        value={genre}
                        colorScheme="pink"
                        borderColor="pink.200"
                        isDisabled={isSubmitting}
                      >
                        {genre}
                      </Radio>
                    ))}
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl isInvalid={!!errors.duration}>
            <FormLabel color="pink.600">Длительность (минут)</FormLabel>
            <Controller
              name="duration"
              control={control}
              rules={{ 
                required: 'Обязательное поле',
                min: { 
                  value: 1, 
                  message: 'Минимум 1 минута' 
                },
                max: {
                  value: 300,
                  message: 'Максимум 300 минут'
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Например: 136"
                  focusBorderColor="pink.400"
                  isDisabled={isSubmitting}
                />
              )}
            />
            {errors.duration && (
              <Alert status="error" mt={2} borderRadius="md">
                <AlertIcon />
                {errors.duration.message}
              </Alert>
            )}
          </FormControl>

          <FormControl>
            <FormLabel color="pink.600">Описание</FormLabel>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Описание фильма..."
                  rows={5}
                  focusBorderColor="pink.400"
                  isDisabled={isSubmitting}
                />
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="pink.600">Постер (URL)</FormLabel>
            <Controller
              name="poster"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Ссылка на изображение"
                  focusBorderColor="pink.400"
                  isDisabled={isSubmitting}
                />
              )}
            />
          </FormControl>

          <Flex justify="space-between" w="full" gap={4} pt={4}>
            <Button
              variant="outline"
              onClick={() => navigate(`/movie/${id}`)}
              color="pink.600"
              borderColor="pink.200"
              isDisabled={isSubmitting}
            >
              Отменить
            </Button>
            <Button 
              colorScheme="pink" 
              type="submit" 
              leftIcon={isSubmitting ? <Spinner size="sm" /> : <FaSave />}
              bg="pink.500"
              _hover={{ bg: 'pink.600' }}
              isLoading={isSubmitting}
              loadingText="Сохранение..."
            >
              Сохранить изменения
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}