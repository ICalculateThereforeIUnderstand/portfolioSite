import React from "react";

export function MoveElement1({vel=0, idPointera, idElementa, pomak="n", velPomak="0px", oneWay=false}) {
	// vel je velicina pointera, idPointer je id pointera, idElement je id spojenog pomicnog elementa na pointer,
	// velPomak je velicina pomaka u bilo kojoj jedinici, pomak za n nema, za l, r, u, p imamo left, right, up, down pomak
	// za oneWay true se element pomice u poziciju kada ude u ekran i ne vraca se vise, za false se vraca
	
	const [sw, setSw] = React.useState(false);
	const [top1, setTop1] = React.useState(0);
	const [left1, setLeft1] = React.useState(0);
	const [sw1, setSw1] = React.useState(false);
	
	const r = React.useRef();
	const r1 = React.useRef();
	
	React.useEffect(() => {
		window.addEventListener("scroll", trigger);
		r1.current = document.querySelector("#"+idElementa);
		return () => {window.removeEventListener("scroll", trigger)};
	}, []);
	
	React.useEffect(() => {
		switch (pomak) {
			case ("l"):
			    setLeft1("-"+velPomak);
			    //setLeft2(left1-velPomak);
			    break;
			case ("r"):
			    setLeft1(velPomak);
			    //setLeft2(left1+velPomak);
			    break;
			case ("u"):
			    setTop1("-"+velPomak);
			    //setTop2(top1+velPomak);
			    break;
			case ("d"):
			    setTop1(velPomak);
			    //setTop2(top1-velPomak);
			    break;
			default:
			    break;
		}
		setSw1(true);
		

	}, []);
	
		React.useEffect(() => {
		
		if (sw1) {	
		    if (sw) {
			    r1.current.style.left = "0";
			    r1.current.style.top = "0";
			    if (oneWay)  setSw1(false);
		    } else {
			    r1.current.style.left = left1;
			    r1.current.style.top = top1;
		    }
	    }
		
	}, [sw, sw1]);
	
	
	let sww = sw;
	function trigger() {
		if (!sww && isElementInViewport(r.current)) {
			sww = true;
			setSw(true);
		} else if (sww && !isElementInViewport(r.current)) {
			sww = false;
			setSw(false);
		}
	}
	
	
	let stil = {height: vel+"px", width: vel+"px", backgroundColor: "red", margin: "0px"};
	return (
	    <div ref={r} className="moving-element" id={idPointera} style={stil}>
	    </div>
	)
}


export function MovingElement({vel=0, children, pomak="n", velPomak="0px", top="0px", left="0px"}) {
	// za pomak n nema pomaka, za l, r, u, d imamo from left, right, up, down, top i left daju fiksaciju containera i sidra
	// mozes koristiti sve jedinice. velPomak daje pomak containera u odnosu na sidro dok je sidro van ekrana, koristis sve jedinice
	const [sw, setSw] = React.useState(true);
	const [top1] = React.useState(top);
	const [left1] = React.useState(left);
	const [top2, setTop2] = React.useState(top);
	const [left2, setLeft2] = React.useState(left);
	
	const r = React.useRef();
	const r1 = React.useRef();
	React.useEffect(() => {
		window.addEventListener("scroll", trigger);
		return () => {window.removeEventListener("scroll", trigger)};
	}, []);
	
	React.useEffect(() => {
		switch (pomak) {
			case ("l"):
			    setLeft2("-"+velPomak);
			    //setLeft2(left1-velPomak);
			    break;
			case ("r"):
			    setLeft2(velPomak);
			    //setLeft2(left1+velPomak);
			    break;
			case ("u"):
			    setTop2("-"+velPomak);
			    //setTop2(top1+velPomak);
			    break;
			case ("d"):
			    setTop2(velPomak);
			    //setTop2(top1-velPomak);
			    break;
			default:
			    break;
		}
		
		

	}, []);
	
	React.useEffect(() => {
		if (sw) {
			r1.current.style.left = left1;// + "px";
			r1.current.style.top = top1;// + "px";
		} else {
			r1.current.style.left = left2;// + "px";
			r1.current.style.top = top2;// + "px";
		}
		
	}, [sw]);
	
	
	
	React.useEffect(() => {
		if (isElementInViewport(r.current)) {
			setSw(true);
		} else {
			setSw(false);
		}
	}, []);
	
	let sww = sw;
	function trigger() {
		if (!sww && isElementInViewport(r.current)) {
			sww = true;
			setSw(true);
		} else if (sww && !isElementInViewport(r.current)) {
			sww = false;
			setSw(false);
		}
	}
	
	let stil = {height: vel+"px", width: vel+"px", backgroundColor: "blue"};
	
	return (
	    <div ref={r} className="moving-element" style={stil}>
	        <div ref={r1} className="moving-element-container">{children}</div>
	    </div>
	)
}

function isElementInViewport(el) {
	var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}
