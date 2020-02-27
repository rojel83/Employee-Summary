//required variables "npm"?.

const inquire = require("inquirer");
const fs = require("fs");
const manager = require("lib/manager.js");
const engineer = require("lib/engeneer.js");
const intern = require("lib/intern");

let teamList = [];

// create manager question fuction with validation.
const managerQuestions = [{
        type: "input",
        name: "name",
        message: "enter manager name",
        validate: async(input) => {
            if (input == "" || /\s/.test(input)) {
                return "please enter first or last name";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: async(input) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "please enter a valid email address.";
        }
    },
    {
        type: "input",
        name: "officeNum",
        message: "enter office number:",
        validate: async(input) => {
            if (isNaN(imput)) {
                return "please enter a number";
            }
            return true;
        }
    },
    {
        type: "list",
        name: "hasTeam",
        messages: "do you have any team members?",
        choices: ["yes", "no"]
    }

]

//create employee question function for engeneer and intern.
const employeeQuestions = [{
        type: "imput",
        name: "name",
        message: "enter employee name.",
        validate: async(input) => {
            if (input == "") {
                return "please enter a name.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "enter their email:",
        validate: async(input) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "please enter a valid email address.";
        }
    },
    {
        type: "list",
        name: "role",
        message: "what is the new role",
        choices: ["engineer", "intern"]
    },
    {
        when: input => {
            return input.role == "engineer"
        },
        type: "imput",
        name: "github",
        message: "enter yuor github username",
        validate: async(input) => {
            if (input == "" || /\s/.test(input)) {
                return "enter valid github username";
            }
            return true;
        }
    },
    {
        when: input => {
            return input.role == "intern"
        },
        type: "input",
        name: "school",
        message: "enter your school name",
        validate: async(input) => {
            if (input == "") {
                return "plase enter a name.";
            }
            return true;
        }
    },
    {
        type: "list",
        name: "add another team member?",
        choices: ["yes", "no"]
    }

]