const express = require("express");
const https = require("https");
// const { dirname } = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")


    // res.send("this ie very ok")//we cant have to res.send in the app.get
})
app.post("/", function(req, res) {

    // console.log(req.body.cityName);
    const apiKey = "633ff339cad6b31e935594 e92061e9e3";
    const query = req.body.cityName;
    const unit = "units";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + ",uk&APPID=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {

        console.log(response.statusCode);

        //we add a response of our data and we convert it json in order to be read easily
        response.on("data", function(data) {
            const weatherData = JSON.parse(data) // json.parse is to convert the api data into readable format
            console.log(weatherData);

            // for example we put create an object 
            // const object = {
            //     name: "Lucas",
            //     favouriteFood: "Ramen"
            // }
            // console.log(JSON.stringify(object));

            const temp = weatherData.main.temp
            console.log(temp);

            const weatherdescription = weatherData.weather[0].description
            console.
            log(weatherdescription);

            const icon = weatherData.weather[0].icon //we create a variable for creating this icon 
            const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png" //we put the link form open weather api of icons

            res.write("<p>The weather description is " + weatherdescription + "</p>");
            res.write("<h1>The temperature of " + query + " is " + temp + "degress celicious</h1>")
            res.write("<img src=" + imgurl + ">") //here we put the img src in the img tag

            res.send();

        })

    })


    console.log("Post request recieved in the server");
})






app.listen(process.env.PORT || 3000, function() { //Here we change our server to start working on heroku and we use a line a of code
    //called process.env.PORT so that the server can choose for us the port it requires and we put || to listen on 3000
    //this means that the system can run on both Heroku and locally on the machine

    console.log("Server 3000 is up and running");
})