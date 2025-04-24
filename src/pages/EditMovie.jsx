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
import { FaSave } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const genres = ['Боевик', 'Триллер', 'Комедия', 'Драма'];

export default function EditMovie({ movies, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: '',
    genre: 'Боевик',
    duration: '',
    description: '',
    poster: ''
  });

  useEffect(() => {
    const movie = movies.find(m => m.id === Number(id));
    if (movie) {
      setFormData({
        title: movie.title,
        genre: movie.genre,
        duration: movie.duration.replace(' мин.', ''),
        description: movie.description,
        poster: movie.poster
      });
    }
  }, [id, movies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.duration) {
      toast({
        title: 'Ошибка',
        description: 'Заполните обязательные поля',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onUpdate({
      ...formData,
      id: Number(id),
      duration: `${formData.duration} мин.`
    });

    toast({
      title: 'Фильм обновлен',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    navigate(`/movie/${id}`);
  };

  return (
    <Box py={8} px={{ base: 4, md: 8 }} maxW="800px" mx="auto">
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        Редактировать фильм
      </Heading>

      <Box as="form" onSubmit={handleSubmit} bg="white" p={6} borderRadius="lg" boxShadow="md">
        <VStack spacing={6}>
          <FormControl isRequired>
            <FormLabel>Название фильма</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Жанр</FormLabel>
            <RadioGroup 
              name="genre"
              value={formData.genre}
              onChange={(value) => setFormData({...formData, genre: value})}
            >
              <HStack spacing={4}>
                {genres.map(genre => (
                  <Radio key={genre} value={genre}>{genre}</Radio>
                ))}
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Длительность (минут)</FormLabel>
            <Input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Описание</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Постер (URL)</FormLabel>
            <Input
              name="poster"
              value={formData.poster}
              onChange={handleChange}
            />
          </FormControl>

          <Flex justify="flex-end" w="full" gap={4}>
            <Button variant="outline" onClick={() => navigate(`/movie/${id}`)}>
              Отмена
            </Button>
            <Button 
              colorScheme="blue" 
              type="submit" 
              leftIcon={<FaSave />}
            >
              Сохранить
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}