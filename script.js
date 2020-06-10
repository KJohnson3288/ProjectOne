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

    for (i=0; i< response.Quotes.length; i++){
        var direct = response.Quotes[i].Direct
        var minprice = response.Quotes[i].MinPrice
        var carrier = obj[response.Quotes[i].OutboundLeg.CarrierIds[0]]
        var date = moment(response.Quotes[i].OutboundLeg.DepartureDate).format("LL")
        
        console.log("Direct: "+direct)
        console.log("Price: "+minprice)
        console.log("Carrier: "+carrier)
        console.log("Date: " +date)

        var flightDiv = $("<div>")
        var directDiv = $("<div>").text("Direct: "+direct)
        var priceDiv = $("<div>").text("Price: "+minprice)
        var carrierDiv = $("<div>").text("Carrier: "+carrier)
        var dateDiv = $("<div>").text("Date: " +date)
        flightDiv.attr("class", "border-dark")
        
        flightDiv.append( directDiv, priceDiv, carrierDiv, dateDiv)
        $("#reasults-container").append(flightDiv)
    }
});

})