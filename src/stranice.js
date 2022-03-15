import React from "react";
import "./stranice.css";
import { ImCross } from "react-icons/im";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { useSelector } from 'react-redux';

function useZajednickaLogika(klasa) {  // custom hook, logika koja pripada svakoj stranici
	const jezik = useSelector(state=> state.jezik);
	
	const r = React.useRef();
	const [trenutnaKlasa, setTrenutnaKlasa] = React.useState(klasa);
	
	React.useEffect(()=>{
		r.current.style.height = "100%";
		r.current.style.width = "100%";
		r.current.style.position = "absolute";
		r.current.style.left = "0";
		r.current.style.top = "0";
		r.current.style.transition = "opacity 0.7s, transform 0.7s";
	}, []);
	React.useEffect(()=>{
		r.current.classList.remove(trenutnaKlasa);
		r.current.classList.add(klasa);
		setTrenutnaKlasa(klasa);
	}, [klasa, trenutnaKlasa]);

	return [r, jezik, trenutnaKlasa];  // ovu trenutnaKlasa koristimo samo u Page22
}

function useHoverLogika() {   // custom hook za hover element
	const r = React.useRef();
	const [hoverSw, setHoverSw] = React.useState(false);
	const hoverCapabilitySw = useSelector(state=> state.hoverSw);
	
	React.useEffect(()=>{

		if (hoverCapabilitySw) {
		    r.current.addEventListener("mouseenter", hoveraj);
            r.current.addEventListener("mouseleave", odhoveraj);
            r.current.addEventListener("mousedown", odhoveraj);
            r.current.addEventListener("mouseup", hoveraj);
		} else {  // slucaj mobilnog uredaja bez hover sposobnosti
			r.current.addEventListener("click", klik);			
		}
        
        return ()=> {
			if (hoverCapabilitySw) {
			    r.current.removeEventListener("mouseenter", hoveraj);
                r.current.removeEventListener("mouseleave", odhoveraj);
                r.current.removeEventListener("mousedown", odhoveraj);
                r.current.removeEventListener("mouseup", hoveraj);
            } else {
				r.current.removeEventListener("click", klik);
			}
		};
	}, []);
	
	React.useEffect(()=> {
		if (hoverSw) {
			hoveraj();
		} else {
			odhoveraj();
		}
	}, [hoverSw]);
	
	const klik = () => {
		setHoverSw((hovers)=>{return !hovers});
		console.log("kliknuo si na plast u zajednickoj logici, switchamo hover status..." + Math.random());
	}
	
	function hoveraj() {
        r.current.style.opacity = "0.8";
    }
    
    function odhoveraj() {
        r.current.style.opacity = "0";
    }
	
	return [r, hoverCapabilitySw];  // hoverCapabilitySw koristi samo page22
}

export function DefaultStranica({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	
	return (
	    <div className="default-page" ref={r}>
	        <p>Default Stranica...</p>
	    </div>
	)
}

export function PrvaStranica({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();  // postavi ovaj hook na hover element
	
	return (
	    <div className="prvi-page" ref={r}>
	        {lang == "hr" ?  <>
	            <img src="./slike/demetra.jpg" alt="pocetna stranica" className="prvi-page-slika"/>
	            <div className="prvi-page-el" ref={hoverRef}>
	                <p className="prvi-page-el-naslov">Main page</p>
	                <p className="prvi-page-el-tekst">Na slici je glavna stranica web-sitea. Kao što vidite, moguće je pretraživati knjige po bibliotekama, autoru, naslovu i godini (po riječima ili substringovima). Stranica potom pokazuje knjige koje zadovoljavaju kriterije zajedno sa osnovnim podacima. Moguće je kliknuti na knjigu za dodatne podatke. Vlasnik stranice može dodavati/oduzimati knjige, te mijenjati njihove podatke. Na taj način nije potrebno nikakvo održavanje sitea/ažuriranje podataka itd. Cilj je bio napraviti stranicu koju informatici nevješt vlasnik može sam održavati neograničeno bez vanjske pomoći.</p>
	            </div>
	         </> : <>
	            <img src="./slike/demetra.jpg" alt="pocetna stranica" className="prvi-page-slika"/>
	            <div className="prvi-page-el" ref={hoverRef}>
	                <p className="prvi-page-el-naslov">Main page</p>
	                <p className="prvi-page-el-tekst">Picture shows main page of web site. As you can see, it is possible to search books by authors, title, year and type of books (by key words or even substrings). The page then shows books satisfying inputed criteria together with basic information. It is possible to click on book for more info. Owner of site can add or remove books and change their data. That way any professional maintenance of site is not necessary. The goal was to create web-site that can be maintained indefinitely by unskilled user.</p>
	            </div>
	         </>
		     }
	    </div>
	)
}

export function DrugaStranica({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	
	return (
	    <div className="drugi-page" ref={r}>
	        <img src="./slike/demetraa1.jpg" alt="info stranica o knjizi" className="drugi-page-slika"/>
	        <div className="drugi-page-el-tekst">
	            {lang == "hr" ?
	                <p>Ovo je stranica koja se otvori kada korisnik klikne na odabranu knjigu. Uz sliku knjige, pokažu se informacije o knjizi u bazi podataka.</p>
	            :
	                <p>This page opens when visitor clicks on some book. It shows picture of the book and its all public info from database.</p>
			    }    
	        </div>
	    </div>
	)
}

export function TrecaStranica({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika(); 
	
	const r1 = React.useRef();
	
	React.useEffect(()=>{
		if (false) {
			r1.current.style.display = "none";
			
		}
	}, [])
	
	return (
	    <div className="treci-page" ref={r}>
	        <img src="./slike/manager.jpg" alt="manager" className="treci-page-slika"/>
	        <div className="treci-page-el" ref={hoverRef}>
	            {lang == "hr" ? <>
	                <p className="treci-page-el-naslov">Manager</p>
	                <p className="treci-page1-el-tekst">Pristup manageru baze podataka moguć je preko privatne šifrirane stranice. Moguće je u gornjem izborniku odabrati između tri panela. U panelu "knjige" (na slici) moguće je dodavati/oduzimati knjige, mijenjati im podatke, pretraživati knjige. Svakoj knjizi pridružen je jedan ili više autora, ostali podaci, te jedna ili više adresa u jednom ili više skladišta knjiga plus kvantitet knjiga po adresama skladišta. Bazu podataka sam zamislio tako da se ne koristi samo za web-stranicu, vec kao i alat za evidenciju skladišta. Moguće je vidjeti količine knjiga na raspolaganju i skladišta/adrese na kojima se nalaze. <span ref={r1}>LOZINKA za pristup manageru je filozof2378</span></p>
	                <a href="http://www.savicslobodan.com/demetra/login.php" className="treci-page-el-link">VIEW SITE</a>
	            </> : <>  
	                <p className="treci-page-el-naslov">Manager</p>
	                <p className="treci-page1-el-tekst">Access to database manager is possible through private web page using password. In upper left menu user can choose between three manager panels. In panel "knjige" (books) shown in picture, it is possible to add/remove books, change their data and search for books in database. Each book is joined by one or more authors, other individual info and one or more addresses in one or more warehouses plus quantity in each address. Database was designed not only for web-site but also for managing warehouses. In this panel it is also possible to see quantities for each book and addresses/warehouses where these quantites are stored. <span ref={r1}>PASSWORD for access to manager is filozof2378</span></p>
	                <a href="http://www.savicslobodan.com/demetra/login.php" className="treci-page-el-link">VIEW SITE</a>
	            </> 
			    }     
	        </div>
	    </div>
	)
}

export function CetvrtaStranica({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika(); 
	
	return (
	    <div className="treci-page page-scroll" ref={r}>
	        <img src="./slike/manager1.jpg" alt="manager1" className="treci-page-slika"/>
	        <div className="treci-page-el" ref={hoverRef}>
	            {lang == "hr" ? <>
	                <p className="treci-page-el-naslov">Skladišta/adrese</p>
	                <p className="treci-page-el-tekst">U ovom panelu moguće je upravljati skladištima i adresama. Svako skladište ima jednu ili više adresa koje označavaju policu/poziciju u skladištu. Na adresama se nalaze određene količine pojedinih knjiga. Tako na slici vidimo da skladište Zeleni trg 28 ima više od 5 adresa. Moguće je dodavati/uklanjati nova skladišta i nove adrese u njima. Skladište nije moguće ukloniti dok niste uklonili adrese u njemu, a adresu nije moguće ukloniti ako se na njoj nalazi barem jedna knjiga. Ako želite ukloniti knjigu sa adrese, potrebno je otići na panel Artikli i tamo je izbrisati. Na taj način manager osigurava konzistentnost baze podataka (ne želimo situaciju da je knjiga izbrisana a ostane u skladištu, ni situaciju da smo izbrisali skladište, a knjige u njemu su ostale).</p>
	            </> : <> 
	                <p className="treci-page-el-naslov">Warehouses/addresses</p>
	                <p className="treci-page-el-tekst1">On this panel it is possible to manage warehouses and their addresses. Each warehouse has one or more addresses telling us position in it. On each address some quantities of books can be assigned. So for example, on the picture we see that warehouse called "Zeleni trg 28" has more then 5 addresses. User can add/remove warehouses and addresses in them. For a reason of protecting consistency of database, it is not possible to remove a warehouse before addresses in it are not themselves removed, and address can not be removed if it contains books. If it is some book to be removed from the address, it is necessary first to go to panel "Articles" and there it can be erased. That way manager keeps database consistent and without errors (we dont want situation where erased book is still in warehouse, nor situation where warehouse or address is erased but books on that position remain in database).</p>
	            </>    
			    }    
	        </div>
	    </div>
	)
}

export function PetiPage({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika(); 
	
	return (
	    <div className="treci-page" ref={r}>
	        <img src="./slike/manager2.jpg" alt="manager2" className="treci-page-slika"/>
	        <div className="treci-page-el" ref={hoverRef}>
	            {lang == "hr" ? <>
	                <p className="treci-page-el-naslov">Artikli</p>
	                <p className="treci-page-el-tekst">U panelu Artikli moguć je pregled knjiga/količina po adresama, i mijenjanje količina knjiga. Tako na ovoj slici vidimo da se u skladištu Zeleni trg 94 na adresi 4a nalazi knjiga Radosna Znanost, i to 84 komada. Klikom na donji pop-up menu moguće je vidjeti popis adresa sa količinama. Ovaj program može se prilagoditi i za slučaj da imate fizičku knjižaru sa skladištima, tada možete voditi i evidenciju knjiga u knjižari tako da npr. svaki ormar/odjeljenje u knjižari je evidentirano u kategoriji skladište, a polica u ormaru/odjeljenju je evidentirana adresom (npr. dvije knjige na odjeljenju povijesti, na toj i toj polici).</p>
	                <div className="peti-page-el1">
	                    <a href="http://www.savicslobodan.com/download/baza.zip" className="peti-page-el1-link">DOWNLOAD DATABASE</a>
	                    <a href="http://www.savicslobodan.com/download/demetra.zip" className="peti-page-el1-link">DOWNLOAD SOURCE SITEA</a>
	                </div>
	            </> : <>
	                <p className="treci-page-el-naslov">Articles</p>
	                <p className="treci-page-el-tekst1">In this panel "Articles" it is possible to review books and their quantities by addresses, and quantities can be modified. So for example, we see in the picture that in warehouse Zeleni trg 94 on address 4a there are 84 copies of book titled "Radosna Znanost". Clicking on lower pop-up menu in front of book picture it is possible to see all adresses where this book can be found. Whole manager was written to offer practical and simple UI. I myself tested it by going through warehouses, marking their addresses and going book's package by package, counting books and inputing counts into manager. That was all done often in dark conditions using mobile phone's light while on a ladder, so manager had to be intuitive, practical and efficient so to consume as little clicks/inputs/user interactions per book as possible. </p>
	                <div className="peti-page-el1">
	                    <a href="http://www.savicslobodan.com/download/baza.zip" className="peti-page-el1-link">DOWNLOAD DATABASE</a>
	                    <a href="http://www.savicslobodan.com/download/demetra.zip" className="peti-page-el1-link">DOWNLOAD SITE SOURCE</a>
	                </div>
	            </>
			    }        
	        </div>
	    </div>
	)
}

export function SestiPage({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	
	return (
	    <div className="prvi-page" ref={r}>
	        <img src="./slike/tetris.jpg" alt="slika tetrisa" className="prvi-page-slika"/>
	        <div className="prozirni-plast">
	        </div>
	        <div className="sesti-page-el">
	            <a href="https://github.com/ICalculateThereforeIUnderstand/react_tetris" className="peti-page-el1-link sesti-page-dodatno">GitHub</a>
	        </div>
	    </div>
	)
}

export function SedmiPage({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	
	return (
	    <div className="sedmi-page" ref={r}>
	        <img src="./slike/reactSnake.jpg" alt="snake igra" className="sedmi-page-slika"/>
	        <div className="prozirni-plast">
	        </div>
            <a href="https://github.com/ICalculateThereforeIUnderstand/React-Snake" className="peti-page-el1-link sedmi-page-dodatno">GitHub</a>
	    </div>
	)
}

export function OsmiPage({klasa="", jezik="en"}) {
	const [hoverRef] = useHoverLogika();  
	const [r, lang] = useZajednickaLogika(klasa, jezik);
		
	return (
	    <div className="osmi-page" ref={r}>
	        <img src="./slike/sofra.jpg" alt="pocetna stranica" className="prvi-page-slika"/>
	        <div className="prvi-page-el" ref={hoverRef}>
	            {lang == "hr" ?  <>
	                <p className="osmi-page-el-naslov">Restoran Sofra</p>
	                <p className="prvi-page-el-tekst">Cijeli internet site je replika pravog Sofrinog sitea. Grafičke elemente sa originala sam skidao jednostavnim downloadanjem slika. Tamo gdje to nije bilo moguće, koristio sam screenshotove pa sam ih u GIMP-u obrađivao, a gdje je i ta opcija bila nepraktična, koristio sam druge slike iz njihovih galerija restorana (koje su prilično opširne).</p>
	                <a href="http://www.restoransofra.com" className="osmi-page-el1-link">Originalna<br/>Sofra</a>  
	             </> : <>
	                <p className="osmi-page-el-naslov">Restaurant Sofra</p>
	                <p className="prvi-page-el-tekst">This entire site is replica of original Sofra's site. I got graphical elements from original by simple download. Where it was not possible, I used screenshots which were later processed in GIMP, and where even that option was not practical, I have used other pictures from Sofra' restaurant galleries.</p>
	                <a href="http://www.restoransofra.com" className="osmi-page-el1-link">Original<br/>Sofra</a>  
	             </>  
	            }
	            
	        </div>
	    </div>
	)
}

export function DevetiPage({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();  
	
	return (
	    <div className="deveti-page" ref={r}>
	        <img src="./slike/sofra1.jpg" alt="pocetna stranica" className="deveti-page-slika"/>
	        <div className="prvi-page-el" ref={hoverRef}>
	            {lang === "hr" ? <>
	                <p className="deveti-page-el-tekst">Vodio sam računa i o responsive designu, tako da site izgleda lijepo i na mobitelima. Na slici je  paralaks efekt - gornji natpis i galerija restorana se pomiču nad slikom posude sa jelom (vjerujem da se radi o Bosanskom loncu, ako idete u Sofru to je moja preporuka).</p>
	             </> :
	                <p className="deveti-page-el-tekst">I have taken care of responsive design, so that site also looks great on mobile phones. In picture is shown parallax effect  -  upper text panel and pic galleries are moving over picture of meal (believe it is Bosnian dish, if you ever go to Sofra this is my recommodation). </p>
		        }
	        </div>
	    </div>
	)
}

export function DesetiPage({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();
	
	return (
	    <div className="deveti-page" ref={r}>
	        <img src="./slike/sofra2a.jpg" alt="pocetna stranica" className="deseti-page-slika"/>
	        <div className="prvi-page-el" ref={hoverRef}>
	          {lang === "hr" ? 
	            <p className="deveti-page-el-tekst">Gledajući ove fotografije upravo sam ogladnio. Čini se da mi je propala dijeta danas!</p>
	            :
	            <p className="deveti-page-el-tekst">Watching this pictures i I've got hungry. Not good for my diet.</p>
	          }
	        </div>
	    </div>
	)
}

export function Page11({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	
	return (
	    <div className="sedmi-page" ref={r}>
	        <img src="./slike/sofra3a.jpg" alt="pocetna stranica" className="page11-slika"/>
	        <div className="prozirni-plast">
	        </div>
	    </div>
	)
}

export function Page12({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();
	
	return (
	    <div className="sedmi-page" ref={r}>
	        <img src="./slike/breakout.jpg" alt="pocetna stranica" className="page12-slika"/>
	        <div className="page12-el" ref={hoverRef}>
	            {lang === "hr" ?
	                <p className="deveti-page-el-tekst">Kao što možete vidjeti na slici, na početnom meniju možemo odabrati koji level želimo igrati. Leveli su poredani po težini. Za prolazak levela potrebno je korištenjem reketa pogoditi i poništiti sve cigle na ekranu. Život se gubi kada loptica pobjegne reketu i ode kroz donji brid ekrana. Moguće je kod pogotka cigle dobiti bonus, koji je u padajućem obliku i potrebno ga je pokupiti reketom.</p>
	                :
	                <p className="deveti-page-el-tekst">As you can see in the picture, in start menu player chooses which level he wants to start in. Levels are ranked by game difficulty. To pass level, using the paddle it is necessary to hit and destroy each brick on screen. Player looses life if ball escapes the paddle and flies through bottom edge of the screen. With each hit of a brick it is possible to get falling bonus. Player can pick it up by moving his paddle and touching it.</p>
				}
	        </div>
	    </div>
	)
}

export function Page13({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	
	return (
	    <div className="sedmi-page" ref={r}>
	        <img src="./slike/breakout1.jpg" alt="pocetna stranica" className="page12-slika"/>
	        <div className="prozirni-plast">
	        </div>
	    </div>
	)
}

export function Page14({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();
	
	return (
	    <div className="sedmi-page" ref={r}>
	        <img src="./slike/breakout2.jpg" alt="pocetna stranica" className="page12-slika"/>
	        <div className="page12-el" ref={hoverRef}>
	            {lang === "hr" ? <>
	                <p className="deveti-page-el-tekst deveti-page-el-tekst-dodatno">Na slici vidimo odvijanje igre u zadnjem nivou. Sive pregrade su "ogledala" od kojih se loptica odbija i koja se ne mogu poništiti. Pomoću njih se mogu dizajnirati različiti leveli sa zanimljivim dinamikama igre. Vidimo i dva padajuća bonusa - kutija prve pomoći daje extra život, a kutija sa ljepilom daje sticky loptu koja prilikom dodira sa reketom se zalijepi za reket. Također igrač je pokupio bonus duple lopte i zato vidimo dvije lopte na ekranu. Postoje jos dva bonusa - slow ball koja usporuje lopticu i power ball, koji daje prodornu lopticu koja kosi sve pred sobom i ne odbija se od cigli.</p>
	                <a href="https://github.com/ICalculateThereforeIUnderstand/breakout" className="peti-page-el1-link page14-dodatno">GitHub</a>
	            </> : <>
	                <p className="deveti-page-el-tekst deveti-page-el-tekst-dodatno">In picture we see typical level-8 game unfolding. Grey barriers are indestructible "mirrors" which bounce the ball. By using them it is possible to design levels with more interesting dynamics of gameplay. We can see two falling bonuses - first aid box gives extra life and glue box gives sticky ball which when touches the paddle, sticks on it. Player have already picked up double-ball bonus and that is why we see two balls. There are two more bonuses - slow-ball (hmm, forgot what this one does) and power-ball which makes the ball piercing - it does not bounce from bricks, it flies through them so it can destroy many of them without bouncing.</p>
	                <a href="https://github.com/ICalculateThereforeIUnderstand/breakout" className="peti-page-el1-link page14-dodatno">GitHub</a>
	            </>}
	        </div>
	    </div>
	)
}

export function Page15({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();
	
	return (
	    <div className="sedmi-page page15-dodatno" ref={r}>
	        <img src="./slike/memory.jpg" alt="pocetna stranica" className="page12-slika"/>
	        <div className="page12-el" ref={hoverRef}>
	            {lang === "hr" ? 
	                <p className="deveti-page-el-tekst">Prva i moja omiljena igrica je sa karticama. Na početku odaberete sa koliko kartica želite igrati (od 12 do 36). Zatim u svakom potezu otvarate po dvije kartice. Kada otvorite dvije iste, one se uklanjaju sa ekrana. Cilj je otvoriti sve kartice u što manje poteza. U gornjem desnom indikatoru je prikazan očekivani score igrača sa fotografskom memorijom. Te procjene sam dobio Monte Carlo simulacijom.</p>
	                :
	                <p className="deveti-page-el-tekst">The Concentration is my favorite memory game. In the beginning you choose starting number of cards (12 to 36). Then game begins. Each turn you open two cards. When you open two of a same picture, they are removed from screen. The goal is to remove all cards in as little turns as possible. In upper right corner there is indicator showing expected number of turns for player with photographic memory. These estimates were obtained by Monte Carlo simulations.</p>
				}
	        </div>
	    </div>
	)
}

export function Page16({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();
	
	return (
	    <div className="sedmi-page" ref={r}>
	        <img src="./slike/memory1.jpg" alt="pocetna stranica" className="page12-slika"/>
	        <div className="page12-el" ref={hoverRef}>
	            {lang === "hr" ? <>
	                <p className="deveti-page-el-tekst">Ovo je klasični test kratkoročne vizualne memorije. Na početku svakog levela se otvori cijela ploča i igrač mora memorirati bijela polja. Zaim se ploča zatvori i igrač mora otvoriti ispravna polja. U svakom pokušaju imate pravo na tri pogreške, nakon kojih gubite život. U slučaju pogodaka svih bijelih polja igra se nastavlja na sljedećem levelu. </p>
	                <a href="https://savicslobodan.com/memory1/" className="peti-page-el1-link page14-dodatno">Link</a>
	            </> : <>
	                <p className="deveti-page-el-tekst">This one is short-term visual memory. In the beginning of each level correct white squares are shown for limited time period and player must try to memorize them. Then these squares are hidden and it is up to the player to select all of them. In each level, player has up to 3 misses after which he loses life. In case of all correct squares selected, game continues on higher level.</p>
	                <a href="https://savicslobodan.com/memory1/" className="peti-page-el1-link page14-dodatno">Link</a>
	            </>}
	        </div>
	    </div>
	)
}

export function Page17({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();
	
	return (
	    <div className="page17" ref={r}>
	        <img src="./slike/chimpTest.jpg" alt="pocetna stranica" className="page12-slika"/>
	        <div className="page12-el" ref={hoverRef}>
	            {lang === "hr" ? <>
	                <p className="deveti-page-el-tekst deveti-page-el-tekst-dodatno">Ova igrica je remake čuvenog chimp testa u kojem čimpanze nadmašuju ljude. Potrebno je zapamtiti redoslijed brojeva i onda kada se brojevi uklone sa ekrana, pogoditi pravi redoslijed. Svaki sljedeći level nadodaje extra polje. Razlika od originalnog testa je ta što ovdje imate neograničeno vrijeme za promatranje rasporeda polja, a brojevi se uklone kada prvi put kliknete na neko polje. U originalnim testovima ste imali ograničeno vrijeme promatranja (reda 500msec). Ova modifikacija omogućuje primjenu memoizacijskih tehnika kojima možete postići mnogo bolje rezultate i spasiti čast čovječanstva!</p>
	                <a href="https://savicslobodan.com/chimp_test/" className="peti-page-el1-link page14-dodatno">Link</a>
	            </> : <>
	                <p className="deveti-page-el-tekst deveti-page-el-tekst-dodatno">This one is remake of The Chimp Test where chimpanzees outperform men. Player must memorize layout of numbered squares and when numbers are removed, he has to select squares in right order. Each next level adds one extra square. Difference from original test is that here player has unlimited time for observation and numbers are removed only when player clicks on first square. In original test there was typically about 500msec for observation. This modifications enables application of memoization techniques so much better results are possible, and possibly the honor of mankind can be saved!</p>
	                <a href="https://savicslobodan.com/chimp_test/" className="peti-page-el1-link page14-dodatno">Link</a>
	            </>}
	        </div>
	    </div>
	)
}

export function Page19({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();
	
	return (
	    <div className="page19" ref={r}>
	        <img src="./slike/pang1.jpg" alt="pocetna stranica" className="page12-slika"/>
	        <div className="page12-el" ref={hoverRef}>
	            {lang === "hr" ? <>
	                <p className="page12-el-tekst page19-el-tekst-dodatno">Moja želja je bila napraviti igricu koja neće biti obična kopija originala. Zato sam odlučio kroatizirati igricu - igrač nosi hrvatski dres, u pozadini su fotografije iz hrvatskih gradova, a u budućnosti kada napravim no-panic tour mode, igrač će letjeti avionom po karti Hrvatske od jednog hrvatskog grada do drugog. Igricu sam nazvao CroPang.</p>
	                <a href="https://github.com/ICalculateThereforeIUnderstand/html_pang" className="peti-page-el1-link page14-dodatno">GitHub</a>
	            </> : <>
	                <p className="page12-el-tekst page19-el-tekst-dodatno">My desire was to create game which would not be plain copy of original, so I decided to croatize the game - player wears dress of croatian national soccer team (red-white squares), background images are from croatian cities, and in future when I create no-panic "tour mode", player will fly across map of Croatia from one croatian city to another. That is why I named this game CroPang.</p>
	                <a href="https://github.com/ICalculateThereforeIUnderstand/html_pang" className="peti-page-el1-link page14-dodatno">GitHub</a>
	            </>}
	        </div>
	    </div>
	)
}

export function Page22({klasa="", jezik="en"}) {
	const [r, lang, trenutnaKlasa] = useZajednickaLogika(klasa, jezik);
	
	React.useEffect(()=>{
		r3.current.addEventListener("click", toggle);
		
		return ()=>{r3.current.removeEventListener("click", toggle)};
	}, []);
	
	const [hoverRef, hoverCapabilitySw] = useHoverLogika();
	const r1 = React.useRef();
	const r2 = React.useRef();
	const r3 = React.useRef();
	
	const [sw, setSw] = React.useState(true);
	
	
	React.useEffect(()=>{
        r1.current.addEventListener("click", fun);
        r.current.addEventListener("mouseleave", fun1);
        
        //if (hoverCapability("hoverTest")) {
		if (hoverCapabilitySw) {
			r3.current.style.display = "none";
		} else {
			r1.current.style.display = "none";
		}
        
		
		return () => {
			r1.current.removeEventListener("click", fun);
			r.current.removeEventListener("click", fun1);
		};
	}, []);
	
	React.useEffect(()=>{
		if (trenutnaKlasa === "modal-slide-trenutni") {
			r2.current.play();
		} else {
			r2.current.pause();
		}
	}, [trenutnaKlasa]);
	
	React.useEffect(()=>{
		if (sw) {
		    hoverRef.current.style.top = "0%";	
		} else {
			hoverRef.current.style.top = "90%";
		}
	}, [sw]);
		
	function fun() {
		hoverRef.current.style.display = "none";
		console.log("kliknuo si na plast, zatvaramo ga..." + Math.random());
	}
	
	function fun1() {
		hoverRef.current.style.display = "flex";
		console.log("kliknuo si na plast, OTVARAMO ga..." + Math.random());
	}
	
	function toggle(e) {
		e.stopPropagation();
		setSw((prevSw)=> !prevSw);
		console.log("kliknuo si na krizic..." + Math.random());
	}
		
	return (
	    <div className="page22" ref={r}>
	        <video className="page22-video" autoPlay controls loop muted ref={r2}>
	            <source src="./slike/movie.mp4" type="video/mp4"/>
	        </video>
	        <div className="page22-el" ref={hoverRef}>
	          
	            {lang === "hr" ? 
                    <p className="page12-el-tekst page22-el-tekst-dodatno">Prvi i osnovni trik ovog videa je vrtnja animacije u vremenski suprotnom smjeru, i na taj način se stvara iluzija prelaska iz nereda u red. U početnom frameu postavimo konačni postav slova, i zatim u svakom sljedećem pomičemo slova po random putanjama. Na kraju obrnemo redosljed frameova (prvi postane posljednji, drugi pretposljednji, itd) i dobijemo prelazak slova iz random smjese u lijepi naslov! Da bismo pomicali slova, za svako je potrebno definirati putanju. Ja sam to implementirao nizom koordinata koje se sastoje od x, y kord., zatim vremenske koord. u obliku postotka izvršenja animacije (0 do 100, 0 je početak), te fi koordinate rotacije. Animacija pomoću requestAnimationFrame-a u svakom frameu proračunava koordinatu svakog elementa, i izcrtava ih na ekranu.</p>
                :   <p className="page12-el-tekst page22-el-tekst-dodatno">The main trick in this video is backward running animation which gives illusion of change from disorder to order. In first frame you put final layout of letters, and then with each later frame, you move letters along their random trajectories further and further. At the end, you have to reverse all frames (first becomes last) and voila - you got yourself an animation of random mess turning to ordered text! To move letters across the screen, we have to define their trajectories. I have done that by assigning each letter an array of coordinates. Each element of array consists of x, y and angle of rotation coord. plus time coord. in form of percentage of finished animation (0 to 100). The animation in each frame, using requestAnimationFrame, calculates coordinates of each element, and then it draws them on the screen. </p>
			    } 
			    <div className="page22-gumb" ref={r1}>{lang==="hr" ? "VRATI VIDEO" : "SHOW VIDEO"}</div>
			  
			    <div className="page22-el-button" ref={r3}>
			         {sw ? <ImCross className="page22-el-button-ikona"/> :  <BsArrowUpSquareFill className="page22-el-button-ikona1"/> }
                </div>
	        </div>
	    </div>
	)
}

export function Page23({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();
	
	return (
	    <div className="page22" ref={r}>
            <img src="./slike/efekti1.jpg" alt="radni display" className="page24-slika"/>
	        <div className="page12-el" ref={hoverRef}>
	            {lang === "hr" ? 
                    <p className="page12-el-tekst page23-el-tekst-dodatno">Na slici je prikazan trenutak jednostavne animacije. Križici su pomočni alat kojim označavamo animation točke. Svaka putanja pojedinog slova se sastoji od više točaka (tipično 4-8 je dovoljno). Primijenio sam dvije tehnike proračuna međutočaka između zadanih točaka - jednostavna linearna interpolacija, te kompliciraniji hermit spline 3. reda. Ovaj zadnji je zapravo tzv. bezier krivulja, samo u drugoj matematičkoj parametrizaciji. Prednost spline-a je što omogućuje glatke kontinuirane krivulje, dok kod linearne interpolacije imamo nagle skokovite neprirodne promjene smjera u animation točkama (vidljivo okom i vrlo ružno). Za ambicioznije projekte ručno postavljanje putanja svakog elementa na ekranu se pokazalo vrlo naporno i nepraktično - potrebno je puno vremena, a također nije kompatibilno sa responsive designom, putanje ne izgledaju dobro na ekranima različitih dimenzija. Zato sam napisao klasne metode koje same proizvode random krivulje.</p>
                :   <p className="page12-el-tekst page23-el-tekst-dodatno">The picture shows a moment in a simple animation. Little crosses are put on screen by helper tool which enables us to mark animation points. Trajectory of each letter consists of couple of such points (typically 4-8 is adequate). I have implemented two techniques of calculating middlepoints between two defined animation points - simple linear interpolation and cubic Hermite spline. The last one is same as more familiar Bezier curve, but it is in different mathematical format. Advantage of cubic spline is that it enables smooth and continuous curves while with linear interpolation we experience sudden and abrupt changes of direction at animation points (visible by eye and looking ugly). In more ambitious projects, setting up trajectories of each element by hand has turned out tiring and impractical chore which takes lot of time and is not compatible with responsive design, difficult to design trajectory looking good on all screens. That's why I have written class methods which create their own random trajectories.</p>
			    }    
	        </div>
	    </div>
	)
}

export function Page24({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();
	
	return (
	    <div className="page24" ref={r}>
            <img src="./slike/minesweeper2.jpg" alt="radni display" className="page24-slika"/>
            <div className="page12-el" ref={hoverRef}>
	            {lang === "hr" ? <>
	                <p className="page12-el-tekst page19-el-tekst-dodatno">Kod ovog projekta možete pogledati na sljedećem linku:</p>
	                <a href="https://github.com/ICalculateThereforeIUnderstand/react_minesweeper" className="peti-page-el1-link page14-dodatno">GitHub</a>
	            </> : <>
	                <p className="page12-el-tekst page19-el-tekst-dodatno">You can see the source code of this project at:</p>
	                <a href="https://github.com/ICalculateThereforeIUnderstand/react_minesweeper" className="peti-page-el1-link page14-dodatno">GitHub</a>
	            </>}
	        </div>
	    </div>
	)
}

export function Page25({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();
	
	return (
	    <div className="page25" ref={r}>
            <div className="page12-el" ref={hoverRef}>
	            {lang === "hr" ? <>
	                <p className="page12-el-tekst page19-el-tekst-dodatno">Kod ovog projekta možete pogledati na sljedećem linku:</p>
	                <a href="https://github.com/ICalculateThereforeIUnderstand/portfolioSite" className="peti-page-el1-link page14-dodatno">GitHub</a>
	            </> : <>
	                <p className="page12-el-tekst page19-el-tekst-dodatno">You can see the source code of this project at:</p>
	                <a href="https://github.com/ICalculateThereforeIUnderstand/portfolioSite" className="peti-page-el1-link page14-dodatno">GitHub</a>
	            </>}
	        </div>
	    </div>
	)
}

export function Page26({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();
	
	return (
	    <div className="page26" ref={r}>
	        <img src="./slike/sofrab1.jpg" alt="radni display" className="page26-slika"/>
            <div className="page12-el" ref={hoverRef}>
	            {lang === "hr" ? <>
	                <p className="page12-el-tekst page19-el-tekst-dodatno">Napravio sam potpuno novi site korištenjem grafičkih elemenata od prijašnjeg projekta u Wordpressu - na taj način sam uštedio vrijeme na traženju fotografija/grafičkih elemenata po internetu i mogao sam se koncentrirati na čisto html/javascript/bootstrap programiranje. Na slici je primjer efekta paralakse - središnji horizontalni interaktivni poredak slika (klikom se otvara modal veće verzije slike) se skrolanjem pomiče preko pozadine dvije fotografije jela. I same pozadine se kontinuirano skrolanjem polagano pomiču prema gore, što sam postignuo pisanjem vlastitog paralaks librarija u JavaScriptu.</p>
	                <a href="https://savicslobodan.com/sofra1/" className="peti-page-el1-link page27-dodatno">site</a>
	            </> : <>
	                <p className="page12-el-tekst page19-el-tekst-dodatno">In this project, I have created completely new web site using graphical pictures/elements from previous project in Wordpress - that way I have made considerable time savings on all non-programming boring chores necessary in web design (like searching for pictures on internet, editing them, etc), and could concentrate on pure html/ Javascript/ Bootstrap coding. In this picture you can see example of parallax effect - main horizontal grid of clickable pictures (when clicked on, modal of bigger version of pic opens) moves over two big background pictures of meals, which themselves move slowly upward while user is scrolling the page. This slow move is produced in Javascript. </p>
	                <a href="https://savicslobodan.com/sofra1/" className="peti-page-el1-link page27-dodatno">site</a>
	            </>}
	        </div>
	    </div>
	)
}

export function Page27({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();
	
	return (
	    <div className="page26" ref={r}>
	        <img src="./slike/sofrab5.jpg" alt="radni display" className="page26-slika"/>
            <div className="page12-el" ref={hoverRef}>
	            {lang === "hr" ? <>
	                <p className="page12-el-tekst page19-el-tekst-dodatno">Na slici je primjer modala koji se otvori klikom na interaktivne slike. Navbar, modal, carousel i ostale elemente sam koristio iz Bootstrapa. Navbar sam posebno prilagodio, tako da bude sticky - da ostaje na vrhu ekrana (u tom slučaju se promjeni iz tamnog prozirnog u manji bijeli navbar). Stranice su pravljene po najmodernijoj praksi responsive+mobile first dizajna. Uglavnom sam se trudio sve raditi u bootstrapu, međutim praksa je pokazala da dijelove stranica sa paralaks efektima je ipak bolje raditi u čistom html + css + JavaScriptu. Potrudio sam se da moja replika bude bolja/funkcionalnija od originalnog web sitea (pogotovo na resize transformacije). Cijeli kod možete pogledati na sljedećem linku:</p>
	                <a href="https://github.com/ICalculateThereforeIUnderstand/RestoranWebSite" className="peti-page-el1-link page27-dodatno">Github</a>
	            </> : <>
	                <p className="page12-el-tekst page19-el-tekst-dodatno">In picture you can see example of modal which opens when user clicks on one of interactive pictures on web page. Navbar, modal, carousel and other elements are applied from Bootstrap. Navbar is customized to be sticky - it stays on top of window and changes color to white and becomes smaller, while at beginning is dark transparent and bigger. Internet pages are made using best and modern practices of responsive + mobile first design. I have tried to do most work in pure bootstrap, but it turned out that some parts with parallax scrolling effects are best to be made in pure html / css / javascript. I tried my best to make replica better/ more functional than original web site (especially to resize transformations). The code of this project you can find here:</p>
	                <a href="https://github.com/ICalculateThereforeIUnderstand/RestoranWebSite" className="peti-page-el1-link page27-dodatno">Github</a>
	            </>}
	        </div>
	    </div>
	)
}

export function Page28({klasa="", jezik="en"}) {
	const [r, lang] = useZajednickaLogika(klasa, jezik);
	const [hoverRef] = useHoverLogika();
	
	return (
	    <div className="page26" ref={r}>
	        <img src="./slike/bezier.jpg" alt="radni display" className="page26-slika"/>
            <div className="page12-el" ref={hoverRef}>
	            {lang === "hr" ? <>
	                <p className="page12-el-tekst page19-el-tekst-dodatno">Za ovaj projekt sam napisao vlastiti library za glatko i podesivo skrolanje. On je iskorišten za skrol-gumb u donjem desnom kutu koji služi za povratak na početak stranice. Pomoću ovog librarija web programer može podešavati brzinu skrola, a također korištenjem bezier krivulja i oblik gibanja skrola. Na sljedećem linku možete vidjeti demonstracijski site sa detaljnijim opisom librarija:</p>
	                <a href="https://savicslobodan.com/smoothScroll" className="peti-page-el1-link page27-dodatno">Site</a>
	            </> : <>
	                <p className="page12-el-tekst page19-el-tekst-dodatno">For this project I have written my own lightweight library for smooth and customizable scrolling. It is used for scroll button in right bottom corner which returns user to beginning of internet page. Using this library, web developer can customize speed and pattern of scroll, using bezier curves. In following link you can visit demonstration site where you can find more details:</p>
	                <a href="https://savicslobodan.com/smoothScroll" className="peti-page-el1-link page27-dodatno">Site</a>
	            </>}
	        </div>
	    </div>
	)
}

