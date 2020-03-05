//required node pagckages.

const inquire = require("inquirer");
const fs = require("fs");
const manager = require("./lib/manager");
const engineer = require("./lib/engineer.js");
const intern = require("./lib/intern");

let teamList = [];



// beging function

async function start() {
    console.log("create a team");

    //variable that holds the html file
    let teamhtml = "";
    //team members variable
    let teamSize;
    //start question to create team size
    await inquire.prompt({
            type: "number",
            message: "number of people on your team?",
            name: "numOnTeam"
        })
        .then((data) => {
            teamSize = data.numOnTeam + 1;
        });
    if (teamSize === 0) {
        console.log("your team is empty!");
        return;
    }
    // beging team questions to generate employees

    for (i = 1; i < teamSize; i++) {
        let name;
        let id;
        let title;
        let email;

        await inquire.prompt([{
                    type: "input",
                    message: `what is the employee (${i}) name`,
                    name: "name"
                },
                {
                    type: "input",
                    message: `what is the employee (${i}) id`,
                    name: "id"
                },
                {
                    type: "imput",
                    message: `what is the employee (${i}) email`,
                    name: "email"
                },
                {
                    type: "list",
                    message: `what is the employee (${i}) title`,
                    name: "title",
                    choices: ["Engineer", "Intern", "Manager"]
                }
            ])
            .then((data) => {

                //takes data from user for global variable
                name = data.name;
                id = data.id;
                title = data.title;
                email = data.email;
            });

        //change employee position by case

        switch (title) {
            case "Manager":

                //manager info

                await inquire.prompt([{
                        type: "input",
                        message: "what is the manager's office number?",
                        name: "officeNum"
                    }])
                    .then((data) => {
                        //newobject with all user data input
                        const manager = new manager(name, id, email, data.officeNum);
                        teamMember = fs.readFileSync("templates/manager.html");
                        teamHTML = teamHTML + "\n" + eval('`' + teamHTML + '`');
                    });
                break;
                //intern info
            case "intern":
                await inquire.prompt([{
                        type: "input",
                        message: "what school is the intern attending",
                        name: "school"
                    }])
                    .then((data) => {
                        const intern = new intern(name, id, email, data.school);
                        teamMember = fs.readFileSync("templates/intern.html");
                        teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                    });
                break;
                //engineer info
            case "engineer":
                await inquire.prompt([{
                        type: "input",
                        message: "what is the Engineer's GitHub?",
                        name: "github"
                    }])
                    .then((data) => {
                        const engineer = new engineer(name, id, email, data.github);
                        teamMember = fs.readFileSync("templates/engineer.html");
                        teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                    });
                break;
        }
    }

    //reads main.html
    const mainHTML = fs.readFileSync("templates/main.html");

    teamHTML = eval('`' + mainHTML + '`');

    fs.writeFile("output/team.html", teamHTML, function(err) {

        if (err) {
            return console.log(err);
        }

        console.log("Succes!");


    });

}

start();

















// ============================================================================================================