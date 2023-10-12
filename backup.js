const inquirer = require("@inquirer/prompts");
const fs = require("fs").promises;
const path = require("path");
const fse = require("fs-extra");


const doBackup = (type) => {
    let adress = {
        esport: {
            src: path.join(__dirname, "output", "esport"),
            dest: path.join(__dirname, "backup", "esport"),
        }
    }
    
    if(type === 'esport'){
        fse.copy(adress.esport.src, adress.esport.dest, err => {
            if (err) return console.error(err)
            console.log('esport backup created !')
          }) // copies directory, even if it has subdirectories or files
    }
}

doBackup('esport');