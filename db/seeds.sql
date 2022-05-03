INSERT INTO department (id, department_name)
VALUES
    (001, "Engineering"),
    (002, "Design"),
    (003, "Interface Design");
INSERT INTO roles (id, title, salary, department_id)
VALUES
    (001, "Engineer", 120000, 001),
    (002, "Designer", 100000, 002),
    (003, "UI/UX", 100000, 003);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (001, "Jaden", "Storey", 001, 001),
    (002, "Chris", "DeLagarza", 002, 001),
    (003, "Mr", "Kalif", 003, 002);