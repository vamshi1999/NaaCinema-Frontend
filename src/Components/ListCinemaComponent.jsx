import React, { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import CinemaService from "../Services/CinemaService";
import { InputGroup, Form, Button } from "react-bootstrap";

const ListCinemaComponent = () => {

	const [cinemas,setCinemas] = useState([]);
	const [cinemaName,setCinemaName] = useState('');
	var [count,setCount] = useState(0);
	const navigate = useNavigate();
	const posterPath="D:/Vamshi-Dev/NaaCinema/NaaCinema-Backend/posters";

	useEffect(()=>{
		getAllCinemas();
	},[]);

	const getAllCinemas=()=>{
		CinemaService.getAllCinemas().then((response)=>{
			setCinemas(response.data);
		})
	}

	const sortCinemaHandler=(e)=>{
		setCount(count+1);
		console.log(count);
		if(count%2 === 0){
			CinemaService.sortCinemasDesc().then((response)=>{
				setCinemas(response.data);
			})
		}else{
			CinemaService.sortCinemasAsc().then((response)=>{
				setCinemas(response.data);
			})
		}
	}

	const searchCinemaByNameHandler=(e)=>{
		if(cinemaName.length > 1){
			navigate(`/naacinema/cinemas/search-cinema?cinema-name=${cinemaName}`);
		}else{
			e.preventDefault();
			console.log("Enter valid cinema name");
		}
	}


		return (
			<div className = "container">
            	<h2 className = "text-center"> <span><a href="https://fontmeme.com/telugu/"><img src="https://fontmeme.com/permalink/240901/07baab960e270f9873f4b939838a0053.png" alt="telugu" border="0" height="50px" width="50px" /></a></span><span style={{fontFamily:"cursive",fontSize:"35px"}}>Cinema</span></h2>
            	
				<Link to = "/naacinema/admin/add-cinema" className = "btn btn-primary mb-2"> Add Employee </Link>        

				<InputGroup className="mb-3">
        			<Form.Control
						type = "text"
						placeholder = "search cinema.."
						name = "cinema-name"
						className = "form-control"
						value = {cinemaName}
						onChange = {(e) => setCinemaName(e.target.value)}
        			/>
        			<Button variant="outline-primary" onClick = {(e) => searchCinemaByNameHandler(e)} >🔍</Button>
					<Button variant="outline-secondary" onClick={(e)=>sortCinemaHandler(e)} >⇃↾</Button>

      			</InputGroup>


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
}

export default ListCinemaComponent