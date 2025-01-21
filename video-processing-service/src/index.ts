import express from 'express';
import ffmpeg from 'fluent-ffmpeg';
const app = express();
app.use(express.json());

app.post("/process-video", (req, res) => {
  //Get path of the input video file from the request body
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  if(!inputFilePath || !outputFilePath) {
    res.status(400).send("Input file path and output file path are required");
  }

  ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=-1:360") //360p converted video

    .on("end", () => {
      res.status(200).send("Video processing completed!");
    })

    .on("error", (error) => {
      console.log("Error processing video", error);
      res.status(500).send("Error processing video");
    })

    .save(outputFilePath);

});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

