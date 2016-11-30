
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
 `name` varchar(30) NOT NULL COMMENT '登录名',
 `password` varchar(30) NOT NULL COMMENT '登录密码',
 `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
 `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '更新时间',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
 `subject` varchar(50) NOT NULL COMMENT '文章标题',
 `content` varchar(30) NOT NULL COMMENT '文章内容',
 `user_id` int(11) unsigned NOT NULL COMMENT '所属用户',
 `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
 `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '更新时间',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文章表';

-- ALTER TABLE `posts` ADD CONSTRAINT user_id_fk FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
 `name` varchar(50) NOT NULL COMMENT '标签名称',
 `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
 `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '更新时间',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='标签表';

DROP TABLE IF EXISTS `posts_tags`;
CREATE TABLE `posts_tags` (
 `post_id` int(11) unsigned NOT NULL COMMENT '文章ID',
 `tag_id` varchar(50) NOT NULL COMMENT '标签ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文章标签关联表';


INSERT INTO `users` (`name`, `password`)
VALUES
  ('钟志1', '123456'),
  ('钟志2', '123456'),
  ('钟志3', '123456'),
  ('钟志4', '123456'),
  ('钟志5', '123456'),
  ('钟志6', '123456'),
  ('钟志7', '123456'),
  ('钟志8', '123456'),
  ('钟志9', '123456'),
  ('钟志10', '123456'),
  ('钟志11', '123456'),
  ('zhongzhi', '123456');

INSERT INTO `posts` (`subject`, `content`, `user_id`)
VALUES
  ('文章1', '内容1', 1),
  ('文章2', '内容2', 2),
  ('文章3', '内容3', 2),
  ('文章4', '内容4', 2),
  ('文章5', '内容5', 1),
  ('文章6', '内容6', 4),
  ('文章7', '内容7', 4),
  ('文章8', '内容8', 1),
  ('文章9', '内容9', 1),
  ('文章10', '内容10', 1),
  ('文章11', '内容11', 1),
  ('文章12', '内容12', 1);

  INSERT INTO `tags` (`name`)
  VALUES
    ('JavaScript'),
    ('CSS'),
    ('React'),
    ('jQuery');

  INSERT INTO `posts_tags` (`post_id`, `tag_id`)
  VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 4),
    (6, 3),
    (7, 4),
    (8, 2),
    (9, 1),
    (10, 1),
    (11, 1),
    (12, 1),
    (1, 4),
    (2, 4),
    (1, 3);
