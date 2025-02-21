const Resume = require('../models/resume.model');
const downloadFile = require('../utils/download');
const parse = require('../utils/parse');


const parseResume = async (req,res) => {

    try{

    const { url } = req.body;

    const file = await downloadFile(url);

    if(!file){
        return res.status(500).json({message: "Failed to download file or file isn't pdf"});
    }
    
    const jsonFile = await parse(file)

    const trimmed = jsonFile.slice(7,-4)

    console.log(trimmed);

    const parsed = JSON.parse(trimmed);

    if(!parsed){
        return res.status(500).json({message: "There is some problem with using LLM",error: error.message});
    }

    const newResume = new Resume({
        ...parsed
    })

    await newResume.save();

    res.status(200).json({message: "Successfully parsed the resume!",data: newResume });

} catch(error){
    console.log(error);
    res.status(500).json({message: "Failed to parse the resume!", error: error.message});
}

}


const findResume = async (req,res) => {

    try{

        const { name } = req.query;

        const resumes = await Resume.find({name : { $regex: name, $options: 'i' }});

        if(!resumes){
            return res.status(404).json({message: "No Resume found!"});
        }

        res.status(200).json(resumes);


    } catch(error){

        console.log(error);
        res.status(500).json({message: "Failed to fetch resume", error: error.message});

    }

}

module.exports = { parseResume,findResume };