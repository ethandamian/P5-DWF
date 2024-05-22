INSERT INTO category(category_id,category,acronym,status) VALUES
 (1,'Yaoi','YI',0)
,(2,'Relojes','Rls',1)
,(3,'Shonen','SHN',1)
,(4,'Shojo','SHJ',1)
,(5,'Josei','JSI',1)
,(6,'Isekai','ISK',1)
,(7,'Comics','CMCS',1)
,(8,'Kodomo','KDM',1)
,(9,'Seinen','SNN',1)
,(10,'Mecha','MCH',1)
,(11,'Mahou Sh','MS',1)
,(12,'Spokon','SPK',1);


INSERT INTO product_image(product_image_id,product_id,image,status) VALUES
(21,1,'1//img_1715024125109.png',1)
,(22,3,'3//img_1715024218879.png',0)
,(23,3,'3//img_1715024271717.png',0)
,(24,3,'3//img_1715024299375.png',1)
,(25,2,'2//img_1715024340867.png',1)
,(26,4,'4//img_1715026247761.png',0)
,(27,4,'4//img_1715026335613.png',1)
,(28,5,'5//img_1715043789241.png',1)
,(29,1,'1//img_1715283093004.png',1);

INSERT INTO product(product_id,gtin,product,description,price,stock,category_id,status) VALUES
 (1,7506584236987,'Chainsaw Man 14','Asa chooses an aquarium for the date with Denji! She plans to make the boy fall completely in love with her to turn him into a weapon, although he only wants to see the penguins. They have a small altercation between them when suddenly a demon that Denji knows very well appears! This nightmarish date seems to have no end, but it ends unexpectedly!',150,25,3,1)
,(2,7503216584688,'Jujutsu Kaisen 22','In the Sakurajima colony, an unknown cursed spirit suddenly appears flying at high speed! And he turns out to be an individual whose hatred and grudge towards Maki causes him to be reincarnated as a curse to get revenge on her! Maki and Noritoshi find themselves on the ropes at the surprising speed with which this curse evolves from a cursed fetus to a mature aberration. But then some new players enter the fray!',149,40,3,1)
,(3,7506584236988,'Jujutsu Kaisen 0','Yuta Okkotsu is a high school student possessed by Rika, a cursed spirit. After causing an incident with some classmates, Satoru Gojo decides to bring him to the Tokyo Witchcraft Technical High School to learn how to control the curse. He makes friends with his first-year classmates, Maki, Toge and Panda, with whom he learns to exorcise curses. But, suddenly, Suguru Geto, an evil sorcerer, appears with the intention of taking over Rika, Yuta''s curse.',119,4,3,1)
,(4,7506584236989,'shingeki no kyojin 17','A historic event occurred outside the walls: a titan was defeated thanks to the Three-Dimensional Maneuver Team! However, this feat does not change the circumstances of the Research Corps: almost all of its members have been devoured and there are two titans, one of them ten meters tall, lurking nearby. While Rosa and the others try to come up with a strategy, Kuklo finds Xavi, who intends to kill him using the device. Don''t miss the latest issue of this story!',99,56,3,1)
,(5,7506584236990,'The boys 11','Billy Butcher is on the brink of avenging his wife''s murder, targeting Homelander. As Homelander leads an army of superheroes against the U.S., the final battle erupts in the White House. The Boys are ready: Frenchie and the Female unleash their fury, Hughie faces his fears, and M.M. races to uncover Vought-American''s darkest secret. Butcher, driven and fearless, plunges into the heart of danger, facing a nightmarish reality beyond his worst dreams. The stage is set for an epic and devastating showdown.',220,45,7,1);


