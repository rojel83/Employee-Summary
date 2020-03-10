//required node pagckages.

const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");

// beging function

async function start() {
  console.log("create a team");

  //variable that holds the html file
  let teamHTML = "";
  //team members variable
  let teamSize;
  //start question to create team size
  await inquirer
    .prompt({
      type: "number",
      message: "number of people on your team?",
      name: "numOnTeam"
    })
    .then(data => {
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

    await inquirer
      .prompt([
        {
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
          message: `what is the employee (${i}) Email`,
          name: "email"
        },
        {
          type: "list",
          message: `what is the employee (${i}) title`,
          name: "title",
          choices: ["Engineer", "Intern", "Manager"]
        }
      ])
      .then(data => {
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

        await inquirer
          .prompt([
            {
              type: "input",
              message: "what is the manager's office number?",
              name: "officeNum"
            }
          ])
          .then(data => {
            //newobject with all user data input
            const manager = new Manager(name, id, email, data.officeNum);

            teamMember = fs.readFileSync("templates/manager.html");
            // console.log("teamMember", teamMember);
            teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
          });
        break;
      //intern info
      case "Intern":
        await inquirer
          .prompt([
            {
              type: "input",
              message: "what school is the intern attending",
              name: "school"
            }
          ])
          .then(data => {
            // console.log("id in Inter", id);
            // console.log("name in Intern", name);
            // console.log("email in Intern", email);

            const intern = new Intern(name, id, email, data.school);
            // console.log("Intern", Intern);

            teamMember = fs.readFileSync("templates/intern.html");
            teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
          });
        break;
      //engineer info
      case "Engineer":
        await inquirer
          .prompt([
            {
              type: "input",
              message: "what is the Engineer's GitHub?",
              name: "github"
            }
          ])
          .then(data => {
            // console.log("id in Engineer", id);
            // console.log("name in Engineer", name);
            // console.log("email in Engineer", email);

            const engineer = new Engineer(name, id, email, data.github);
            // console.log("Engineer", engineer);

            teamMember = fs.readFileSync("templates/engineer.html");
            teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
          });
        break;
    }
  }

  //reads main.html
  const mainHTML = fs.readFileSync("templates/main.html");

  teamHTML = eval("`" + mainHTML + "`");

  fs.writeFile("output/team.html", teamHTML, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("Succes!");
  });
}

start();

// ============================================================================================================
