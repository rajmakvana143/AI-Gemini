const express = require('express');
const app = express();
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const port = 3000;
require('dotenv').config();


//environment set 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({extended:true})); 

// Genrative AI key = AIzaSyDdLz6glKBRK2-CxP441V7kp70nTea4bYo

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "what is javaScript ?";


const getresult = async (prompt) => {
    try {
        const response = await model.generateContent(prompt);
        return response.response.text();
    } catch (error) {
        console.error(error);
    }
}

// getresult();

app.listen(port , () => {
    console.log(`server listing on ${port}`);
});


app.get('/genrativeAI' , (req , res) => {
    res.render('index.ejs');
})

app.post('/genrativeAI' , async (req, res) => {
    const {question} = req.body;
    console.log(question);
    const genrated = await getresult(question);
    // console.log(genrated);
    const para =  spliting(genrated);
    res.render('index.ejs' , {para,question});
}); 

const spliting = (data) => {
    const para = data.split('**');
    return para;
}













// const image = {
//   inlineData: {
//     data: Buffer.from(fs.readFileSync("cookie.png")).toString("base64"),
//     mimeType: "image/png",
//   },
// };