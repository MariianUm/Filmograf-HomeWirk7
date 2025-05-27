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
  Alert,
  AlertIcon,
  Spinner
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

const genres = ['Боевик', 'Триллер', 'Комедия', 'Драма'];

export default function AddMovie({ onAddMovie }) {
  const { 
    register, 
    handleSubmit, 
    control, 
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: {
      title: '',
      genre: 'Боевик',
      duration: '',
      description: '',
      poster: ''
    }
  });
  
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const newMovie = {
        ...data,
        duration: `${data.duration} мин.`,
        year: new Date().getFullYear()
      };

      await onAddMovie(newMovie);

      toast({
        title: 'Фильм добавлен',
        description: `${newMovie.title} успешно добавлен в коллекцию`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/');
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось добавить фильм',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box py={8} px={{ base: 4, md: 8 }} maxW="800px" mx="auto">
      <Heading as="h1" size="xl" mb={8} textAlign="center" color="pink.600">
        Добавить фильм
      </Heading>

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
            <Input
              {...register('title', { 
                required: 'Обязательное поле',
                minLength: {
                  value: 2,
                  message: 'Минимум 2 символа'
                }
              })}
              placeholder="Например: Матрица"
              focusBorderColor="pink.400"
              disabled={isSubmitting}
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
                  <HStack spacing={4}>
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
            <Input
              type="number"
              {...register('duration', { 
                required: 'Обязательное поле',
                min: { 
                  value: 1, 
                  message: 'Минимум 1 минута' 
                },
                max: {
                  value: 300,
                  message: 'Максимум 300 минут'
                }
              })}
              placeholder="Например: 136"
              focusBorderColor="pink.400"
              disabled={isSubmitting}
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
            <Textarea
              {...register('description')}
              placeholder="Описание фильма..."
              rows={5}
              focusBorderColor="pink.400"
              disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              )}
            />
          </FormControl>

          <Flex justify="flex-end" w="full" gap={4}>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              color="pink.600"
              borderColor="pink.200"
              isDisabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button 
              colorScheme="pink" 
              type="submit" 
              leftIcon={isSubmitting ? <Spinner size="sm" /> : <FaPlus />}
              bg="pink.500"
              _hover={{ bg: 'pink.600' }}
              isLoading={isSubmitting}
              loadingText="Добавление..."
            >
              Добавить фильм
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}