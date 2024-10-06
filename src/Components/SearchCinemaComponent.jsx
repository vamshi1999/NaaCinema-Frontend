import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CinemaService from "../Services/CinemaService";

const SearchCinemaComponent = () => {
	const [cinemas,setCinemas] = useState([]);
	const queryParameters = new URLSearchParams(window.location.search)
	const param = queryParameters.get("cinema-name");
	const posterPath="D:/Vamshi-Dev/NaaCinema/NaaCinema-Backend/posters";


	useEffect(()=>{
		SearchCinemaHandler();
	},[]);

	const SearchCinemaHandler=()=>{
		CinemaService.getCinemaByName(param).then((response)=>{
			console.log(response.data);
			setCinemas(response.data);
		})
	}
	
	return (
		<div className = "container">
            	<h2 className = "text-center"> <span><a href="https://fontmeme.com/telugu/"><img src="https://fontmeme.com/permalink/240901/07baab960e270f9873f4b939838a0053.png" alt="telugu" border="0" height="50px" width="50px" /></a></span><span style={{fontFamily:"cursive",fontSize:"35px"}}>Cinema</span></h2>

            	<table className="table table-bordered table-striped">
					<tbody>
					{
						cinemas.map(cinema=>
							<tr key={cinema.id}>
								<td><img src={`${posterPath}/${cinema.imagePath}`} /></td>
								<td>
									<tr style={{fontSize:"20px"}}>{cinema.cinemaName}</tr>
									<tr style={{fontSize:"16px"}}>Rating: {cinema.rating}</tr>
									<tr style={{fontSize:"12px"}}>Opinion: {cinema.description}</tr>
									<tr style={{fontSize:"12px"}}>Language: {cinema.language}</tr>
								</td>
							</tr>
						)
					}
					</tbody>
				</table>
			</div>
  	)
};

export default SearchCinemaComponent
