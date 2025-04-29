import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AddMovie from './pages/AddMovie';
import MovieDetails from './pages/MovieDetails';
import EditMovie from './pages/EditMovie';
import NotFound from './pages/NotFound';

function App() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Матрица',
      genre: 'Боевик',
      duration: '136 мин.',
      year: 1999,
      isFavorite: true,
      poster: '/images/matrix.png',
      description: 'Фильм про синюю и красную пилюлю. Научно-фантастический боевик о хакере Нео, который узнает, что мир - это компьютерная симуляция.',
      rating: 5
    },
    {
      id: 2,
      title: 'Отступники',
      genre: 'Триллер',
      duration: '151 мин.',
      year: 2006,
      isFavorite: false,
      poster: '/images/departed.png',
      description: 'Криминальная драма о полицейском под прикрытии и гангстере, который работает на полицию.',
      rating: 4
    },
    {
      id: 3,
      title: 'Безумный Макс',
      genre: 'Боевик',
      duration: '88 мин.',
      year: 2015,
      isFavorite: false,
      poster: '/images/madmax.jpg',
      description: 'Постапокалиптический боевик о бывшем полицейском Максе, который помогает группе беглян.',
      rating: 4
    },
    {
      id: 4,
      title: 'Гладиатор',
      genre: 'Боевик',
      duration: '155 мин.',
      year: 2000,
      isFavorite: false,
      poster: '/images/gladiator.jpg',
      description: 'История римского генерала, который становится гладиатором, чтобы отомстить за убийство семьи.',
      rating: 5
    },
    {
      id: 5,
      title: 'Джентельмены',
      genre: 'Драма',
      duration: '113 мин.',
      year: 2019,
      isFavorite: true,
      poster: '/images/gentlemen.jpg',
      description: 'Криминальная комедия о британском наркобароне, который хочет продать свой бизнес.',
      rating: 5
    },
    {
      id: 6,
      title: 'Однажды в Голливуде',
      genre: 'Драма',
      duration: '161 мин.',
      year: 2019,
      isFavorite: true,
      poster: '/images/hollywood.png',
      description: 'История актера и его дублера на фоне изменений в Голливуде конца 1960-х годов.',
      rating: 4
    },
    {
      id: 7,
      title: 'Предложение',
      genre: 'Комедия',
      duration: '108 мин.',
      year: 2009,
      isFavorite: false,
      poster: '/images/proposal.jpg',
      description: 'Романтическая комедия о редакторе, которая вынуждена заключить фиктивный брак со своим помощником.',
      rating: 3
    },
    {
      id: 8,
      title: 'Малышка на миллион',
      genre: 'Драма',
      duration: '132 мин.',
      year: 2004,
      isFavorite: true,
      poster: '/images/milliondollar.png',
      description: 'Драма о девушке из бедного квартала, которая становится боксером под руководством старого тренера.',
      rating: 5
    },
    {
      id: 9,
      title: 'Ларри Краун',
      genre: 'Комедия',
      duration: '98 мин.',
      year: 2011,
      isFavorite: false,
      poster: '/images/larrycrowne.jpg',
      description: 'Комедия о мужчине средних лет, который после увольнения начинает новую жизнь, поступив в колледж.',
      rating: 3
    }
  ]);

  const toggleFavorite = (id) => {
    setMovies(movies.map(movie => 
      movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
    ));
    console.log('Изменен статус избранного для фильма с ID:', id); // Отладочный вывод
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
    console.log('Добавлен фильм:', movie); // Отладочный вывод
  };

  const updateMovie = (updatedMovie) => {
    setMovies(movies.map(movie => 
      movie.id === updatedMovie.id ? updatedMovie : movie
    ));
    console.log('Обновлен фильм:', updatedMovie); // Отладочный вывод
  };

  const deleteMovie = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот фильм?')) {
      setMovies(movies.filter(movie => movie.id !== id));
      console.log('Удален фильм с ID:', id); // Отладочный вывод
    }
  };

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