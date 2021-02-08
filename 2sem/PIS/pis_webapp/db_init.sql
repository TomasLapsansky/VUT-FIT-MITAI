-- Brief: Database initialization script for internet e-shop
-- Author: Lapsansky Tomas
-- Author: Firc Anton
-- Author: Goldschmidt Patrik
-- Date: 27.04.2020
-- Institution: Faculty of Information Technology, Brno University of
--              Technology

-- Cleanup
DELETE FROM product_category;
DELETE FROM product_discount;
DELETE FROM product_favorite;
DELETE FROM product_photo;
DELETE FROM user_order_item;
DELETE FROM cartitem;
DELETE FROM category;
DELETE FROM discount;
DELETE FROM order_rma;
DELETE FROM user_order;
DELETE FROM privilege;
DELETE FROM app_user;
DELETE FROM role;
DELETE FROM role_privilege;
DELETE FROM store_entity;
DELETE FROM store;
DELETE FROM product;

-- Set timezone
SET timezone = 'Europe/Bratislava';

-- Create roles
INSERT INTO role (id, name) VALUES (1, 'superadmin');
INSERT INTO role (id, name) VALUES (2, 'admin');
INSERT INTO role (id, name) VALUES (3, 'employee');
INSERT INTO role (id, name) VALUES (4, 'user');

-- Create privileges
/*
INSERT INTO privilege (id, action, type) VALUES (1, 'something', 1);

*/

-- Link privileges to roles
/*
INSERT INTO role_privilege (id, privilege_id, role_id) VALUES(1, 1, 1);
*/

-- Create users
INSERT INTO app_user (id, name, surname, email, password, role_id)
   VALUES (0, 'Tomas', 'Lapsansky', 'xlapsa00@stud.fit.vutbr.cz', 'passwd', 1);
INSERT INTO app_user (id, address, city, code, email, name, password, surname, role_id)
   VALUES (1, 'Zapoctova 1', 'Bratislava', '82101', 'admin@pis-eshop.sk', 'Ivan',
           'passwd', 'Hrozny', 1);
INSERT INTO app_user (id, address, city, code, email, name, password, surname, role_id)
   VALUES (2, 'Miestna 7', 'Banska Bystrica', '74102', 'bystry@pis-eshop.sk', 'Michal',
           'passwd', 'Bystry', 2);
INSERT INTO app_user (id, address, city, code, email, name, password, surname, role_id)
   VALUES (3, 'Na rohu 4', 'Malacky', '91701', 'plachy@pis-eshop.sk', 'Adam',
           'jaSomAdam', 'Plachy', 2);
INSERT INTO app_user (id, address, city, code, email, name, password, surname, role_id)
   VALUES (4, 'Kosicka 44a', 'Humenne', '33401', 'helbertova@pis-eshop.sk', 'Ruzena',
           'passwd', 'Helbertova', 3);
INSERT INTO app_user (id, address, city, code, email, name, password, surname, role_id)
   VALUES (5, 'Za dolami za dolami 1', 'Komarno', '93001', 'zapeklita@pis-eshop.sk', 'Situacia',
           'passwd', 'Zapeklita', 3);
INSERT INTO app_user (id, address, city, code, email, name, password, surname, role_id)
   VALUES (6, 'Uzernicka 55', 'Poprad', '85401', 'ostry@pis-eshop.sk', 'Jan',
           'passwd', 'Ostry', 3);
INSERT INTO app_user (id, address, city, code, email, name, password, surname, role_id)
   VALUES (7, 'Razia c77', 'Sobrance', '41770', 'lakatos771@gadzonet.sk', 'Damian',
           'passwd', 'Lakatos', 4);
INSERT INTO app_user (id, address, city, code, email, name, password, surname, role_id)
   VALUES (8, 'Bozetechova 1', 'Brno', '85401', 'racek2@seznam.cz', 'Michal',
           'passwd', 'Racek', 4);
INSERT INTO app_user (id, address, city, code, email, name, password, surname, role_id)
   VALUES (9, 'Dolina ponikov', 'Nove Mesto nad Vahom', '10770', 'pip@gmail.com', 'Rudolf',
           'passwd', 'Python', 4);
INSERT INTO app_user (id, address, city, code, email, name, password, surname, role_id)
   VALUES (10, 'Mostovska 7', 'Komarno', '85401', 'bigBoy14@gmail.com', 'Joszef',
           'passwd', 'Javista', 4);

-- Create product categories
INSERT INTO category (id, description, name, parent_category)
   VALUES (1, 'Počítače, notebooky a všetko čo k nim patrí.',
           'Informačné technológie - hardvér', NULL);
INSERT INTO category (id, description, name, parent_category)
   VALUES (2, 'Softvér, čo môžeš kúpiť dnes neodkladaj na zajtra.',
           'Informačné technológie - softvér', NULL);
INSERT INTO category (id, description, name, parent_category)
   VALUES (3, 'Domáce, ale aj iné spotrebiče z našich skladov priamo do vašej obývačky.',
           'Spotrebiče', NULL);
INSERT INTO category (id, description, name, parent_category)
   VALUES (4, 'Chcete ušetriť? Kúpte použité!',
            'Bazár a second-hand elektronika', NULL);
INSERT INTO category (id, description, name, parent_category)
   VALUES (10, 'Klasické desktopové počítače od známych výrobcov za nejlepšie ceny!',
           'Počítače', 1);
INSERT INTO category (id, description, name, parent_category)
   VALUES (11, 'Na cestu, do školy alebo na prácu, my to máme všetko.',
           'Notebooky', 1);
INSERT INTO category (id, description, name, parent_category)
   VALUES (12, 'Vývoj, štúdium alebo inteligentná domácnosť. Obrovský potenciál v malej krabičke.',
           'miniPC', 1);
INSERT INTO category (id, description, name, parent_category)
   VALUES (13, 'Smartfóny Apple, Samsung, Xiaomi a všetky ďalšie exotické značky.',
           'Smartfóny', 1);
INSERT INTO category (id, description, name, parent_category)
   VALUES (14, 'Chráň svoj počítač pred nástrahami',
           'Antivírusy', 2);
INSERT INTO category (id, description, name, parent_category)
   VALUES (15, 'Tvorba dokumentov, tabuliek, grafov.  Krabicové verzie aj predplatné.',
           'Kancelársky softvér', 2);
INSERT INTO category (id, description, name, parent_category)
   VALUES (16, 'Vôňa čerstvej profesionálne-zomletej kávy aj vo vašej kuchyni.',
           'Kávovary', 3);

-- Create discounts
INSERT INTO discount (id, time_from, time_to, type, value)
   VALUES (1, TIMESTAMP '2020-04-27 14:58:36',
           TIMESTAMP '2020-04-30 23:59:59', 1, 399.99);
INSERT INTO discount (id, time_from, time_to, type, value)
   VALUES (2, TIMESTAMP '2020-04-20 08:00:00',
           TIMESTAMP '2020-05-07 23:59:59', 1, 485.13);
INSERT INTO discount (id, time_from, time_to, type, value)
   VALUES (3, TIMESTAMP '2020-01-01 00:00:00',
           TIMESTAMP '2020-12-31 23:59:59', 1, 99.99);
INSERT INTO discount (id, time_from, time_to, type, value)
   VALUES (4, TIMESTAMP '2020-04-30 13:51:50',
           TIMESTAMP '2020-05-03 23:59:59', 1, 651.99);
INSERT INTO discount (id, time_from, time_to, type, value)
   VALUES (5, TIMESTAMP '2020-04-01 11:32:14',
           TIMESTAMP '2020-04-30 23:59:59', 1, 18.99);

-- Create products
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (1, True, TIMESTAMP '2020-04-10 11:32:04', 'Kancelársky počítač Dell',
   'Dell OptiPlex 3060 SFF', 0, 542.90,
   'Počítač Intel Core i3 8100 Coffee Lake, Intel UHD Graphics 630, RAM 8GBDDR4,
   SSD 256GB, DVD, HDMI a DisplayPort, 4× USB 3.2, 4× USB 2.0, typ skrine: Mini
   Tower, myš a klávesnica, Windows 10 Pro, (NBD).');
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (2, True, TIMESTAMP '2020-04-10 11:33:41', 'Minipočítač Raspberry Pi na rôzne použitie.',
   'Raspberry Pi 4 Model B - 4 GB RAM', 0, 56.90,
   'Mini PC Cortex-A72, VideoCore VI 3D , RAM 4GBLPDDR4, bez mechaniky, WiFi,
   2× USB 3.2, 2× USB 2.0, bez operačného systému.');
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (3, True, TIMESTAMP '2020-04-10 11:34:51', 'Herný počítač',
   'Acer Nitro N50-600', 0, 836.10,
   'Herný PC Intel Core i7 9700 Coffee Lake 4.7 GHz, NVIDIA GeForce GTX 1650 4 GB,
   RAM 16GBDDR4, SSD 512GB+ HDD 1TB 7 200 ot./min, DVD, WiFi, DVI a HDMI,
   3× USB 3.2, 4× USB 2.0, typ skrine: Mini Tower, myš a klávesnica, Windows 10 Home.');
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (4, True, TIMESTAMP '2020-04-10 11:36:12', 'Kancelársky počítač',
   'Intel NUC 8i5BEH', 0, 425.90,
   'Mini PC Intel Core i5 8259U 2.3GHz Coffee Lake 3.8 GHz, Intel Iris Plus Graphic
   655 DDR4, bez mechaniky, WiFi, HDMI, 5× USB 3.2, bez operačného systému.');
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (5, False, TIMESTAMP '2020-04-10 11:37:32', 'Kancelársky notebook',
   'Acer Swift 1 Sakura Pink', 0, 549.00,
   'Notebook – Intel Pentium Silver N5000 Gemini Lake, 14" IPS matný 1920 × 1080,
   RAM 8GB DDR4, Intel UHD Graphics 605, SSD 256GB, podsvietená klávesnica, webkamera,
   USB 3.2 Gen 1, USB-C, čítačka odtlačkov prstov, WiFi 802.11ac, 3-článková batéria
   54 Wh, Windows 10 Home (SF114-32-P8Z1).');
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (6, False, TIMESTAMP '2020-04-10 11:39:04', 'Herný notebook',
   'Lenovo Legion Y540-15IRH Black', 0, 1089.00,
   'Herný notebook – Intel Core i5 9300H Coffee Lake, 15.6" IPS antireflexný 1920 × 1080
   144Hz, RAM 16GB DDR4, NVIDIA GeForce GTX 1660 Ti 6GB, SSD 1000GB, numerická klávesnica,
   podsvietená klávesnica, webkamera, USB-C, WiFi 802.11ac, 3-článková batéria 57 Wh,
   Windows 10 Home.');
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (7, True, TIMESTAMP '2020-04-10 11:41:12', 'Macbook',
   'MacBook Pro 16" SK Vesmírne sivý', 2, 2699.00,
   'MacBook – Intel Core i7 9750H Coffee Lake, 16" IPS lesklý 3072 × 1920, RAM 16GB DDR4,
   AMD Radeon Pro 5300M 4GB, SSD 512GB, podsvietená klávesnica, webkamera, USB-C, čítačka
   odtlačkov prstov, WiFi 802.11ac, 100 Wh batéria, MAC OS.');
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (8, True, TIMESTAMP '2020-04-10 11:43:01', 'Operačný systém',
   'Microsoft Windows 10 Home SK (FPP)', 0, 119.90 ,
   'Operačný systém - plná krabicová verzia, obsahuje USB flash disk pre 32-bit alebo 64-bit
   inštaláciu, slovenský, pre 1 počítač prenositeľná');
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (9, True, TIMESTAMP '2020-04-10 11:44:58', 'Antivírusový softvér',
   'ESET Family Security Pack pre 4 zariadenia na 18 mesiacov SK', 2, 69.90 ,
   'Bezpečnostný softvér –výhodný bezpečnostný balík pre celú rodinu, s ktorým ochránite až
   4 zariadenia s OS Windows, Android, macOS alebo Linux. Súčasťou balíka (voliteľne) je
   aj ESET Parental Control pre spoľahlivú ochranu vašich detí. Teraz ako darček e-kniha
   Spojení navždy o výchove deti v digitálnej dobe. Slovenská verzia.');
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (10, True, TIMESTAMP '2020-04-10 11:46:44', 'Antivírusový softvér',
   'Avast Business 12 mesiacov SK', 10, 29.90 ,
   'Bezpečnostný softvér Avast je oproti ESET-u slabý odvar, ale možno zaujme niektorých
   používateľov svojou cenou. Treba však myslieť na fakt, že málo peňazí = málo muziky.');
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (11, True, TIMESTAMP '2020-04-12 18:32:09', 'High-end kávovar',
   'De Longhi ECAM 370.95 T', 1, 769.00 ,
   'Automatický kávovar tlak 19 bar, mliečny systém, mlynček na kávu, príprava dvoch šálok
   naraz, displej, s parnou tryskou, nastavenie množstva vody, nastavenie množstva kávy,
   odkvapkávací systém, časovač, odvápňovací systém, samočistiaci systém a cappuccino a latte,
   objem nádržky na vodu 1.8 l, veľkosť zásobníka mlynčeka 300 g, príkon 1450 W, šírka
   23.6 cm, výška 34.8 cm, hĺbka 42.9 cm, hmotnosť 9.5 kg, farba strieborná, titán a sivá.');
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (12, True, TIMESTAMP '2020-04-12 18:34:38', 'Low-cost kávovar',
   'ROHNSON R-982 Perfect Crema', 0, 95.00 ,
   'Pákový kávovar tlak 20 bar, objem nádržky na vodu 1.6 l, príprava dvoch šálok naraz,
   s parnou tryskou, výškovo nastaviteľný podstavec, ohrievač šálok, odkvapkávací systém,
   režim úspory energie a cappuccino a latte, príkon 850 W, šírka 21.5 cm, výška 29 cm,
   hĺbka 25 cm, hmotnosť 3.65 kg, farba čierna a antikoro');
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (13, True, TIMESTAMP '2020-04-12 18:37:54', 'Použitý telefón',
   'Apple iPhone 11 pro max 256gb', 1, 900.00 ,
   'Iphone 11, včera kúpený, nezapnutý, nepoškriabaný. Ponúkame za rozumú cenu.');
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (14, True, TIMESTAMP '2020-04-12 18:41:15', 'Refurbished notebook',
   'Lenovo ThinkPad L440', 0, 247.02 ,
   'Intel Pentium 3550M (2M Cache, 2.30 GHz), 4GB SO-DIMM DDR3, 500GB HDD, bez mechaniky,
   Intel HD Graphics, Windows 10 Professional 64-bit.');
INSERT INTO product (id, available, created, description, name, num_buys, price, specification)
   VALUES (15, True, TIMESTAMP '2020-04-12 18:44:25', 'Refurbished workstation',
   'HP ProDesk 600 G2 SFF', 0, 293.47 ,
   'Core i3 6100 3.7GHz/4GB RAM/128GB SSD + 500GB HDD
   DVD-RW-slim/Intel HD Graphics/Win 10 Pro 64-bit.');

-- Assign products to categories
INSERT INTO product_category (id, category_id, product_id)
   VALUES (1,  10, 1);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (2,  12, 2);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (3,  10, 3);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (4,  10, 4);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (5,  12, 4);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (6,  11, 5);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (7,  11, 6);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (8,  11, 7);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (9,  15, 8);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (10, 14, 9);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (11, 14, 10);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (12, 16, 11);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (13, 16, 12);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (14, 4, 13);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (15, 4, 14);
INSERT INTO product_category (id, category_id, product_id)
   VALUES (16, 4, 15);
   
-- Assign discounts to products   
INSERT INTO product_discount (id, discount_id, product_id)
   VALUES (1, 1, 4);
INSERT INTO product_discount (id, discount_id, product_id)
   VALUES (2, 2, 1);
INSERT INTO product_discount (id, discount_id, product_id)
   VALUES (3, 3, 8);
INSERT INTO product_discount (id, discount_id, product_id)
   VALUES (4, 4, 11);
INSERT INTO product_discount (id, discount_id, product_id)
   VALUES (5, 5, 10);
   
-- Add some favorite products for users
INSERT INTO product_favorite(id, product_id, user_id)
   VALUES (1, 7, 0);
INSERT INTO product_favorite(id, product_id, user_id)
   VALUES (2, 15, 10);
INSERT INTO product_favorite(id, product_id, user_id)
   VALUES (3, 10, 10);
INSERT INTO product_favorite(id, product_id, user_id)
   VALUES (4, 10, 4);
   
-- Link photos to products
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (1, 'Fotka Dell kancelárskeho počítača', '/data/p1_dell.jpg',
           'Dell OptiPlex 3060 SFF', 1);
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (2, 'Fotka Raspberry Pi 4', '/data/p2_rpi4b.jpg',
           'Raspberry Pi 4 Model B - 4 GB RAM', 2);
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (3, 'Fotka počítača Acer Nitro', '/data/p3_acer_battlebox.jpg',
           'Acer Nitro N50-600', 3);
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (4, 'Potka počítača Intel NUC', '/data/p4_intel_nuc.jpg',
           'Intel NUC 8i5BEH', 4);
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (5, 'Fotka počítača Acer Swift', '/data/p5_acer_swift1.jpg',
           'Acer Swift 1 Sakura Pink', 5);
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (6, 'Fotka počítača Lenovo Legion', '/data/p6_lenovo.jpg',
           'Lenovo Legion Y540-15IRH Black', 6);
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (7, 'Fotka krásneho a drahého jabĺčka', '/data/p7_macbook.jpg',
           'MacBook Pro 16" SK Vesmírne sivý', 7);
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (8, 'Vzor krabice Microsoft Windows 10 home', '/data/p8_w10_sk.jpg',
           'Microsoft Windows 10 Home SK (FPP)', 8);
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (9, 'Fotka krabice ESET Family Security', '/data/p9_eset.jpg',
           'ESET Family Security Pack pre 4 zariadenia na 18 mesiacov SK', 9);
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (10, 'Fotka krabice Avast Business', '/data/p10_avast.jpg',
           'Avast Business 12 mesiacov SK', 10);
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (11, 'Fotka kávovaru Longhi', '/data/p11_delongi.jpg',
           'De Longhi ECAM 370.95 T', 11);
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (12, 'Fotka kávovaru ROHNSON', '/data/p12_rohnson.jpg',
           'ROHNSON R-982 Perfect Crema', 12);
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (13, 'Fotka bazárového jabĺčka s extrémnou cenou', '/data/p13_iphone.jpg',
           'Apple iPhone 11 pro max 256gb', 13);
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (14, 'Fotka počítača Lenovo ThinkPad', '/data/p14_lenovorefur.jpg',
           'Lenovo ThinkPad L440', 14);
INSERT INTO product_photo (id, description, file_path, name, product_id)
   VALUES (15, 'Fotka refurbished počítača HP', '/data/p15_hp_refurbished.jpg',
           'HP ProDesk 600 G2 SFF', 15);
           
-- Add some products to user carts
INSERT INTO cartitem (id, amount, product_id, user_id)
   VALUES (1, 2, 10, 10);
INSERT INTO cartitem (id, amount, product_id, user_id)
   VALUES (2, 1, 11, 10);
INSERT INTO cartitem (id, amount, product_id, user_id)
   VALUES (3, 1, 6, 9);
   
-- Populate table with some stores
INSERT INTO store (id, location, name)
   VALUES (1, 'Holíčska 27, 851 05 Petržalka, Bratislava',
   'LUNAPARK - výdajňa obedov a obchod s elektronikou PIS-PISS.');
INSERT INTO store (id, location, name)
   VALUES (2, 'Tolstého 102/3, 066 01 Humenné',
   'CHECK # MATE - kaviareň pre bratislavkých hipsterov a obchod s elektronikou
    PIS-PISS.');
INSERT INTO store (id, location, name)
   VALUES (3, 'Považská 452/12, 040 11 Košice - mestská časť Západ',
   'Základná škola a pobočka obchodu s elektronikou PIS-PISS.');
INSERT INTO store (id, location, name)
   VALUES (4, 'Na Vartičke 10, 965 01 Žiar nad Hronom',
   'HERMES s.r.o. - transportná spoločnosř a obchod s elektronikou PIS-PISS.');

-- Add some items to the shop
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (1, 5,  1,  1);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (2, 4,  2,  1);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (3, 2,  3,  1);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (4, 1,  4,  1);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (5, 4,  7,  1);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (6, 10, 10, 1);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (7, 7,  12, 1);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (8, 1,  13, 1);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (9, 1,  14, 1);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (10, 2,  15, 1);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (11, 3, 1, 2);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (12, 1, 3, 2);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (13, 3, 7, 2);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (14, 1, 8, 2);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (15, 2, 9, 2);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (16, 3, 11, 2);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (17, 7, 12, 2);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (18, 2, 13, 2);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (19, 5, 1, 3);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (20, 5, 2, 3);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (21, 2, 3, 3);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (22, 4, 8, 3);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (23, 3, 9, 3);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (24, 2, 10, 3);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (25, 9, 11, 3);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (26, 7, 12, 3);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (27, 2, 13, 3);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (28, 1, 15, 3);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (29, 5, 1, 4);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (30, 5, 2, 4);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (31, 2, 3, 4);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (32, 4, 8, 4);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (33, 3, 9, 4);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (34, 2, 10, 4);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (35, 9, 11, 4);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (36, 7, 12, 4);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (37, 2, 13, 4);
INSERT INTO store_entity (id, amount, product_id, store_id)
      VALUES (38, 1, 15, 4);
      
-- Add user orders
INSERT INTO user_order (id, address, city, code, date, note, status, user_id)
   VALUES (1, 'Mostovska 17', 'Komarno', '85401', TIMESTAMP '2020-04-17 16:05:06',
           'Poprosim o rychlu dodavku.', 1, 10);
INSERT INTO user_order (id, address, city, code, date, note, status, user_id)
   VALUES (2, 'Mostovska 17', 'Komarno', '85401', TIMESTAMP '2020-04-18 17:10:56',
           '', 2, 10);
INSERT INTO user_order (id, address, city, code, date, note, status, user_id)
   VALUES (3, 'Mostovska 17', 'Komarno', '85401', TIMESTAMP '2020-04-20 13:12:44',
           'K vyzdvihnutiu az od 30.04.2020.', 2, 10);
INSERT INTO user_order (id, address, city, code, date, note, status, user_id)
   VALUES (4, 'Razia c77', 'Sobrance', '41770', TIMESTAMP '2020-04-23 23:41:31',
           'Rychlo rychlo rychlo.', 3, 7);
INSERT INTO user_order (id, address, city, code, date, note, status, user_id)
   VALUES (5, 'Dolina ponikov', 'Nove Mesto nad Vahom', '10770',
           TIMESTAMP '2020-04-25 20:35:12', 'Dúfam, že nebudem sklamaný.', 4, 9);

-- Insert things that have been order into the order 
INSERT INTO user_order_item (id, amount, price, order_id, product_id)
   VALUES (1, 2, 5198.0, 1, 7);
INSERT INTO user_order_item (id, amount, price, order_id, product_id)
   VALUES (2, 1, 900.0, 2, 13);
INSERT INTO user_order_item (id, amount, price, order_id, product_id)
   VALUES (3, 1, 651.99, 3, 11);
INSERT INTO user_order_item (id, amount, price, order_id, product_id)
   VALUES (4, 10, 189.90, 4, 10);
INSERT INTO user_order_item (id, amount, price, order_id, product_id)
   VALUES (5, 2, 69.90, 5, 9);

-- Add claims on orders
INSERT INTO order_rma (id, date, note, status, user_id, order_id)
   VALUES (1, '2020-04-26 14:31:00',
           'Cakam uz pol dna od objednavky a este nic nedorazilo.', 1, 7, 4);
INSERT INTO order_rma (id, date, note, status, user_id, order_id)
   VALUES (2, '2020-04-20 17:53:40',
           'Iphone dorazil poskriabany.', 1, 10, 2);
