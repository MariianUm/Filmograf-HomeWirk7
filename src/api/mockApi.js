import axios from 'axios';

const mockMovies = [
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
];

const API = {
  async getMovies() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: movies }), 500);
    });
  },

  async createMovie(newMovie) {
    return new Promise((resolve) => {
      const movie = { ...newMovie, id: Date.now() };
      movies.push(movie);
      setTimeout(() => resolve({ data: movie }), 500);
    });
  },

  async updateMovie(id, updatedData) {
    return new Promise((resolve) => {
      movies = movies.map(movie => 
        movie.id === id ? { ...movie, ...updatedData } : movie
      );
      setTimeout(() => resolve({ data: movies.find(m => m.id === id) }), 500);
    });
  },

  async deleteMovie(id) {
    return new Promise((resolve) => {
      movies = movies.filter(movie => movie.id !== id);
      setTimeout(() => resolve({ data: { id } }), 500);
    });
  }
};

export default API;