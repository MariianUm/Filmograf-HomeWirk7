// AddMovie.jsx
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
  Flex
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

const genres = ['Боевик', 'Триллер', 'Комедия', 'Драма'];

export default function AddMovie({ onAddMovie }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
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

  const onSubmit = (data) => {
    if (!data.title || !data.duration) {
      toast({
        title: 'Ошибка',
        description: 'Заполните обязательные поля',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onAddMovie({
      ...data,
      duration: `${data.duration} мин.`,
      year: new Date().getFullYear()
    });

    toast({
      title: 'Фильм добавлен',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    navigate('/');
  };

  return (
    <Box py={8} px={{ base: 4, md: 8 }} maxW="800px" mx="auto">
      <Heading as="h1" size="xl" mb={8} textAlign="center" color="pink.600">
        Добавить фильм
      </Heading>

      <Box as="form" onSubmit={handleSubmit(onSubmit)} bg="white" p={6} borderRadius="lg" boxShadow="md">
        <VStack spacing={6}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel color="pink.600">Название фильма</FormLabel>
            <Input
              {...register('title', { required: 'Обязательное поле' })}
              placeholder="Например: Матрица"
              focusBorderColor="pink.400"
            />
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
                min: { value: 1, message: 'Минимум 1 минута' }
              })}
              placeholder="Например: 136"
              focusBorderColor="pink.400"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="pink.600">Описание</FormLabel>
            <Textarea
              {...register('description')}
              placeholder="Описание фильма..."
              rows={5}
              focusBorderColor="pink.400"
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

          <Flex justify="flex-end" w="full" gap={4}>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              color="pink.600"
              borderColor="pink.200"
            >
              Отмена
            </Button>
            <Button 
              colorScheme="pink" 
              type="submit" 
              leftIcon={<FaPlus />}
              bg="pink.500"
              _hover={{ bg: 'pink.600' }}
            >
              Добавить фильм
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}