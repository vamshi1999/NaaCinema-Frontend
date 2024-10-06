import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import CinemaService from "../Services/CinemaService";

const AddUpdateCinemaComponent = () => {
    const [cinema, setCinema] = useState({
        cinemaName: '',
        rating: 0,
        description: '',
        poster: null,
        genre: '',
        language: '',
      });
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState('');
    const {id}=useParams();

    useEffect(()=>{
        navigate("/naacinema/admin/add-cinema");
    },[]);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setCinema((prevCinema) => ({
          ...prevCinema,
          [name]: name === 'poster' ? files[0] : value,
        }));
      };

    const saveOrUpdateCinema=(e)=>{
            CinemaService.addCinema(cinema);
    }

    const handleValidations=(e)=>{
        if(cinema.cinemaName.length<1){
            e.preventDefault();
            setErrMessage("Invalid Cinema Name. Please enter valid name.");
        }else if(cinema.rating<1 | cinema.rating>5){
            e.preventDefault();
            setErrMessage("Invalid Rating. Please enter valid rating between 1 to 5.");
        }else if(cinema.description.length<50){
            e.preventDefault();
            setErrMessage("Invalid Opinion. Opinion should contain atleast 50 letters.");
        }else if(cinema.genre.length === 0){
            e.preventDefault();
            setErrMessage("Invalid Genre. Please select a valid genre from dropdown.");
        }else if(cinema.language.length<3){
            e.preventDefault();
            setErrMessage("Invalid Language. Please enter a valid language.");
        }else if(cinema.poster === null | !cinema.poster){
            e.preventDefault();
            setErrMessage("Please upload poster!");
        }else{
            alert("Are you sure!");
            setErrMessage(<p style={{color:"green"}}>Cinema uploaded successfully</p>);
            saveOrUpdateCinema(e);
        }
    }

    const title = () => {
        if(id){
            return <h3 className = "text-center">Update Cinema</h3>
        }else{
            return <h3 className = "text-center">Add Cinema</h3>
        }
    }

    return (
        <div>
            <div className = "container">
                <h2 className = "text-center"> <span><a href="https://fontmeme.com/telugu/"><img src="https://fontmeme.com/permalink/240901/07baab960e270f9873f4b939838a0053.png" alt="telugu" border="0" height="50px" width="50px" /></a></span><span style={{fontFamily:"cursive",fontSize:"35px"}}>Cinema</span></h2>
                <br />
                <div className = "row">
                <div style={{ flex: 1 }}>
                    <div className = "card col-md-50 offset-md-2 offset-md-2">
                       {
                           title()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Cinema Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter cinema name"
                                        name = "cinemaName"
                                        className = "form-control"
                                        value = {cinema.cinemaName}
                                        onChange = {handleChange}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Rating :</label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter rating from 1 to 5"
                                        name = "rating"
                                        className = "form-control"
                                        value = {cinema.rating}
                                        onChange = {handleChange}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Description :</label>
                                    <textarea
                                        type = "text"
                                        placeholder = "Enter Description"
                                        name = "description"
                                        className = "form-control"
                                        value = {cinema.description}
                                        onChange = {handleChange}
                                    >
                                    </textarea>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Genre :</label>
                                    <select className="form-control" name="genre" value={cinema.genre} onChange={handleChange}>
                                        <option>select</option>
                                        <option value="ACTION" selected={cinema.genre === "ACTION"}>ACTION</option>
                                        <option value="COMEDY" selected={cinema.genre === "COMEDY"}>COMEDY</option>
                                        <option value="DRAMA" selected={cinema.genre === "DRAMA"}>DRAMA</option>
                                        <option value="HORROR" selected={cinema.genre === "HORROR"}>HORROR</option>
                                        <option value="SCIFI" selected={cinema.genre === "SCIFI"}>SCIFI</option>
                                    </select>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Language :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Language / All--if Pan-India"
                                        name = "language"
                                        className = "form-control"
                                        value = {cinema.language}
                                        onChange = {handleChange}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Upload Poster :</label>
                                    <input 
                                        type="file" 
                                        name="poster"   
                                        className="form-control"
                                        accept="image/*" 
                                        onChange={handleChange}
                                        required
                                    >
                                    </input>
                                </div>

                                <p className="text-danger" style={{fontSize:"12px"}}>{errMessage}</p>

                                <button className = "btn btn-success" onClick = {(e) => handleValidations(e)} >Submit </button>    &nbsp;
                                <Link to="/naacinema/cinemas" className="btn btn-danger"> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>

                <div style={{ flex: 1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                    <h6 style={{color:"red"}}>
                        <marquee>*Please follow the instructions*</marquee>
                    </h6>
                    <p style={{fontSize:"14px"}}>
                        <ul style={{listStyleType:"circle"}}>
                            <li>Cinema Name should contain atleast one letter</li>
                            <li>Please enter the rating between 1 to 5</li>
                            <li>Description should contain atleast 50 letters</li>
                            <li><span>Enter </span><span style={{background:"#D3D3D3"}}>All</span><span> if cinema released in all languages</span></li>
                            <li>Please upload the cinema poster before clicking on submit</li>
                        </ul>
                    </p>
                </div>

                </div>

           </div>
        </div>
    )
};

export default AddUpdateCinemaComponent
