// EditMovie.jsx
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
    formState: { errors },
    reset
  } = useForm();

  const movie = movies.find(m => m.id === Number(id));

  useEffect(() => {
    if (movie) {
      reset({
        title: movie.title,
        genre: movie.genre,
        duration: movie.duration.replace(' мин.', ''),
        description: movie.description,
        poster: movie.poster
      });
    }
  }, [movie, reset]);

  const onSubmit = (data) => {
    onUpdate({
      ...data,
      id: Number(id),
      duration: `${data.duration} мин.`,
      isFavorite: movie.isFavorite,
      year: movie.year
    });

    toast({
      title: 'Фильм обновлен',
      description: `${data.title} успешно сохранен`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    navigate(`/movie/${id}`);
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
          as="a"
          href="/"
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
              rules={{ required: 'Обязательное поле' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Например: Матрица"
                  focusBorderColor="pink.400"
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
                min: { value: 1, message: 'Минимум 1 минута' }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Например: 136"
                  focusBorderColor="pink.400"
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
                />
              )}
            />
          </FormControl>

          <Flex justify="space-between" w="full" gap={4} pt={4}>
            <Button
              variant="outline"
              onClick={() => navigate(`/movie/${id}`)}
              leftIcon={<FaTrash />}
              color="pink.600"
              borderColor="pink.200"
            >
              Отменить
            </Button>
            <Button 
              colorScheme="pink" 
              type="submit" 
              leftIcon={<FaSave />}
              bg="pink.500"
              _hover={{ bg: 'pink.600' }}
            >
              Сохранить изменения
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}