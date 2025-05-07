import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box textAlign="center" py={20}>
      <Heading as="h1" size="2xl" mb={4}>
        404
      </Heading>
      <Text fontSize="xl" mb={6}>
        Страница не найдена
      </Text>
      <Button as={Link} to="/" colorScheme="pink">
        На главную
      </Button>
    </Box>
  );
}