DROP TABLE SYS_USER cascade constraints;
DROP TABLE PHOTO cascade constraints;
DROP TABLE PROPERTY cascade constraints;
DROP TABLE LAND cascade constraints;

--SYS_USER table
--holds info of all system users
CREATE TABLE SYS_USER (
    ID NUMBER GENERATED by default on null as IDENTITY PRIMARY KEY ,
    EMAIL VARCHAR(320),
    FIRSTNAME VARCHAR(128),
    SURNAME VARCHAR(128)
);

--PHOTO table
--holds images for each of properties
CREATE TABLE PHOTO (
    ID NUMBER GENERATED by default on null as IDENTITY PRIMARY KEY,
    PROPERTY_ID int,
    IMAGE ORDSYS.ORDImage,
    IMAGE_SI ORDSYS.SI_StillImage,
    IMAGE_AC ORDSYS.SI_AverageColor,
    IMAGE_CH ORDSYS.SI_ColorHistogram,
    IMAGE_PC ORDSYS.SI_PositionalColor,
    IMAGE_TX ORDSYS.SI_Texture
);

--LAND table
--holds info on land containing properties
--SYS_USER - referencing SYS_USER table entry (land owner)
CREATE TABLE LAND (
    ID NUMBER GENERATED by default on null as IDENTITY PRIMARY KEY,
    GROUND_PLAN SDO_GEOMETRY,
    SYS_USER int,
    CATEGORY VARCHAR(20) CHECK( CATEGORY IN ('built-up-area', 'arable-land', 'nothing'))
);

--PROPERTY TABLE
--holds info on single property
--PHOTOS - (array) referencing PHOTO table entries (photos of property)
--LAND - referencing LAND table entry (location fo property)
--SYS_USER - referencing SYS_USER table entry (owner of property)
CREATE TABLE PROPERTY (
    ID NUMBER GENERATED by default on null as IDENTITY PRIMARY KEY,
    PROPERTY_TYPE VARCHAR(20) CHECK( PROPERTY_TYPE IN ('house','flat', 'hydrant', 'pipe')),
    GROUND_PLAN SDO_GEOMETRY
);
--TODO reference each element from array of elements ?
--ALTER TABLE PROPERTY
--ADD FOREIGN KEY (PHOTOS) REFERENCES PHOTO(ID);
ALTER TABLE PHOTO
ADD FOREIGN KEY (PROPERTY_ID) REFERENCES PROPERTY(ID);

ALTER TABLE LAND
ADD FOREIGN KEY (sys_user) REFERENCES Sys_User(ID);

CREATE OR REPLACE PROCEDURE image_generateAttributes(image_id IN int) IS
cursor c is select * from PHOTO WHERE ID = image_id for update;
si ORDSYS.SI_StillImage;
BEGIN
for cp in c loop
si := new SI_StillImage(cp.IMAGE.getContent( )) ;
update PHOTO p set IMAGE_SI = si ,
IMAGE_AC = SI_AverageColor( si ), IMAGE_CH = SI_ColorHistogram( si ) ,
IMAGE_PC = SI_PositionalColor( si ) , IMAGE_TX = SI_Texture( si )
where cp.ID = p.ID;
end loop ;
END;

DELETE FROM USER_SDO_GEOM_METADATA WHERE
	TABLE_NAME = 'LAND' AND COLUMN_NAME = 'GROUND_PLAN';
INSERT INTO USER_SDO_GEOM_METADATA VALUES (
	'LAND', 'GROUND_PLAN',
	SDO_DIM_ARRAY(SDO_DIM_ELEMENT('X', 0, 650, 0.01), SDO_DIM_ELEMENT('Y', 0, 650, 0.01)),
	NULL
);
CREATE INDEX SP_INDEX_land_geometry ON LAND ( GROUND_PLAN ) indextype is MDSYS.SPATIAL_INDEX ;
DROP INDEX SP_INDEX_land_geometry;

INSERT INTO Sys_User (EMAIL, FIRSTNAME, SURNAME)
VALUES ('xfirca00@stud.fit.vutbr.cz', 'Anton', 'Firc');

INSERT INTO Sys_User (EMAIL, FIRSTNAME, SURNAME)
VALUES ('xlapsa00@stud.fit.vutbr.cz', 'Tomáš', 'Lapšanský');
INSERT INTO SYS_USER (ID, EMAIL, FIRSTNAME, SURNAME) VALUES (21, 'test@test.test', 'firstName', 'surName');

INSERT INTO PROPERTY (ID, PROPERTY_TYPE, GROUND_PLAN) VALUES (1, 'pipe', {6002,null,null,{1,2,1},{39,135.5,585,136.5,589,380.5}});
INSERT INTO PROPERTY (ID, PROPERTY_TYPE, GROUND_PLAN) VALUES (2, 'pipe', {6002,null,null,{1,2,1},{39,212.5,407,211.5,410,378.5}});
INSERT INTO PROPERTY (ID, PROPERTY_TYPE, GROUND_PLAN) VALUES (3, 'hydrant', {2001,1,{407,212.5,null},null,null});
INSERT INTO PROPERTY (ID, PROPERTY_TYPE, GROUND_PLAN) VALUES (4, 'hydrant', {2001,1,{586,138.5,null},null,null});
INSERT INTO PROPERTY (ID, PROPERTY_TYPE, GROUND_PLAN) VALUES (5, 'house', {2003,null,null,{1,1003,3},{113.5,112.5,138.5,137.5}});
INSERT INTO PROPERTY (ID, PROPERTY_TYPE, GROUND_PLAN) VALUES (6, 'house', {2003,null,null,{1,1003,3},{354,89,404,139}});
INSERT INTO PROPERTY (ID, PROPERTY_TYPE, GROUND_PLAN) VALUES (7, 'house', {2003,null,null,{1,1003,3},{329,208,389,258}});
INSERT INTO PROPERTY (ID, PROPERTY_TYPE, GROUND_PLAN) VALUES (8, 'flat', {2003,null,null,{1,1003,3},{204.5,209.5,229.5,234.5}});
INSERT INTO PROPERTY (ID, PROPERTY_TYPE, GROUND_PLAN) VALUES (9, 'flat', {2003,null,null,{1,1003,3},{165.5,209.5,190.5,234.5}});
INSERT INTO PROPERTY (ID, PROPERTY_TYPE, GROUND_PLAN) VALUES (10, 'flat', {2003,null,null,{1,1003,3},{127.5,209.5,152.5,234.5}});

INSERT INTO LAND (ID, GROUND_PLAN, SYS_USER, CATEGORY) VALUES (1, {2003,null,null,{1,1003,3},{50,50,150,150}}, 2, 'built-up-area');
INSERT INTO LAND (ID, GROUND_PLAN, SYS_USER, CATEGORY) VALUES (3, {2003,null,null,{1,1003,3},{210,50,310,150}}, 2, 'arable-land');
INSERT INTO LAND (ID, GROUND_PLAN, SYS_USER, CATEGORY) VALUES (2, {2003,null,null,{1,1003,3},{155,50,205,150}}, 1, 'built-up-area');
INSERT INTO LAND (ID, GROUND_PLAN, SYS_USER, CATEGORY) VALUES (4, {2003,null,null,{1,1003,3},{315,50,415,150}}, 2, 'built-up-area');
INSERT INTO LAND (ID, GROUND_PLAN, SYS_USER, CATEGORY) VALUES (5, {2003,null,null,{1,1003,3},{415,50,515,150}}, 1, 'arable-land');
INSERT INTO LAND (ID, GROUND_PLAN, SYS_USER, CATEGORY) VALUES (6, {2003,null,null,{1,1003,3},{50,200,250,250}}, 2, 'built-up-area');
INSERT INTO LAND (ID, GROUND_PLAN, SYS_USER, CATEGORY) VALUES (7, {2003,null,null,{1,1003,3},{50,260,250,300}}, 1, 'arable-land');
INSERT INTO LAND (ID, GROUND_PLAN, SYS_USER, CATEGORY) VALUES (8, {2003,null,null,{1,1003,3},{260,200,400,300}}, 21, 'built-up-area');
INSERT INTO LAND (ID, GROUND_PLAN, SYS_USER, CATEGORY) VALUES (9, {2003,null,null,{1,1003,3},{500,200,600,300}}, 2, 'nothing');

