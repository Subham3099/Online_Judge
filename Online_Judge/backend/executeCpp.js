const fs = require('fs')
const path = require('path')
const { exec } = require("child_process")

const outputPath = path.join(__dirname, "outputs")

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
}

const executeCpp = (filePath, testcasePath) => {

    try {

        const jobId = path.basename(filePath).split(".")[0]
        const filename = `${jobId}.exe`
        const outPath = path.join(outputPath, filename)

        return new Promise((resolve, reject) => {
            exec(
                `g++ ${filePath} -o ${outPath} && cd ${outputPath} && ${filename} < ${jobId}.txt`,
                (error, stdout, stderr) => {
                    if (error) {
                        reject(error)
                        console.log(error)
                    }
                    if (stderr) {
                        reject(stderr)
                        console.log(stderr)
                    }
                    resolve(stdout)
                })
        })

    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    executeCpp
}