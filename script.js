var year = moment().year()

var obj = {}

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://public-holiday.p.rapidapi.com/"+year+"/US",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "public-holiday.p.rapidapi.com",
		"x-rapidapi-key": "778af56556msh60df0212f929a25p1bd6fajsn95b39208364f"
	}
}

$.ajax(settings).done(function (response) {
    for (i = 0; i < response.length; i++){
        var div = $("<div>")
        div.attr("class", "holiday")
        var button = $("<button>")
        var button2 = $("<button>")
        var name = response[i].name
        var date = response[i].date

        var date2 = moment(date).format("ll")
        
        console.log(date)

        if (moment() < moment(date)) {
        div.text(name + " falls on: " + date2)
        div.attr("data-name", response[i].name)

        button.attr("data-date", date)
        button.attr("class", "depart success button")
        button.text("Depart")

        button2.attr("data-date", date)
        button2.text("Return")
        button2.attr("class", "return success button")

        $(".holiday-container").append(div)
        $(".holiday-container").append(button)
        $(".holiday-container").append(button2)
    }}

});

$(document).on("click", ".depart", function(){
    $("#departDate").val($(this).attr("data-date"))
})

$(document).on("click", ".return", function(){
    $("#returnDate").val($(this).attr("data-date"))
})


$("#search").on("click", function(){

    getFlights() 
})

function getFlights() {

$("#reasults-container").empty()
var origin = $("#originLocation").val()
var destination = $("#destinationLocation").val()
var departDate = $("#departDate").val()
var returnDate = $("#returnDate").val()
console.log(departDate)
console.log(returnDate)
console.log(origin)
console.log(destination)

var settings2 = {
	"async": true,
	"crossDomain": true,
    "url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/"+origin+"-sky/"+destination+"-sky/"+departDate+"?inboundpartialdate="+returnDate,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
		"x-rapidapi-key": "778af56556msh60df0212f929a25p1bd6fajsn95b39208364f"
	}
}

$.ajax(settings2).done(function (response) {
    console.log(response);

    let apicallback = response.Carriers

    for (let m=0; m<apicallback.length; m++) {
        obj[apicallback[m].CarrierId] = apicallback[m].Name
    }

    console.log(obj)

    if (response.Quotes.length === 0) {
        var flightDiv = $("<div>")
        flightDiv.text("Sorry, no flights match your criteria")
        $("#reasults-container").append(flightDiv)
    }

    else { for (i=0; i< response.Quotes.length; i++){
        var direct = response.Quotes[i].Direct
        var minprice = response.Quotes[i].MinPrice
        var carrier = obj[response.Quotes[i].OutboundLeg.CarrierIds[0]]
        var date = moment(response.Quotes[i].OutboundLeg.DepartureDate).format("LL")

        var flightDiv = $("<div>")
        var directDiv = $("<div>").text("Direct: "+direct)
        var priceDiv = $("<div>").text("Price: $"+minprice)
        var carrierDiv = $("<div>").text("Carrier: "+carrier)
        var dateDiv = $("<div>").text("Date: " +date)
        flightDiv.attr("class", "border-dark")
        
        flightDiv.append(directDiv, priceDiv, carrierDiv, dateDiv)

        $("#reasults-container").append(flightDiv)
    }
    }
    
});

}


var cities = {
    "Birmingham International Airport":"BHM",
"Dothan Regional Airport":"DHN",
"Huntsville International Airport":"HSV",
"Mobile":"MOB",
"Montgomery":"MGM",
"Anchorage International Airport":"ANC",
"Fairbanks International Airport":"FAI",
"Juneau International Airport":"JNU",
"Flagstaff":"FLG",
"Phoenix, Phoenix Sky Harbor International Airport":"PHX",
"Tucson International Airport":"TUS",
"Yuma International Airport":"YUM",
"Fayetteville":"FYV",
"Little Rock National Airport":"LIT",
"Northwest Arkansas Regional Airport":"XNA",
"Burbank":"BUR",
"Fresno":"FAT",
"Long Beach":"LGB",
"Los Angeles International Airport":"LAX",
"Oakland":"OAK",
"Ontario":"ONT",
"Palm Springs":"PSP",
"Sacramento":"SMF",
"San Diego":"SAN",
"San Francisco International Airport":"SFO",
"San Jose":"SJC",
"Santa Ana":"SNA",
"Aspen":"ASE",
"Colorado Springs":"COS",
"Denver International Airport":"DEN",
"Grand Junction":"GJT",
"Pueblo":"PUB",
"Hartford":"BDL",
"Tweed New Haven":"HVN",
"Washington, Dulles International Airport":"IAD",
"Washington National Airport":"DCA",
"Daytona Beach":"DAB",
"Fort Lauderdale-Hollywood International Airport":"FLL",
"Fort Meyers":"RSW",
"Jacksonville":"JAX",
"Key West International Airport":"EYW",
"Miami International Airport":"MIA",
"Orlando":"MCO",
"Pensacola":"PNS",
"St. Petersburg":"PIE",
"Sarasota":"SRQ",
"Tampa":"TPA",
"West Palm Beach":"PBI",
"Panama City-Bay County International Airport":"PFN",
"Atlanta Hartsfield International Airport":"ATL",
"Augusta":"AGS",
"Savannah":"SAV",
"Hilo":"ITO",
"Honolulu International Airport":"HNL",
"Kahului":"OGG",
"Kailua":"KOA",
"Lihue":"LIH",
"Boise":"BOI",
"Chicago Midway Airport":"MDW",
"Chicago, O'Hare International Airport Airport":"ORD",
"Moline":"MLI",
"Peoria":"PIA",
"Evansville":"EVV",
"Fort Wayne":"FWA",
"Indianapolis International Airport":"IND",
"South Bend":"SBN",
"Cedar Rapids":"CID",
"Des Moines":"DSM",
"Wichita":"ICT",
"Lexington":"LEX",
"Louisville":"SDF",
"Baton Rouge":"BTR",
"New Orleans International Airport":"MSY",
"Shreveport":"SHV",
"Augusta":"AUG",
"Bangor":"BGR",
"Portland":"PWM",
"Baltimore":"BWI",
"Boston, Logan International Airport":"BOS",
"Hyannis":"HYA",
"Nantucket":"ACK",
"Worcester":"ORH",
"Battlecreek":"BTL",
"Detroit Metropolitan Airport":"DTW",
"Detroit":"DET",
"Flint":"FNT",
"Grand Rapids":"GRR",
"Kalamazoo-Battle Creek International Airport":"AZO",
"Lansing":"LAN",
"Saginaw":"MBS",
"Duluth":"DLH",
"Minneapolis/St.Paul International Airport":"MSP",
"Rochester":"RST",
"Gulfport":"GPT",
"Jackson":"JAN",
"Kansas City":"MCI",
"St Louis, Lambert International Airport":"STL",
"Springfield":"SGF",
"Billings":"BIL",
"Lincoln":"LNK",
"Omaha":"OMA",
"Las Vegas, Las Vegas McCarran International Airport":"LAS",
"Reno-Tahoe International Airport":"RNO",
"Manchester":"MHT",
"Atlantic City International Airport":"ACY",
"Newark International Airport":"EWR",
"Trenton":"TTN",
"New Mexico":"NM",
"Albuquerque International Airport":"ABQ",
"Alamogordo":"ALM",
"Albany International Airport":"ALB",
"Buffalo":"BUF",
"Islip":"ISP",
"New York, John F Kennedy International Airport":"JFK",
"New York, La Guardia Airport":"LGA",
"Newburgh":"SWF",
"Rochester":"ROC",
"Syracuse":"SYR",
"Westchester":"HPN",
"Asheville":"AVL",
"Charlotte/Douglas International Airport":"CLT",
"Fayetteville":"FAY",
"Greensboro":"GSO",
"Raleigh":"RDU",
"Winston-Salem":"INT",
"Bismark":"BIS",
"Fargo":"FAR",
"Akron":"CAK",
"Cincinnati":"CVG",
"Cleveland":"CLE",
"Columbus":"CMH",
"Dayton":"DAY",
"Toledo":"TOL",
"Oklahoma City":"OKC",
"Tulsa":"TUL",
"Eugene":"EUG",
"Portland International Airport":"PDX",
"Portland, Hillsboro Airport":"HIO",
"Salem":"SLE",
"Allentown":"ABE",
"Erie":"ERI",
"Harrisburg":"MDT",
"Philadelphia":"PHL",
"Pittsburgh":"PIT",
"Scranton":"AVP",
"Providence - T.F. Green Airport":"PVD",
"Charleston":"CHS",
"Columbia":"CAE",
"Greenville":"GSP",
"Myrtle Beach":"MYR",
"Pierre":"PIR",
"Rapid City":"RAP",
"Sioux Falls":"FSD",
"Bristol":"TRI",
"Chattanooga":"CHA",
"Knoxville":"TYS",
"Memphis":"MEM",
"Nashville":"BNA",
"Amarillo":"AMA",
"Austin Bergstrom International Airport":"AUS",
"Corpus Christi":"CRP",
"Dallas Love Field Airport":"DAL",
"Dallas/Fort Worth International Airport":"DFW",
"El Paso":"ELP",
"Houston, William B Hobby Airport":"HOU",
"Houston, George Bush Intercontinental Airport":"IAH",
"Lubbock":"LBB",
"Midland":"MAF",
"San Antonio International Airport":"SAT",
"Salt Lake City":"SLC",
"Burlington":"BTV",
"Montpelier":"MPV",
"Rutland":"RUT",
"Dulles":"IAD",
"Newport News":"PHF",
"Norfolk":"ORF",
"Richmond":"RIC",
"Roanoke":"ROA",
"Pasco, Pasco/Tri-Cities Airport":"PSC",
"Seattle, Tacoma International Airport":"SEA",
"Spokane International Airport":"GEG",
"Charleston":"CRW",
"Clarksburg":"CKB",
"Huntington Tri-State Airport":"HTS",
"Green Bay":"GRB",
"Madison":"MSN",
"Milwaukee":"MKE",
"Casper":"CPR",
"Cheyenne":"CYS",
"Jackson Hole":"JAC",
"Rock Springs":"RKS",
}

var cityArray = Object.keys(cities)


for (i=0; i<cityArray.length; i++){
    //console.log(cities[cityArray[i]])
    var a = $("<option>")
    a.attr("value", cities[cityArray[i]])
    a.text(cityArray[i])
    var b = $("<option>")
    b.attr("value", cities[cityArray[i]])
    b.text(cityArray[i])
    $("#originLocation").append(a)
    $("#destinationLocation").append(b)
}

