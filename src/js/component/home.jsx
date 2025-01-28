//https://playground.4geeks.com/sound/songs
//https:playground.4geeks.com/
import React, { useEffect, useRef, useState } from "react";
import Song from "./song";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faForward, faBackward, faPause } from "@fortawesome/free-solid-svg-icons";

//create your first component
const Home = () => {

	const [songs, setSong] = useState();
	const [flag, setFlag] = useState(false);
	const [songActive, setSongActive] = useState();
	const reproductor = useRef(null);
	const rute = 'https:playground.4geeks.com';

	const getApi = () => {
		fetch("https://playground.4geeks.com/sound/songs") //Accedo a la api rest
			.then(res => res.json()
			)
			.then(response => {
				console.log(response)
				setSong(response.songs)

			})
			.catch(error => console.log(error))
	}

	useEffect(() => {
		getApi()
	}, [])

	useEffect(() => {
		reproductor.current = new Audio()
	}, [])

	const putSong = (song) => {

		setSongActive(song)
		setFlag(true)
		reproductor.current.src = rute + songs[song - 1].url;
		reproductor.current.play()
	}

	return (

		<>
			<div className="container p-3 bg-dark mt-3">

				<ul>
					{!!songs &&
						songs.map((song) => {
							return (
								<li key={song.id} onClick={() => putSong(song.id)}> <Song nombre={song.name} id={song.id} /> </li>
							);
						}
						)}
				</ul>

				<div className="bg-secondary-subtle text-center sticky-bottom">
					<button className="fs-5 btn" onClick={() => songActive != null ? (songActive <= 1 ? putSong(1) : putSong(songActive - 1)) : ""}> <FontAwesomeIcon icon={faBackward} /> </button>
					<button className={!flag ? "fs-5 btn" : "d-none"} onClick={() => songActive != null ? putSong(songActive) : null}> <FontAwesomeIcon icon={faPlay} /> </button>
					<button className={flag ? "fs-5 btn" : "d-none"} onClick={() => { reproductor.current.pause(), setFlag(false) }}> <FontAwesomeIcon icon={faPause} /> </button>
					<button className="fs-5 btn" onClick={() => songActive != null ? (songActive == songs.length ? putSong(1) : putSong(songActive + 1)) : ""}> <FontAwesomeIcon icon={faForward} /> </button>
					{/* //<button className="fs-5" onClick={() => }> Next </button> */}
				</div >
			</div>

		</>
	)

};

export default Home;
