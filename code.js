const express = require("express");
const ytd1 = require("ytdl-core");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (request, response) {
    response.sendFile(__dirname + "public/index.html");
});

app.get("/videoInfo", async function (request, response) {
    const videoURL = request.query.videoURL;
    const info = await ytd1.getInfo(videoURL);
    response.status(200).json(info);
});


app.get("/download", function (request, response) {
    const videoURL = request.query.videoURL;
    const itag = request.query.itag;
    response.header("Content-Disposition", 'attachment;\ filename="video.mp4"');
    ytd1(videoURL, {
        filter: format => format.itag == itag
    }).pipe(response);
});

app.listen(port, ()=>{
    console.log(`Listning to port no at  ${port}`);
})