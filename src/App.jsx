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

  const toggleFavorite = async (id) => {
    try {
      const movie = movies.find(m => m.id === id);
      const response = await API.updateMovie(id, { 
        isFavorite: !movie.isFavorite 
      });
      setMovies(movies.map(m => m.id === id ? response.data : m));
    } catch (err) {
      console.error('Ошибка обновления:', err);
    }
  };

  const addMovie = async (newMovie) => {
    try {
      const response = await API.createMovie({
        ...newMovie,
        isFavorite: false,
        poster: newMovie.poster || '/images/default.jpg',
        rating: 3
      });
      setMovies([...movies, response.data]);
    } catch (err) {
      console.error('Ошибка создания:', err);
      throw err;
    }
  };

  const updateMovie = async (updatedMovie) => {
    try {
      const response = await API.updateMovie(updatedMovie.id, updatedMovie);
      setMovies(movies.map(m => m.id === updatedMovie.id ? response.data : m));
    } catch (err) {
      console.error('Ошибка обновления:', err);
      throw err;
    }
  };

  const deleteMovie = async (id) => {
    try {
      await API.deleteMovie(id);
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (err) {
      console.error('Ошибка удаления:', err);
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