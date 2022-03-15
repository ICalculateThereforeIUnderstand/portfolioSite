import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BsArrowRightShort } from "react-icons/bs";
import {Navbar, Navbar2} from "./navbar.js";
import {SkillBar} from "./skillbar.js";
import Forma from "./forma.js";
import { MoveElement1 } from "./movingElement.js";
import { Modal } from "./modal.js";
import { Provider } from 'react-redux';
import { store, postaviJezik, postaviHoverSw } from './store.js';
import { useSelector, useDispatch } from 'react-redux';

import { PrvaStranica as PrviPage, DrugaStranica  as DrugiPage, TrecaStranica as TreciPage, 
	     CetvrtaStranica as CetvrtiPage, PetiPage, SestiPage, SedmiPage, OsmiPage, DevetiPage, DesetiPage, Page11,
	     Page12, Page13, Page14, Page15, Page16, Page17, Page19, Page22, Page23, Page24, Page25, Page26, Page27, Page28 } from "./stranice.js";
import { Page18, Page20, Page21 } from "./animiraneStranice.js";


window.onload = function() {
	document.addEventListener("keydown", (e) => {pritisakGumba(e)});
	let ell = document.querySelector("html");
	function pritisakGumba(e) {
		if (e.code === "KeyS") {
			console.log("sirina/visina prozora su " + ell.clientWidth + " / " + ell.clientHeight);
			console.log(Math.random());
		}
	}
	
}

let cont = document.querySelector("#cont");

function ToggleSwitch({sw=false, tekst1="t", tekst2="f"}) {
	const [stanje, setStanje] = React.useState(sw);
	const r = React.useRef();
	
	const jezik = useSelector(state=> state.jezik);
	const dispatch = useDispatch();
	
	React.useEffect(() => {
		if (stanje) {
			r.current.style.left = "40px";
			dispatch(postaviJezik("hr"));
		} else {
			r.current.style.left = "5px";
			dispatch(postaviJezik("en"));
		}
	}, [stanje]);
	
	function toggle() {
		setStanje((prevState) => {return !prevState});
	}
	
	return (
	    <div className="toggleSwitch" onClick={toggle}>
	        <div className="toggleSwitch-prekidac" ref={r}></div>
	        <div className="toggleSwitch-tekst1">
	            <p>{tekst1}</p>
	        </div>
	        <div className="toggleSwitch-tekst2">
	            <p>{tekst2}</p>
	        </div>
	    </div>
	)
}

function PrvaStranica() {
		
	const r = React.useRef();
	const r1 = React.useRef();
	const r2 = React.useRef();
	const r3 = React.useRef();
	const r4 = React.useRef();
	
	const jezik = useSelector(state=> state.jezik);
	
	React.useEffect(() => {
		if (jezik == "en") {
			r3.current.style.fontSize = "18px";
		} else {
			r3.current.style.fontSize = "12px";
		}
	}, [jezik]);
	
	React.useEffect(() => {
		r3.current.addEventListener("mouseenter", hoveraj);
        r3.current.addEventListener("mouseleave", odhoveraj);
		
	}, []);
	
	function hoveraj() {
		r4.current.style.transform = "rotate(90deg)";
	}
	
	function odhoveraj() {
		r4.current.style.transform = "rotate(0deg)";
	}
		
	function scrolaj() {
		window.scrollTo(0, r.current.clientHeight); 
	}
	
	return (
	    <div ref={r} className="prva-stranica" id="home">
	        <ToggleSwitch tekst1="hr" tekst2="en"/>
	        <p ref={r1} className="prva-stranica-p1">{jezik == "en" ? "Hello. I am " : "Dobar dan. Ja sam "}<span  className="prva-stranica-span">{jezik == "en" ? "Slobodan Savic" : "Slobodan Savić"}</span>.</p>
	        <p ref={r2} className="prva-stranica-p2">{jezik == "en" ? "I am front-end web developer." : "Bavim se front-endom."}</p>
	        <div ref={r3} className="prva-stranica-gumb" onClick={scrolaj}>
	            <p>{jezik == "en" ? "View my work" : "Pogledajte moje radove"}</p>
	            <div className="prva-stranica-gumb-el" ref={r4}>
	                <BsArrowRightShort className="prva-stranica-strelica"/>
	            </div>
	        </div>
	    </div>
	)
}

function TrecaStranica() {
	
	const jezik = useSelector(state=> state.jezik);
	const hoverSw = useSelector(state=> state.hoverSw);
	const dispatch = useDispatch();
     	
	const [data, setData] = React.useState({}); 
	const [data1, setData1] = React.useState({}); 
	const [data2, setData2] = React.useState({}); 
	const [data3, setData3] = React.useState({}); 
	const [data4, setData4] = React.useState({}); 
	const [data5, setData5] = React.useState({}); 
	const [data6, setData6] = React.useState({}); 
	const [data7, setData7] = React.useState({});
	const [data8, setData8] = React.useState({});  
	const [data9, setData9] = React.useState({});
	const [data10, setData10] = React.useState({});    
	
	React.useEffect(() => {
		dispatch(postaviHoverSw(hoverCapability("hoverTest")));
	}, []);
	
	React.useEffect(() => {   
        if (jezik == "en") {
			setData({"naslov": "Web bookstore", "jezik": "PHP", "naslovSize": 18, "slikaUrl": "./slike/demetra.jpg", modalID: "modal-el",
	        "panelNaslov": "Online bookstore web site + PHP web application", "panelNaslov1": "PHP/HTML/CSS", "panelTekst": "This project was about creating web site for small bookstore, relational database with book information and web application (private web page under password) for management of database and the web site. Idea was to create complete solution for small family firm in book-selling business which controls web site, all information about books and warehouses. User-interface of manager was supposed to be intuitive and usable for below average user who does not know what is relational database (like my 64-year old mother).",
	        "siteUrl": "http://www.savicslobodan.com/demetra", "stranice": [PrviPage, DrugiPage, TreciPage, CetvrtiPage, PetiPage]});
			
		    setData1({"naslov": "REACT HTML TETRIS", "jezik": "REACT", "naslovSize": 18, "slikaUrl": "./slike/tetris.jpg", modalID: "modal-el1",
	        "panelNaslov": "Game of Tetris", "panelNaslov1": "REACT", "panelTekst": "In this project the goal was to build more ambitious game in React. I believe Tetris is perfect choice, because it is possible to build it in pure HTML+CSS+JavaScript which makes it pure React or Javascript exercise. This was my first game written in React which I knew at that point for about 30 days (I have written Tetris game in Javascript previously). I believe this game turned up just fine. Check it out!",
	        "siteUrl": "http://www.savicslobodan.com/react_tetris", "stranice": [SestiPage]});
	        
	        setData2({"naslov": "REACT SNAKE", "jezik": "REACT/SCSS", "naslovSize": 18, "slikaUrl": "./slike/reactSnake.jpg", modalID: "modal-el2",
	        "panelNaslov": "The Snake Game", "panelNaslov1": "REACT/SCSS", "panelTekst": "This is my second game written in React. Surfing the net for project ideas, I came upon old game we all played on first mobile phones - The Snake Game. This one looked to me as very good choice. As in case of Tetris, in can be made with pure HTML - only div elements are required with no use of Canvas and no messing with artifical intelligence.",
	        "siteUrl": "http://www.savicslobodan.com/react_snake", "stranice": [SedmiPage]});
	     
	        setData3({"naslov": "WEB SITE OF RESTAURANT", "jezik": "WORDPRESS", "naslovSize": 17, "slikaUrl": "./slike/sofraNaslovna.jpg", modalID: "modal-el3",
	        "panelNaslov": "Web site of restaurant", "panelNaslov1": "REACT/SCSS", "panelTekst": "This was my self-given final exam of self-taught course on Wordpress. The idea here was to build nice looking internet site for a restaurant, site which could actually be sold to real restaurant owner. I have chosen to build site for Sofra, which by the way is very good restaurant (I visit it once per week), very affordable, possibly best ratio of quality(very high) and price in Zagreb.",
	        "siteUrl": "http://www.savicslobodan.com/sofra", "stranice": [OsmiPage, DevetiPage, DesetiPage, Page11]});
	        
	        setData4({"naslov": "BREAKOUT", "jezik": "JAVASCRIPT", "naslovSize": 17, "slikaUrl": "./slike/breakout.jpg", modalID: "modal-el4",
	        "panelNaslov": "Classical Breakout game", "panelNaslov1": "JavaScript/jQuery", "panelTekst": "In this project I have made remake of famous Breakout game from 1976. I have implemented 8 different levels and have added additional game elements (mirrors for ball rebound and falling bonuses). This is my first game written in JavaScript in which I have used JQuery - an exercise as I have just learnt it.",
	        "siteUrl": "http://www.savicslobodan.com/breakout", "stranice": [Page12, Page13, Page14]});
	        
	        setData5({"naslov": "MEMORY GAMES", "jezik": "JAVASCRIPT", "naslovSize": 17, "slikaUrl": "./slike/memory.jpg", modalID: "modal-el5",
	        "panelNaslov": "Memory games", "panelNaslov1": "JavaScript/jQuery", "panelTekst": "Here we have three memory games. First one is classical memory game Concentration played with up to 36 cards, game we all played as children, even before computer age. Other two are tests of short-term memory, visual and pattern. This last one is variation of famous the Chimp Test, where it is shown that avarage chimpanzee outperforms avarage man!",
	        "siteUrl": "https://savicslobodan.com/memori_igra1", "stranice": [Page15, Page16, Page17]});
	        
	        setData6({"naslov": "SPECIAL EFFECTS", "jezik": "JAVASCRIPT", "naslovSize": 17, "slikaUrl": "./slike/efekti.jpg", modalID: "modal-el6",
	        "panelNaslov": "Special effects", "panelNaslov1": "JavaScript", "panelTekst": "This project was inspired by the opening credits of movie Hollow Man (see video) I stumbled upon while doing some animations. It occurred to me that it could be nice and interesting programming adventure, and also it looked pretty achievable  with today's browsers. At first I focused on doing work on letters exclusively, but later I adjusted my library for work with pieces of pictures and other html elements!",
	        "siteUrl": "https://savicslobodan.com/memori_igra1", "stranice": [Page22, Page23, Page18, Page20, Page21]});  
	        
	        setData7({"naslov": "CROPANG", "jezik": "JAVASCRIPT/SCSS", "naslovSize": 17, "slikaUrl": "./slike/pang.jpg", modalID: "modal-el7",
	        "panelNaslov": "HTML PANG", "panelNaslov1": "JavaScript/SCSS", "panelTekst": "The goal of this project was to make a clone of my favorite arcade game of childhood - The Pang. Similarly to Tetris, this game is possible utilizing only HTML+CSS graphics plus game engine in JavaScript. For the beginning, I have implemented simpler 'panic mode' of game, where balls are showing up regularly and falling into screen from its upper edge. One day I plan to continue developing this game, and plan to implement different levels of game's non-panic normal mode where player flies across the world's map to different cities and each level has different layout of platforms he can walk on, ladders, bonuses, three types of weapons, etc.",
	        "siteUrl": "https://savicslobodan.com/cropang", "stranice": [Page19]});
	        
	        setData8({"naslov": "MINESWEEPER", "jezik": "REACT", "naslovSize": 17, "slikaUrl": "./slike/minesweeper.jpg", modalID: "modal-el8",
	        "panelNaslov": "MINESWEEPER", "panelNaslov1": "REACT", "panelTekst": "In this project I have implemented the game Minesweeper in React. I have taken care of responsive design so that the game looks nice on most screens. The game's controls are also adapted for playing on smartphones - right mouse click is accomplished with longer touch of the screen.",
	        "siteUrl": "https://savicslobodan.com/minesweeper", "stranice": [Page24]});
	        
	        setData9({"naslov": "THIS SITE", "jezik": "REACT/REDUX/JAVASCRIPT", "naslovSize": 17, "slikaUrl": "./slike/portfolioSite.jpg", modalID: "modal-el9",
	        "panelNaslov": "THIS SITE", "panelNaslov1": "REACT/REDUX/JAVASCRIPT", "panelTekst": "This is my personal portfolio site. Beside React, I have used JavaScript and Redux. Use of Redux in this project was probably overkill, but reason I used it was exercise and demonstration of skill. Code of entire site can be found at my github account.",
	        "siteUrl": "https://savicslobodan.com/portfolioSite", "stranice": [Page25]});
	        
	        setData10({"naslov": "WEB SITE OF RESTAURANT", "jezik": "HTML/CSS/Bootstrap", "naslovSize": 17, "slikaUrl": "./slike/naslovnaSofra.jpg", modalID: "modal-el10",
	        "panelNaslov": "Web site of restaurant", "panelNaslov1": "HTML/CSS/Bootstrap", "panelTekst": "This was my final exam of self-learning Bootstrap course. I have created a replica of a real commercial web site for Zagreb`s restaurant The Sofra. I have done similar project for same restaurant one year ago in Wordpress. In this project main goal was to exercise application of Bootstrap, to apply more advance parallax effects using my own parallax library for moving elements and backgrounds in real time during scrolling. I have also used this opportunity to write library for customizable scrolling of pages. This library enables web-designer to adjust speed and pattern of scrolling on internet pages when for example, hyperlink is clicked (using Bezier curves which tell browser how to scroll page frame-by-frame).",
	        "siteUrl": "https://savicslobodan.com/sofra1", "stranice": [Page26, Page27, Page28]});
	    } else {
			setData({"naslov": "Web knjižara", "jezik": "PHP", "naslovSize": 18, "slikaUrl": "./slike/demetra.jpg", modalID: "modal-el",
	        "panelNaslov": "Online knjižara web site + PHP web aplikacija", "panelNaslov1": "PHP/HTML/CSS", "panelTekst": "Ovaj projekt se sastojao od web-stranice za knjižaru, baze podataka sa knjigama i web-aplikacije (privatna stranica pod šifrom) za managment baze podataka i same stranice. Ideja je bila napraviti kompletno riješenje za malu obiteljsku firmu koja prodaje knjige, gdje je moguće kroz manager upravljati web-stranicom, podacima o knjigama i podacima o skladištima knjiga. User-interface managera morao je biti intuitivan, upotrebljiv od strane ispodprosječnog korisnika računala koji ni ne zna što je baza podataka (čitaj moja majka od 65 god).",
	        "siteUrl": "http://www.savicslobodan.com/demetra", "stranice": [PrviPage, DrugiPage, TreciPage, CetvrtiPage, PetiPage]});

		    setData1({"naslov": "REACT HTML TETRIS", "jezik": "REACT", "naslovSize": 18, "slikaUrl": "./slike/tetris.jpg", modalID: "modal-el1",
	        "panelNaslov": "Klasična igrica Tetris", "panelNaslov1": "REACT", "panelTekst": "U ovom projektu je bio cilj napraviti ambiciozniju igricu u Reactu. Tetris je jako dobar odabir, zato što ga je moguće izraditi u čistom html-u i css-u plus JavaScriptu. Ovo mi je prva igrica u Reactu, kojeg sam poznavao u tom trenutku tek četrdesetak dana (Tetris sam prethodno već jednom izprogramirao za vježbu u JavaScriptu). Mislim da je ispao prilično dobro. Check it out!",
	        "siteUrl": "http://www.savicslobodan.com/react_tetris", "stranice": [SestiPage]});
	        
	        setData2({"naslov": "REACT SNAKE", "jezik": "REACT/SCSS", "naslovSize": 18, "slikaUrl": "./slike/reactSnake.jpg", modalID: "modal-el2",
	        "panelNaslov": "Klasična igrica Snake", "panelNaslov1": "REACT/SCSS", "panelTekst": "Ovo je moja druga igrica u Reactu. Surfajući po internetu odlučio sam se za igricu Snake - činila mi se savršena za poboljšanje vještine programiranja u Reactu, a kao i Tetris, moguće ju je izraditi sa čistim HTML elementima (skoro samo div elementi bez korištenja canvasa i komplikacija naprednije grafike). Također nema zafrkancija sa umjetnom inteligencijom protivnika.",
	        "siteUrl": "http://www.savicslobodan.com/react_snake", "stranice": [SedmiPage]});
	    
	        setData3({"naslov": "WEB STRANICA RESTORANA", "jezik": "WORDPRESS", "naslovSize": 17, "slikaUrl": "./slike/sofraNaslovna.jpg", modalID: "modal-el3",
	        "panelNaslov": "Web site restorana", "panelNaslov1": "REACT/SCSS", "panelTekst": "Ovo je bila moja završna vježba učenja Wordpressa. Ideja je bila napraviti reprezentativni internet site restorana, koji bi vlasnik restorana bio voljan kupiti. Odabrao sam restoran Sofru, koji je usput jako dobar restoran (jednom tjedno ga posjećujem), prilično povoljan, moguće najbolji odnos kvalitete i cijene u gradu, te je za svaku preporuku.",
	        "siteUrl": "http://www.savicslobodan.com/sofra", "stranice": [OsmiPage, DevetiPage, DesetiPage, Page11]});
	        
	        setData4({"naslov": "BREAKOUT", "jezik": "JAVASCRIPT", "naslovSize": 17, "slikaUrl": "./slike/breakout.jpg", modalID: "modal-el4",
	        "panelNaslov": "Klasična igrica Breakout", "panelNaslov1": "JavaScript/jQuery", "panelTekst": "U ovom projektu sam napravio remake klasične igrice Breakout iz 1976. god. Implementirao sam 8 različitih nivoa i nadodao sam neke dodatne elemente (pregrade/zrcala za odbijanje loptice, padajuće bonuse). Ovo je moja prva igrica - koristio sam radi vježbe jQuery koji sam baš tada naučio.",
	        "siteUrl": "http://www.savicslobodan.com/breakout", "stranice": [Page12, Page13, Page14]});
	        
	        setData5({"naslov": "MEMORY IGRE", "jezik": "JAVASCRIPT", "naslovSize": 17, "slikaUrl": "./slike/memory.jpg", modalID: "modal-el5",
	        "panelNaslov": "Memory igre", "panelNaslov1": "JavaScript/jQuery", "panelTekst": "Ovdje imamo tri memory igrice koje sam napravio za vježbu. Prva igrica je klasični memory sa 36 kartica, igrica koju smo igrali kao djeca i prije internet ere i proširenosti kompjutera. Druge dvije su testovi kratkotrajne memorije. Jedan od ta dva testa je čuveni Chimp Test, za koji je dokazano da prosječna čimpanza postiže bolje rezultate od prosječnog čovjeka!",
	        "siteUrl": "https://savicslobodan.com/memori_igra1", "stranice": [Page15, Page16, Page17]});

	        setData6({"naslov": "SPECIJALNI EFEKTI", "jezik": "JAVASCRIPT", "naslovSize": 17, "slikaUrl": "./slike/efekti.jpg", modalID: "modal-el6",
	        "panelNaslov": "Specijalni efekti", "panelNaslov1": "JavaScript", "panelTekst": "Ovaj projekt je inspiriran uvodnim dijelom filma Hollow Man (video) na kojeg sam naletio na TV-u baš kada sam se bavio animacijama za jedan site. Pomislio sam da bi bila zgodna programerska avantura upustiti se u nešto slično, a i činilo mi se da je to vrlo ostvarivo sa današnjim browserima. U početku sam se koncentrirao isključivo na slova, ali kasnije sam library prilagodio i za komadiće slika i ostalih html elemenata!",
	        "siteUrl": "https://savicslobodan.com/memori_igra1", "stranice": [Page22, Page23, Page18, Page20, Page21]}); 
	        
	        setData7({"naslov": "CROPANG", "jezik": "JAVASCRIPT/SCSS", "naslovSize": 17, "slikaUrl": "./slike/pang.jpg", modalID: "modal-el7",
	        "panelNaslov": "HTML PANG", "panelNaslov1": "JavaScript/SCSS", "panelTekst": 'O ovom projektu je ideja bila napraviti klona moje omiljene arkadne igrice iz djetinjstva - Pang. Slično kao i kod Tetrisa, i ovu je igricu moguće napisati skoro samo u HTML+CSS plus engine u JavaScriptu. Za početak sam napravio tzv. "panic mode" igrice, gdje loptice dolaze na ekran u redovitim vremenskim intervalima sa gornjeg brida. Jednog lijepog dana mislim nastaviti razvijati igricu i implementirati razne levele normalnog playa (gdje igrač leti avionom po svijetu i svaki nivo ima različite platforme na koje se igrač može popesti, stepenice, bonuse, tri vrste oružja itd).',
	        "siteUrl": "https://savicslobodan.com/cropang", "stranice": [Page19]});
	        
	        setData8({"naslov": "MINESWEEPER", "jezik": "REACT", "naslovSize": 17, "slikaUrl": "./slike/minesweeper.jpg", modalID: "modal-el8",
	        "panelNaslov": "MINESWEEPER", "panelNaslov1": "REACT", "panelTekst": "U ovom projektu sam napisao u Reactu igricu Minesweeper. Pobrinuo sam se za responsive design tako da igrica izgleda lijepo na svim ekranima. Također je napravljena da se može igrati i na mobitelima - desni klik miša se postiže na mobitelu duljim dodirom polja.",
	        "siteUrl": "https://savicslobodan.com/minesweeper", "stranice": [Page24]});
	        
	        setData9({"naslov": "OVAJ SITE", "jezik": "REACT/REDUX/JAVASCRIPT", "naslovSize": 17, "slikaUrl": "./slike/portfolioSite.jpg", modalID: "modal-el9",
	        "panelNaslov": "OVAJ SITE", "panelNaslov1": "REACT/REDUX/JAVASCRIPT", "panelTekst": "Ovo je moj osobni portfolio site. Osim Reacta koristio sam i JavaScript te Redux, za kojim nije bilo velike potrebe, a glavni razlog je bio vježba i demonstracija vještine. Kod cijelog sitea se nalazi na mojem accountu na githubu.",
	        "siteUrl": "https://savicslobodan.com/portfolioSite", "stranice": [Page25]});
	        
	        setData10({"naslov": "WEB STRANICA RESTORANA", "jezik": "HTML/CSS/Bootstrap", "naslovSize": 17, "slikaUrl": "./slike/naslovnaSofra.jpg", modalID: "modal-el10",
	        "panelNaslov": "Web site restorana", "panelNaslov1": "HTML/CSS/Bootstrap", "panelTekst": "Ovo je bio moj završni projekt učenja Bootstrapa. Napravio sam repliku pravog komercijalnog web sitea poznatog zagrebačkog restorana Sofra. Slični site sam napravio i prije godinu dana u Wordpressu. U ovom projektu sam iskoristio priliku i primjenio sam naprednije tehnike paralaks grafičkih efekata, i to korištenjem vlastitog javascript librarija za pomake elemenata i backgrounda u realnom vremenu. Također sam iskoristio priliku za razvoj librarija za prilagodljiv scrolling frame-by-frame ekrana. Moj novi library omogućuje potpunu prilagodljivost brzine i oblika skrolanja ekrana prilikom klika na hiperlink (korištenjem Bezierovih krivulja).",
	        "siteUrl": "https://savicslobodan.com/sofra1", "stranice": [Page26, Page27, Page28]});
	    }
	
    }, [jezik]);
    
    function hoverCapability(id) {
    // ova funkcija provjerava da li uredaj ima hover sposobnosti, id je id testnog div elementa kojem media query mjenja boju ovisno o hover sposobnosti
	    if (window.getComputedStyle(document.querySelector("#"+id)).getPropertyValue("background-color") == "rgb(0, 0, 0)")  return true;
	    return false;
    }
	
	return (
	    <div className="treca-stranica" id="portfolio">
	        <div className="treca-stranica-el">
	            <p className="treca-stranica-el-naslov" id="treca-stranica-el-naslov-id">{jezik === "en" ? "PROJECTS" : "PROJEKTI"}</p>
	            <div className="treca-stranica-el-crta" id="treca-stranica-el-crta-id"></div>
	            <MoveElement1 vel={0} idPointera="treca-stranica-pointer" idElementa="treca-stranica-el-naslov-id" pomak="r" velPomak="80vw" oneWay={true}/>
	            <MoveElement1 vel={0} idPointera="treca-stranica-pointer1" idElementa="treca-stranica-el-crta-id" pomak="l" velPomak="80vw" oneWay={true}/>
	        </div>
	    
	        <div className="treca-stranica1-el1">	            
	            <div id="modal-marker">
	                <Modal {...data}/>
	            </div>
	            <div id="modal-marker1">
	                <Modal {...data1}/>       
	            </div> 
	            <div id="modal-marker2">   
	                <Modal {...data2}/>  
	            </div>   
	            <div id="modal-marker3"> 
	                <Modal {...data3}/>
	            </div>  
	            <div id="modal-marker4">  
	                <Modal {...data4}/>  
	            </div>
	            <div id="modal-marker5">
	                <Modal {...data5}/>
	            </div>
	            <div id="modal-marker6">
	                <Modal {...data6}/>
	            </div>
	            <div id="modal-marker7">
	                <Modal {...data7}/>
	            </div>
	            <div id="modal-marker8">
	                <Modal {...data8}/>
	            </div>
	            <div id="modal-marker9">
	                <Modal {...data9}/>
	            </div>
	            <div id="modal-marker10">
	                <Modal {...data10}/>
	            </div>
	            <MoveElement1 vel={0} idPointera="modal-pointer1" idElementa="modal-marker" pomak="r" velPomak="100vw" oneWay={true}/>
	            <MoveElement1 vel={0} idPointera="modal-pointer2" idElementa="modal-marker1" pomak="l" velPomak="100vw" oneWay={true}/>
	            <MoveElement1 vel={0} idPointera="modal-pointer3" idElementa="modal-marker2" pomak="r" velPomak="100vw" oneWay={true}/>
	            <MoveElement1 vel={0} idPointera="modal-pointer4" idElementa="modal-marker3" pomak="l" velPomak="100vw" oneWay={true}/>
	            <MoveElement1 vel={0} idPointera="modal-pointer5" idElementa="modal-marker4" pomak="r" velPomak="100vw" oneWay={true}/>
	            <MoveElement1 vel={0} idPointera="modal-pointer6" idElementa="modal-marker5" pomak="l" velPomak="100vw" oneWay={true}/>
	            <MoveElement1 vel={0} idPointera="modal-pointer7" idElementa="modal-marker6" pomak="r" velPomak="100vw" oneWay={true}/>
	            <MoveElement1 vel={0} idPointera="modal-pointer8" idElementa="modal-marker7" pomak="l" velPomak="100vw" oneWay={true}/>
	            <MoveElement1 vel={0} idPointera="modal-pointer9" idElementa="modal-marker8" pomak="r" velPomak="100vw" oneWay={true}/>
	            <MoveElement1 vel={0} idPointera="modal-pointer10" idElementa="modal-marker9" pomak="l" velPomak="100vw" oneWay={true}/>
	            <MoveElement1 vel={0} idPointera="modal-pointer11" idElementa="modal-marker10" pomak="r" velPomak="100vw" oneWay={true}/>
	        </div>
            <div className="treca-stranica-space">
            </div>
	    </div>
	)
}

function HeksagonPic({a=100}) {
	
	return (
	    <div className="heksagon" style={{"height": 1.732*a+"px", "width": 2*a+"px"}}>
	        <img src="./slike/myPic.jpg" alt="my picture" className="heksagon-slika" style={{"height": 1632/918*2*a+"px", "width": 2*a+"px"}}/>
	        <div style={{"borderTop": 0.866*a + "px solid white", "borderRight": a/2 + "px solid transparent", "top": "0px", "left": "0px"}} className="heksagon-el heksagon-trokut-lijevi-gore"></div>
	        <div style={{"borderBottom": 0.866*a + "px solid white", "borderRight": a/2 + "px solid transparent", "bottom": "0px", "left": "0px"}} className="heksagon-el heksagon-trokut-lijevi-dolje"></div>
	        <div style={{"borderTop": 0.866*a + "px solid white", "borderLeft": a/2 + "px solid transparent", "top": "0px", "right": "0px"}} className="heksagon-el heksagon-trokut-desni-gore"></div>
	        <div style={{"borderBottom": 0.866*a + "px solid white", "borderLeft": a/2 + "px solid transparent", "bottom": "0px", "right": "0px"}} className="heksagon-el heksagon-trokut-desni-dolje"></div>
	    </div>
	)
}

function DrugaStranica() {
	
	const jezik = useSelector(state=> state.jezik);
	
	return (
	    <div className="druga-stranica" id="about">
	        <div className="druga-stranica-el">
	            <p className="druga-stranica-about" id="druga-stranica-el5">{jezik == "en" ? "ABOUT" : "O MENI"}</p>
	            <MoveElement1 vel={0} idPointera="pointer5" idElementa="druga-stranica-el5" pomak="l" velPomak="80vw" oneWay={true}/>
	            <div className="druga-stranica-el1" id="druga-stranica-el6"></div>
	            <MoveElement1 vel={0} idPointera="pointer6" idElementa="druga-stranica-el6" pomak="r" velPomak="80vw" oneWay={true}/>
	        </div>
	      <div className="druga-stranica-element">  
	        <div className="druga-stranica-el2" id="druga-stranica-el7">
	            <HeksagonPic a={130}/>
	            <p className="druga-stranica-p1">{jezik == "en" ? "Who is this guy?" : "Tko sam ja?"}</p>
	            <p className="druga-stranica-p2">{jezik == "en" ? "I am front-end developer from Zagreb. I have serious passion for web-design, javascript, react and animations." : "Ja sam front-end developer iz Zagreba. Moji interesi su web-dizajn, javascript, react i animacije."}</p>
	            <p className="druga-stranica-p3">{jezik == "en" ? "When not working, I am again at computer doing hobby projects with Python/C++. I love what I do - My work is my hobby, which is my life." : "U mojem slobodnom vremenu možete me ponovo pronaći za kompjuterom, gdje najvjerojatnije se bavim raznim projektima(Python/C++). Moj posao je meni hobi, a on pak drugo disanje."}</p>
	        </div>
	        <MoveElement1 vel={0} idPointera="pointer7" idElementa="druga-stranica-el7" pomak="l" velPomak="80vw" oneWay={true}/>
	        <div className="druga-stranica-el3" id="druga-stranica-el8">
	            <SkillBar offsetSw="n" sw={true} height="30px" width="80%" posto={90} tekst="HTML"/>
                <SkillBar offsetSw="n" sw={true} height="30px" width="80%" posto={90} tekst="CSS"/>
                <SkillBar offsetSw="n" sw={true} height="30px" width="80%" posto={85} tekst="JavaScript"/>
                <SkillBar offsetSw="n" sw={true} height="30px" width="80%" posto={83} tekst="React"/>
                <SkillBar offsetSw="n" sw={true} height="30px" width="80%" posto={75} tekst="Redux"/>
                <SkillBar offsetSw="n" sw={true} height="30px" width="80%" posto={75} tekst="PHP"/>
                <SkillBar offsetSw="n" sw={true} height="30px" width="80%" posto={85} tekst="Sass"/>
                <SkillBar offsetSw="n" sw={true} height="30px" width="80%" posto={65} tekst="jQuery"/>
                <SkillBar offsetSw="n" sw={true} height="30px" width="80%" posto={75} tekst="WordPress"/>
                <SkillBar offsetSw="n" sw={true} height="30px" width="80%" posto={70} tekst="Inkscape"/>
                <SkillBar offsetSw="n" sw={true} height="30px" width="80%" posto={70} tekst="Audacity"/>
                <SkillBar offsetSw="n" sw={true} height="30px" width="80%" posto={80} tekst="C/C++"/>
                <SkillBar offsetSw="n" sw={true} height="30px" width="80%" posto={80} tekst="SQL"/>
                <SkillBar offsetSw="n" sw={true} height="30px" width="80%" posto={85} tekst="Python"/>
	        </div>
	        <MoveElement1 vel={0} idPointera="pointer8" idElementa="druga-stranica-el8" pomak="r" velPomak="80vw" oneWay={true}/>
	      </div>  
	    </div>
	)
}

function App() {
	
	return (
	    <Provider store={store}>
	        <PrvaStranica/>
	        <Navbar2/>
	        <DrugaStranica/>
	        <TrecaStranica/>
	        <Forma/>
	    </Provider>
	)
}

ReactDOM.render(
        <App/>,
        cont   
)

