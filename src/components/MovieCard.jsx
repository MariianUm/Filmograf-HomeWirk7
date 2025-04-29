import { 
  Box, Heading, Text, Badge, Flex, IconButton,
  Image, Stack, useDisclosure
} from '@chakra-ui/react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function MovieCard({ movie, onToggleFavorite }) {
  return (
    <MotionBox
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
      transition="all 0.2s"
      position="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box position="relative">
        <Image
          src={movie.poster}
          alt={movie.title}
          w="100%"
          h="300px"
          objectFit="cover"
          fallbackSrc="/images/default.jpg"
        />
        <IconButton
          aria-label={movie.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          icon={movie.isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
          position="absolute"
          top={2}
          right={2}
          bg="whiteAlpha.800"
          borderRadius="full"
          onClick={() => onToggleFavorite(movie.id)}
        />
      </Box>

      <Box p={4}>
        <Heading as="h3" size="md" mb={2} noOfLines={1}>
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </Heading>
        
        <Stack direction="row" spacing={2} mb={3}>
          <Badge 
            colorScheme={
              movie.genre === 'Боевик' ? 'red' : 
              movie.genre === 'Драма' ? 'blue' :
              movie.genre === 'Комедия' ? 'yellow' : 'gray'
            }
          >
            {movie.genre}
          </Badge>
          <Badge colorScheme="gray">{movie.duration}</Badge>
        </Stack>

        <Flex align="center" mb={3}>
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              color={i < movie.rating ? '#ffc107' : '#e4e5e9'} 
              size={14}
            />
          ))}
        </Flex>

        <Flex justify="space-between" align="center">
          <Link to={`/movie/${movie.id}`}>
            <Text color="blue.500" fontWeight="medium">Подробнее</Text>
          </Link>
        </Flex>
      </Box>
    </MotionBox>
  );
}