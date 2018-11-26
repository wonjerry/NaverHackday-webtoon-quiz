INSERT INTO `webtoonquiz`.`quiz` (`quiz_id`, `round`, `description`, `option_four`, `option_one`, `option_three`, `option_two`, `num`, `showtime`) VALUES ('1', '1' ,'다음 중 다른 종류 인 것은?', '감', '배', '사과', '배추', '1','20181126101010');
INSERT INTO `webtoonquiz`.`quiz` (`quiz_id`, `round`, `description`, `option_four`, `option_one`, `option_three`, `option_two`, `num`, `showtime`) VALUES ('2', '1' ,'다음 중 다른 종류 인 것은?', '원숭이', '강아지', '고양이', '선인장', '2','20201126101010');
INSERT INTO `webtoonquiz`.`quiz` (`quiz_id`, `round`, `description`, `option_four`, `option_one`, `option_three`, `option_two`, `num`, `showtime`) VALUES ('3', '1' ,'다음 중 다른 종류 인 것은?', '상어', '기린', '광어', '오징어', '3','20181126061010');

INSERT INTO `webtoonquiz`.`quiz` (`quiz_id`, `round`, `description`, `option_four`, `option_one`, `option_three`, `option_two`, `num`, `showtime`) VALUES ('4', '2' ,'다음 중 다른 종류 인 것은?', '감', '배', '사과', '배추', '1','20181126101010');
INSERT INTO `webtoonquiz`.`quiz` (`quiz_id`, `round`, `description`, `option_four`, `option_one`, `option_three`, `option_two`, `num`, `showtime`) VALUES ('5', '2' ,'다음 중 다른 종류 인 것은?', '원숭이', '강아지', '고양이', '선인장', '2','20201126101010');
INSERT INTO `webtoonquiz`.`quiz` (`quiz_id`, `round`, `description`, `option_four`, `option_one`, `option_three`, `option_two`, `num`, `showtime`) VALUES ('6', '2' ,'다음 중 다른 종류 인 것은?', '상어', '기린', '광어', '오징어', '3','20181126061010');

INSERT INTO `webtoonquiz`.`role` (`role_id`, `role`) VALUES ('1', 'ADMIN');
INSERT INTO `webtoonquiz`.`role` (`role_id`, `role`) VALUES ('2', 'USER');

INSERT INTO `webtoonquiz`.`user` (`user_id`, `active`, `email`, `name`, `password`) VALUES ('1', '1', 'admin@webtoonquiz.com', 'admin', 'admin');
INSERT INTO `webtoonquiz`.`user` (`user_id`, `active`, `email`, `name`, `password`) VALUES ('2', '1', 'user@naver.com', 'user', 'user');

INSERT INTO `webtoonquiz`.`user_role` (`user_id`, `roles_role_id`) VALUES ('1', '1');
INSERT INTO `webtoonquiz`.`user_role` (`user_id`, `roles_role_id`) VALUES ('2', '2');
