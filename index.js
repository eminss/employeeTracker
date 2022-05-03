`
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employees first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
`

const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

const employeeTracker = () => {

    displayDepartment = () => {
        db.query(`SELECT * FROM department;`, (err, data) => {
            if (err) {
                throw err;
            } else {
                console.table(data)
            }
            employeeTracker();
        })
    };

    displayRoles = () => {
        db.query(`SELECT * FROM roles;`, (err, data) => {
            if (err) {
                throw err;
            } else {
                console.table(data)
            }
            employeeTracker();
        })
    };

    displayEmployee = () => {
        db.query(`SELECT * FROM employee;`, (err, data) => {
            if (err) {
                throw err;
            } else {
                console.table(data)
            }
            employeeTracker();
        })
    };

    addDepartment = (answers) => {
        db.query(`INSERT INTO department (id, department_name) VALUES (?, ?)`, [answers.newDepartmentId, answers.newDepartmentName], (err, data) => {
            err ? err : console.table(data);
            employeeTracker();
        })
    }

    addRole = (answers) => {
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [answers.newRoleName, answers.newRoleSalary, answers.newRoleDepartmentId], (err, data) => {
            err ? err : console.table(data);
            employeeTracker();
        } )
    }

    addEmployee = (answers) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.newEmployeeFirstName, answers.newEmployeeLastName, answers.newEmployeeRoleId, answers.newEmployeeManagerId], (err, data) => {
            err ? err : console.table(data);
            employeeTracker();
        } )
    }

    updateEmployeeRole = (answers) => {
        db.query(`UPDATE employee SET `)
    }
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'View all departments',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Exit'],
                name: 'userChoice'
            }
        ]).then((answers) => {
            console.log(answers.userChoice);
            if (answers.userChoice == 'View all departments') {
                displayDepartment();
            } else if (answers.userChoice == 'View all roles') {
                displayRoles();
            } else if (answers.userChoice == 'View all employees') {
                displayEmployee();
            } else if (answers.userChoice == 'Add a department') {
                inquirer.prompt([
                    {
                        type: 'number',
                        message: 'What is the department ID?',
                        name: 'newDepartmentId',
                    },
                    {
                        type: 'input',
                        message: 'What is the department name?',
                        name: 'newDepartmentName',
                    }
                ]).then((answers) => {
                    addDepartment(answers);
                })
            } else if (answers.userChoice == 'Add a role') {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is the role name?',
                        name: 'newRoleName',
                    },
                    {
                        type: 'number',
                        message: "What is the roles' salary?",
                        name: 'newRoleSalary',
                    },
                    {
                        type: 'number',
                        message: "What is the roles' department ID?",
                        name: 'newRoleDepartmentId',
                    }
                ]).then((answers) => {
                    addRole(answers);
                })
            } else if (answers.userChoice == 'Add an employee') {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: "What is the new employee's first name?",
                        name: 'newEmployeeFirstName',
                    },
                    {
                        type: 'input',
                        message: "What is the new employee's last name?",
                        name: 'newEmployeeLastName',
                    },
                    {
                        type: 'number',
                        message: "What is the new employee's role ID?",
                        name: 'newEmployeeRoleId',
                    },
                    {
                        type: 'number',
                        message: "What is the new employee's manager ID?",
                        name: 'newEmployeeManagerId'
                    }
                ]).then((answers) => {
                    addEmployee(answers);
                })
            } else if (answers.userChoice == 'Update employee role') {
                
                inquirer.prompt([
                    {
                        type: 'list',
                        message: "Which employee's role would you like to update?",
                        choices: [],
                        name: 'selectEmployee',
                    },
                    {
                        type: 'list',
                        message: "What new role would you like to assign to the employee?",
                        choices: [],
                        name: 'selectEmployeeNewRole',
                    }
                ]).then((answers) => {
                    updateEmployeeRole(answers);
                })
                updateEmployeeRole(answers);
            } else if (answers.userChoice == 'Exit') {
                console.log('Bye-bye!');
                db.end();
            }
        });
};

employeeTracker();