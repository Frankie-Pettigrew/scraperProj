var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (callback) {
    axios.get("https://pitchfork.com/best/").then(function (response) {
        var $ = cheerio.load(response.data);
        var articles = [];

        $("a ul").each(function (i, element) {
            var result = {};

            result.artist = $(this).children().text();
            if (i < 3) {
                result.title = $(this).parent().next().text();
                result.link = $(this).parent().parent().parent("a").attr("href");
            } else {
                result.title = $(this).next().text();
                result.link = $(this).parent("a").attr("href");
            }


            console.log(result);
            articles.push(result);
        });
        callback(articles);
    });
};

module.exports = scrape;