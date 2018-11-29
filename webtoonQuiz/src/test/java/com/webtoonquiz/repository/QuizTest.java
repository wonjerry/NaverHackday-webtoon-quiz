package com.webtoonquiz.repository;


import com.webtoonquiz.model.OptionQuiz;
import com.webtoonquiz.model.OxQuiz;
import com.webtoonquiz.model.Quiz;
import com.webtoonquiz.repo.OxQuizRepository;
import com.webtoonquiz.repo.QuizRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
public class QuizTest {
  @Autowired
  QuizRepository quizRepository;
  OxQuizRepository oxQuizRepository;

  OxQuiz testOxQuiz = OxQuiz.builder()
    .title("제목제목")
    .description("내용내용")
    .roundId(1)
    .type("ox")
    .solution(1)
    .build();

  OptionQuiz testOptionQuiz = OptionQuiz.builder()
    .title("제목입니다.")
    .description("내용내용")
    .roundId(3)
    .type("option")
    .solution(3)
    .optionOne("1번 문제")
    .optionTwo("2번 문제")
    .optionThree("3번 문제")
    .build();


  Quiz testQuiz = new Quiz();

  @Test
    public void createOxQuizTest(){
       quizRepository.save(testOxQuiz);
    }

  @Test
  public void createOptionQuizTest(){
      quizRepository.save(testOptionQuiz);
  }

  @Test
  public void findAllRoundIdQuizTest(){
    System.out.println(quizRepository.findAllByRoundIdOrderById(1));
    System.out.println(quizRepository.findAllByRoundIdOrderById(2));
    System.out.println(quizRepository.findAll());

  }

}
