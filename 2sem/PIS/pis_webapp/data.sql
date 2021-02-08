INSERT INTO role (id, name) values (1, 'superadmin');
INSERT INTO role (id, name) values (2, 'admin');
INSERT INTO role (id, name) values (3, 'employee');
INSERT INTO role (id, name) values (4, 'user');

INSERT INTO app_user (id, name, surname, email, password, role_id) values (1, 'Tomas', 'Lapsansky', 'xlapsa00@stud.fit.vutbr.cz', '$2a$10$fblnVhTZZIWkSUZeA.fv9Ok7wG1cUqwSaPafI6a.N9aDsNLRKg9bK', 1);
INSERT INTO app_user (id, name, surname, email, password, role_id, address, city, code) values (2, 'Anton', 'Firc', 'xfirca00@stud.fit.vutbr.cz', '$2a$10$fblnVhTZZIWkSUZeA.fv9Ok7wG1cUqwSaPafI6a.N9aDsNLRKg9bK', 1, 'Ulica 123', 'Banska Bystrica', '97401');

INSERT INTO product (id, name, price, description, specification, available) values (1, 'Bober', 100, 'Jaky fajny bober', 'Pozor: gryze!', true);