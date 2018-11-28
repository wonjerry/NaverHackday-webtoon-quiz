package com.webtoonquiz.service;

import com.webtoonquiz.model.OptionQuiz;
import com.webtoonquiz.model.OxQuiz;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@SpringBootTest
public class QuizServiceTest {
  private MockMvc mockMvc;

  @Autowired
  QuizService quizService;

  OxQuiz testOxQuiz = OxQuiz.builder()
    .title("제목제목")
    .description("내용내용")
    .roundId(1)
    .type("ox")
    .solution(1)
    .build();

  OptionQuiz testOptionQuiz = OptionQuiz.builder()
    .title("제목제목")
    .description("내용내용")
    .roundId(1)
    .type("option")
    .solution(3)
    .optionOne("1번 답")
    .optionTwo("2번 답")
    .optionThree("3번 답")
    .build();

  @Test
  public void getAllQuizServiceTest(){
    quizService.getAllQuizzes();
  }

  @Test
  public void createOxQuizServiceTest(){
      quizService.CreateOxQuiz(testOxQuiz);
  }

  @Test
  public void createOptionQuizServiceTest(){
    quizService.CreateOptionQuiz(testOptionQuiz);
  }
}
