INSERT INTO anonymous_post.keyword (`user`,keyword) VALUES
     ('user1','apple'),
     ('user2','banana');

INSERT INTO anonymous_post.post (title,content,author,password,status,createdAt,updatedAt) VALUES
     ('post1','post1','user1','1234',0,'2022-07-01 15:06:13.004325000','2022-07-01 15:06:13.004325000'),
     ('post2','post2 banana','user1','1234',0,'2022-07-01 15:06:22.674394000','2022-07-01 15:06:22.674394000'),
     ('post3','post3 apple','user2','1234',0,'2022-07-01 15:06:32.392990000','2022-07-01 15:06:32.392990000');

INSERT INTO anonymous_post.comment (content,author,createdAt,`group`,step,groupOrder,postId,parentId) VALUES
     ('comment 1','user2','2022-07-01 15:07:43.147059000',1,0,0,1,NULL),
     ('comment 2','user2','2022-07-01 15:07:48.211765000',2,0,0,1,NULL),
     ('comment 1-1','user1','2022-07-01 15:07:59.820746000',1,1,1,1,1),
     ('comment 1-2','user2','2022-07-01 15:08:05.282581000',1,1,4,1,1),
     ('comment 1-2-1 banana','user1','2022-07-01 15:08:41.692348000',1,2,5,1,4),
     ('comment 1-2-2','user1','2022-07-01 15:08:49.538622000',1,2,6,1,4),
     ('comment 1-1-1','user2','2022-07-01 15:09:02.212339000',1,2,2,1,3),
     ('comment 1-1-2 apple','user2','2022-07-01 15:09:12.721243000',1,2,3,1,3);

INSERT INTO anonymous_post.notice (`user`,refId,`type`,keyword,status,createdAt) VALUES
     ('user2',2,0,'banana',0,'2022-07-01 15:06:22.686942000'),
     ('user1',3,0,'apple',0,'2022-07-01 15:06:32.413070000'),
     ('user2',5,1,'banana',0,'2022-07-01 15:08:41.705863000'),
     ('user1',8,1,'apple',0,'2022-07-01 15:09:12.736635000');
