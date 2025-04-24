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
import { useState } from 'react';

const genres = ['Боевик', 'Триллер', 'Комедия', 'Драма'];

export default function AddMovie({ onAddMovie }) {
  const [formData, setFormData] = useState({
    title: '',
    genre: 'Боевик',
    duration: '',
    description: '',
    poster: ''
  });
  const toast = useToast();
  const navigate = useNavigate();

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

    onAddMovie({
      ...formData,
      duration: `${formData.duration} мин.`,
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
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        Добавить фильм
      </Heading>

      <Box as="form" onSubmit={handleSubmit} bg="white" p={6} borderRadius="lg" boxShadow="md">
        <VStack spacing={6}>
          <FormControl isRequired>
            <FormLabel>Название фильма</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Например: Матрица"
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
              placeholder="Например: 136"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Описание</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Описание фильма..."
              rows={5}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Постер (URL)</FormLabel>
            <Input
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              placeholder="Ссылка на изображение"
            />
          </FormControl>

          <Flex justify="flex-end" w="full" gap={4}>
            <Button variant="outline" onClick={() => navigate('/')}>
              Отмена
            </Button>
            <Button 
              colorScheme="blue" 
              type="submit" 
              leftIcon={<FaPlus />}
            >
              Добавить фильм
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}