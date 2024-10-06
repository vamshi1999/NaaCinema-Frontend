import axios from "axios"

const CINEMA_BASE_API_URL="http://localhost:8080/naacinema";

class CinemaService{

    getAllCinemas(){
        return axios.get(CINEMA_BASE_API_URL+'/all-cinemas');
    }

    sortCinemasDesc(){
        return axios.get(CINEMA_BASE_API_URL+'/cinema/sort-by-rating-desc');
    }

    sortCinemasAsc(){
        return axios.get(CINEMA_BASE_API_URL+'/cinema/sort-by-rating-asc');
    }

    getCinemaByName(cinemaName){
        const params = {
            name: cinemaName
        };
          
        return axios.get(CINEMA_BASE_API_URL+'/cinema/name', {params});
    }

    getCinemaByGenre(genre){
        const params = {
            genre: genre
        };
        return axios.get(CINEMA_BASE_API_URL+'/cinema/genre', {params});
    }

    addCinema(cinema){
        try{
            const formData = new FormData();

    // Add each parameter to the FormData object
    formData.append('cinemaName', cinema.cinemaName);
    formData.append('rating', parseInt(cinema.rating));
    formData.append('description', cinema.description);
    formData.append('genre', cinema.genre);
    formData.append('language', cinema.language);

    if (cinema.poster) {
      formData.append('image', cinema.poster);
    }

    const response = axios.post(CINEMA_BASE_API_URL + '/cinema/add-cinema', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

            return response.data;
        }catch (error) {
            console.error('Error adding cinema:', error);
            throw error;
        }
    }
}
export default new CinemaService()