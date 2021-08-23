SET IDENTITY_INSERT [dbo].[Agencije] ON
GO
INSERT INTO [TuristickaAgencija].[dbo].[Agencije] (ID, naziv, adresa, kontakTelefon, vlasnik) VALUES (3,'Travel with us','Marka Popovica  br. 21 Nis','0610210315','Teodor Markovic');
GO
SET IDENTITY_INSERT [dbo].[Agencije] OFF
GO


SET IDENTITY_INSERT [dbo].[Aranzmani] ON
GO
INSERT INTO [TuristickaAgencija].[dbo].[Aranzmani] (ID, brojMesta, naziv, cena, slika, datumPolaska, datumPovratka, tip, brojDana, brojZauzetihMesta, agencijaID) VALUES (1, 10,'Stavros', 150,'Stavros','2021-07-29 11:32:20.6380000','2021-08-05 11:32:20.6380000','letovanje',6,0,3);
GO
SET IDENTITY_INSERT [dbo].[Aranzmani] OFF
GO

SET IDENTITY_INSERT [dbo].[Aranzmani] ON
GO
INSERT INTO [TuristickaAgencija].[dbo].[Aranzmani] (ID, brojMesta, naziv, cena, slika, datumPolaska, datumPovratka, tip, brojDana, brojZauzetihMesta, agencijaID) VALUES (1, 20,'Atina', 200,'Atina','2021-07-29 11:32:20.6380000','2021-08-05 11:32:20.6380000','letovanje',7,0,3);
GO
SET IDENTITY_INSERT [dbo].[Aranzmani] OFF
GO

SET IDENTITY_INSERT [dbo].[Aranzmani] ON
GO
INSERT INTO [TuristickaAgencija].[dbo].[Aranzmani] (ID, brojMesta, naziv, cena, slika, datumPolaska, datumPovratka, tip, brojDana, brojZauzetihMesta, agencijaID) VALUES (1, 5,'Dubai', 250,'Dubai','2021-07-28 11:32:20.6380000','2021-08-05 11:32:20.6380000','letovanje',10,0,3);
GO
SET IDENTITY_INSERT [dbo].[Aranzmani] OFF
GO

SET IDENTITY_INSERT [dbo].[Aranzmani] ON
GO
INSERT INTO [TuristickaAgencija].[dbo].[Aranzmani] (ID, brojMesta, naziv, cena, slika, datumPolaska, datumPovratka, tip, brojDana, brojZauzetihMesta, agencijaID) VALUES (1, 5,'Hurgada', 350,'Hurgada','2021-07-30 11:32:20.6380000','2021-08-05 11:32:20.6380000','letovanje',6,0,3);
GO
SET IDENTITY_INSERT [dbo].[Aranzmani] OFF
GO


