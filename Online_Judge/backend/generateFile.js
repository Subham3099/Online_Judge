const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')


const generateFile = (language, code, directory, defaultId) => {

    try {

        const dirCodes = path.join(__dirname, directory)

        if (!fs.existsSync(dirCodes)) {
            fs.mkdirSync(dirCodes, { recursive: true })
        }

        const jobID = defaultId.length==0?uuid():defaultId
        const filename = `${jobID}.${language}`
        const filePath = path.join(dirCodes, filename)
        fs.writeFileSync(filePath, code)
        return filePath

    }catch(error){
        console.log(error)
    }
}

module.exports = {
    generateFile
}