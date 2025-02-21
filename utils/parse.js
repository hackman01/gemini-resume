const { GoogleGenerativeAI } = require("@google/generative-ai");
var path = require('path');
var extract = require('pdf-text-extract');
const dotenv = require('dotenv');
dotenv.config();

const generate = async (text) => {

  const struct = 
`{
  "name": <name>,
  "email": <email>,
  "education":
    {
      "degree": <degree>,
      "branch" : <branch>,
      "institution": <institution>,
      "year": <year>
    },
  "experience": 
    {
      "job_title": <job_title>,
      "company": <company>,
      "start_date": <start_date>,
      "end_date": <end_date>
    },
  "skills": [
    <skill_1>,
    <skill_2>,
    ...
  ],
  "summary" <write a short summary about the candidate profile >
}`
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `Analyze the following text and organize it into sections based on headings.Return the result as a JSON object where each key is a heading and its value is the content under that heading. If there are subheadings, nest them appropriately. Here's the text:${text}  Please ensure the response is in valid JSON format and Follow this structure of JSON strictly ${struct} , Also except name and summary field every field should be an array.`;


  const result = await model.generateContent(prompt);
return result.response.text();

}

const parse = async (file) => {

    var filePath = path.join(__dirname, file)

    console.log(filePath)

    

    const extractPromise = new Promise((resolve,reject)=>{

      extract(filePath, function (err, pages) {
        if (err) {
          console.dir(err)
          reject();
        }
        resolve(pages);
      
      })

    })
    
    
    try{
    const text = await extractPromise;
    const res = await generate(text);
    return res;
    } catch(error){
      console.log(error);
      return '';
    }


}

module.exports = parse;




