import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box, Flex, Spinner, Alert, AlertIcon, Button } from '@chakra-ui/react';
import API from './api/mockApi';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AddMovie from './pages/AddMovie';
import MovieDetails from './pages/MovieDetails';
import EditMovie from './pages/EditMovie';
import NotFound from './pages/NotFound';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await API.getMovies(); // Используем моковый API
        setMovies(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Ошибка загрузки фильмов:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, []);

  const toggleFavorite = (id) => {
    setMovies(movies.map(movie => 
      movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
    ));
  };

  const addMovie = (newMovie) => {
    const movie = {
      ...newMovie,
      id: Date.now(),
      isFavorite: false,
      poster: newMovie.poster || '/images/default.jpg',
      rating: 3
    };
    setMovies([...movies, movie]);
  };

  const updateMovie = (updatedMovie) => {
    setMovies(movies.map(movie => 
      movie.id === updatedMovie.id ? updatedMovie : movie
    ));
  };

  const deleteMovie = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот фильм?')) {
      setMovies(movies.filter(movie => movie.id !== id));
    }
  };

  if (loading) {
    return (
      <ChakraProvider>
        <Flex justify="center" align="center" minH="100vh">
          <Spinner 
            size="xl" 
            thickness="4px" 
            color="pink.500" 
            emptyColor="gray.200"
          />
        </Flex>
      </ChakraProvider>
    );
  }

  if (error) {
    return (
      <ChakraProvider>
        <Box textAlign="center" p={10}>
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />
            Ошибка загрузки данных: {error}
          </Alert>
          <Button 
            colorScheme="pink" 
            onClick={() => window.location.reload()}
            size="lg"
          >
            Попробовать снова
          </Button>
        </Box>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh" bg="gray.50">
          <Navbar />
          <Box as="main" pt="80px" pb={10} px={{ base: 4, md: 8 }}>
            <Routes>
              <Route path="/" element={
                <Home 
                  movies={movies} 
                  onToggleFavorite={toggleFavorite} 
                />
              } />
              <Route path="/favorites" element={
                <Favorites 
                  movies={movies.filter(m => m.isFavorite)} 
                  onToggleFavorite={toggleFavorite}
                  onDelete={deleteMovie}
                />
              } />
              <Route path="/add-movie" element={
                <AddMovie onAddMovie={addMovie} />
              } />
              <Route path="/movie/:id" element={
                <MovieDetails 
                  movies={movies} 
                  onToggleFavorite={toggleFavorite}
                  onDelete={deleteMovie}
                />
              } />
              <Route path="/edit-movie/:id" element={
                <EditMovie 
                  movies={movies} 
                  onUpdate={updateMovie} 
                />
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;