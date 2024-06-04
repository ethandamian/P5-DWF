INSERT INTO category(category_id,category,acronym,status) VALUES
 (1,'Yaoi','YI',0)
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
 (15,1,'1//img_1714001069863.png',0)
,(16,1,'1//img_1714001080369.png',0)
,(17,1,'1//img_1714001583530.png',0)
,(18,3,'3//img_1714003002832.png',0)
,(19,3,'3//img_1714004419105.png',0)
,(20,3,'3//img_1714004481373.png',0)
,(21,1,'1//img_1715024125109.png',1)
,(22,3,'3//img_1715024218879.png',0)
,(23,3,'3//img_1715024271717.png',0)
,(24,3,'3//img_1715024299375.png',1)
,(25,2,'2//img_1715024340867.png',1)
,(26,4,'4//img_1715026247761.png',0)
,(27,4,'4//img_1715026335613.png',1)
,(28,5,'5//img_1715043789241.png',1)
,(29,1,'1//img_1715283093004.png',1)
,(30,6,'6//img_1717471352673.png',1)
,(31,8,'8//img_1717471798904.png',1)
,(32,8,'8//img_1717471847288.png',1)
,(33,9,'9//img_1717472042316.png',1)
,(34,10,'10//img_1717472278816.png',1)
,(35,11,'11//img_1717474082909.png',1)
,(36,11,'11//img_1717474101978.png',1)
,(37,12,'12//img_1717474383859.png',1)
,(38,13,'13//img_1717474776868.png',1);


INSERT INTO product(product_id,gtin,product,description,price,stock,category_id,status,FIELD9,FIELD10,FIELD11,FIELD12) VALUES
 (1,7506584236987,'Chainsaw Man 14','Asa chooses an aquarium for the date with Denji! She plans to make the boy fall completely in love with her to turn him into a weapon, although he only wants to see the penguins. They have a small altercation between them when suddenly a demon that Denji knows very well appears! This nightmarish date seems to have no end, but it ends unexpectedly!','150','25','3','1',NULL,NULL,NULL,NULL)
,(2,7503216584688,'Jujutsu Kaisen 22','In the Sakurajima colony, an unknown cursed spirit suddenly appears flying at high speed! And he turns out to be an individual whose hatred and grudge towards Maki causes him to be reincarnated as a curse to get revenge on her! Maki and Noritoshi find themselves on the ropes at the surprising speed with which this curse evolves from a cursed fetus to a mature aberration. But then some new players enter the fray!','149','40','3','1',NULL,NULL,NULL,NULL)
,(3,7506584236988,'Jujutsu Kaisen 0','Yuta Okkotsu is a high school student possessed by Rika, a cursed spirit. After causing an incident with some classmates, Satoru Gojo decides to bring him to the Tokyo Witchcraft Technical High School to learn how to control the curse. He makes friends with his first-year classmates, Maki, Toge and Panda, with whom he learns to exorcise curses. But, suddenly, Suguru Geto, an evil sorcerer, appears with the intention of taking over Rika, Yuta''s curse.','119','4','3','1',NULL,NULL,NULL,NULL)
,(4,7506584236989,'shingeki no kyojin 17','A historic event occurred outside the walls: a titan was defeated thanks to the Three-Dimensional Maneuver Team! However, this feat does not change the circumstances of the Research Corps: almost all of its members have been devoured and there are two titans, one of them ten meters tall, lurking nearby. While Rosa and the others try to come up with a strategy, Kuklo finds Xavi, who intends to kill him using the device. Don''t miss the latest issue of this story!','99','56','3','1',NULL,NULL,NULL,NULL)
,(5,7506584236990,'The boys 11','Billy Butcher is on the brink of avenging his wife''s murder, targeting Homelander. As Homelander leads an army of superheroes against the U.S., the final battle erupts in the White House. The Boys are ready: Frenchie and the Female unleash their fury, Hughie faces his fears, and M.M. races to uncover Vought-American''s darkest secret. Butcher, driven and fearless, plunges into the heart of danger, facing a nightmarish reality beyond his worst dreams. The stage is set for an epic and devastating showdown.','220','45','7','1',NULL,NULL,NULL,NULL)
,(6,7506584236999,'Tsukimichi: Moonlit Fantasy','Makoto Misumi was enjoying a normal life until one day he discovers his parents were originally from an alternate world, and were only allowed to escape if they sent one of their children back to their home world. Makoto is chosen and given special abilities by the god Tsukuyomi, but when he arrives in the new world, he discovers their goddess wants nothing to do with him because of his','he''s forced to live among the demi-humans','where he gradually builds a life for himself and those around him. "','129','5',6,1,NULL,NULL)
,(8,7506584236991,'Arata Kangatari 1','In a world where humans and gods coexist, Arata is the unfortunate successor to the matriarchal Hime Clan – unfortunate because if he’s not cross-dressing to hide his gender one minute, he’s fleeing for his life the next! When Arata winds up in the modern world and switches place with a boy named Arata Hinohara, it’s a wonder which Arata’s actually better off… Hinohara is the spitting image of Arata, so he suddenly finds himself fighting people after his life!','140','6','6','1',NULL,NULL,NULL,NULL)
,(9,7506584236993,'Wotaku ni Koi wa Muzukashi','Narumi Momose has had it rough: Every boyfriend she''s had dumped her once they found out she was an otaku, so she''s gone to great lengths to hide it. When a chance meeting at her new job with childhood friend, fellow otaku, and now coworker Hirotaka Nifuji almost gets her secret outed at work, she comes up with a plan to make sure he never speaks up. But he comes up with a counter-proposal: Why doesn''t she just date him instead?','150','6','5','1',NULL,NULL,NULL,NULL)
,(10,7506584236994,'Kuragehime 5','THE BUSINESS OF LOVE With the help of Amars and their savvy new ally Nisha, Tsukimi’s jellyfish designs are slowly taking shape as a real clothing line. There’s no time to waste if the group wants to save Amamizukan and make a splash in the fashion world, and that means churning out new dresses—and fast! As if Tsukimi weren’t already overwhelmed, Shu makes it clear that he’s ready to make a romantic commitment to her. For a geek girl who’s never even had a boyfriend, these advances may be too much to handle.','120','18','5','1',NULL,NULL,NULL,NULL)
,(11,7506584236995,'Doraemon 4','Doraemon Volume 4','Doraemon','who comes from the 22nd century. This volume','titled "I''m the Wolf Man','includes selected stories from the mid-1970s, featuring gadgets from Doraemon''s fourth-dimensional pocket that often lead to humorous and unpredictable situations.',130,6,8,1)
,(12,7506584236996,'Yotsuba! 4','Discover one of the funniest series by the author of','which has been a hit in its home country and the US market. Yotsuba is determined to bring joy to everyone around her: her dad and his friend Jumbo, the three sisters next door, or anyone she meets on the street. Join Yotsuba and her friends and discover that the world can be seen in a different light.','400','7','8',1,NULL,NULL,NULL)
,(13,7506584236997,'AVENGERS (2023) #11','To survive their time-traveling odyssey, the Avengers will need help from all eras: from the Viking Age Thor to the T. Rex Starbrand from the dawn of existence, including all the forgotten heroes whose origins will finally be revealed. The pillars are set, bringing together the most important Avengers from all history and the Multiverse. However, a Tony Stark is missing. The only person available to take his place is a man the size of an ant, with a very big problem.','79','35','7','1',NULL,NULL,NULL,NULL);

