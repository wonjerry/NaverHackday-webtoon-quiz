INSERT INTO `webtoonquiz`.`quiz` (`quiz_id`, `round`, `num`, `description`, `showtime`, `type` ) VALUES ('1', '1', '1','다음 중 다른 종류 인 것은?', '20181126101010', 'option');
INSERT INTO `webtoonquiz`.`option_quiz` (`option_four`, `option_one`, `option_three`, `option_two`, `solution`, `quiz_id`) VALUES ('감', '배', '사과', '배추', '4', '1');

INSERT INTO `webtoonquiz`.`quiz` (`quiz_id`, `round`, `num`, `description`, `showtime`, `type` ) VALUES ('2', '1', '2','다음 중 다른 종류 인 것은?', '20181126101010', 'option');
INSERT INTO `webtoonquiz`.`option_quiz` (`option_four`, `option_one`, `option_three`, `option_two`, `solution`, `quiz_id`) VALUES ('원숭이', '강아지', '고양이', '선인장', '4', '2');

INSERT INTO `webtoonquiz`.`quiz` (`quiz_id`, `round`, `num`, `description`, `showtime`, `type` ) VALUES ('3', '1', '3','다음 중 다른 종류 인 것은?', '20181126101010', 'option');
INSERT INTO `webtoonquiz`.`option_quiz` (`option_four`, `option_one`, `option_three`, `option_two`, `solution`, `quiz_id`) VALUES ('상어', '기린', '광어', '오징어', '2', '3');

INSERT INTO `webtoonquiz`.`quiz` (`quiz_id`, `round`, `num`, `description`, `showtime`, `type` ) VALUES ('4', '1', '4','웹툰은 재밌다.', '20181126101010', 'ox');
INSERT INTO `webtoonquiz`.`ox_quiz` (`solution`, `quiz_id`) VALUES ('1','4');

