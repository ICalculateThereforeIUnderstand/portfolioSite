import React from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { MoveElement1 } from "./movingElement.js";
import { useSelector } from 'react-redux';

export default function Forma() {
	const jezik = useSelector(state=> state.jezik);
	
	return (
	    <div className="forma" id="forma">
	        <div className="forma-naslov" id="form-el1">{jezik=="en" ? "CONTACT" : "KONTAKT"}</div>
	        <MoveElement1 vel={0} idPointera="pointer1" idElementa="form-el1" pomak="l" velPomak="80vw" oneWay={true}/>
		    <div className="forma-crta" id="form-el2"></div>
		    <MoveElement1 vel={0} idPointera="pointer2" idElementa="form-el2" pomak="r" velPomak="80vw" oneWay={true}/>
		    <div className="forma-pitanje" id="form-el3">{jezik=="en" ? "Have a question or want to work together?" : "Imate li pitanje? Javite mi se."}</div>
		    <MoveElement1 vel={0} idPointera="pointer3" idElementa="form-el3" pomak="l" velPomak="80vw" oneWay={true}/>
		    
		    <MoveElement1 vel={0} idPointera="pointer4" idElementa="form-el4" pomak="d" velPomak="80vw" oneWay={true}/>
		    <form className="forma-el" method="post" id="form-el4" action="http://savicslobodan.com/procesirajEmail/proces_email.php">
		        
		        <input type="text" className="forma-input1" id="Name" name="Name" placeholder={jezik=="en" ? "Name" : "Ime"} required/>
		        <input type="email" className="forma-input1" id="Email" name="Email" placeholder={jezik=="en" ? "Enter email" : "Unesite Ime"} required/>
		        <textarea id="Message" name="Message" className="forma-input2" rows="7" maxlength="3000" placeholder={jezik=="en" ? "Your message" : "Vaša poruka"} required/>
		        <div className="forma-div-button">
		            <button type="submit" id="forma-butto" className="forma-button">{jezik=="en" ? "SUBMIT" : "POŠALJI"}</button>
		        </div>
		    </form>
		    <MoveElement1 vel={0} idPointera="pointer5" idElementa="form-el5" pomak="d" velPomak="80vw" oneWay={true}/>
		    <ScrollButton id="form-el5"/>   
	    </div>
	)
}

function ScrollButton({id=""}) {
	
	function scrolaj() {
		window.scrollTo(0, 0); 
	}
	
	return (
	    <div id={id} className="scrollbutton" onClick={scrolaj}>
	        <MdOutlineDoubleArrow className="scrollbutton-ikon"/>
	    </div>
	)
}
