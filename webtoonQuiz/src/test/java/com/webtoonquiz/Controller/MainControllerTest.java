package com.webtoonquiz.Controller;

import com.webtoonquiz.controller.MainController;
import com.webtoonquiz.model.OxQuiz;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MainControllerTest {
  private MockMvc mockMvc;

  @Autowired
  MainController mainController;

  OxQuiz testOxQuiz = OxQuiz.builder()
    .title("제목제목")
    .description("내용내용")
    .roundId(1)
    .type("ox")
    .solution(1)
    .build();
  @Before
  public void setUp() throws Exception{
    mockMvc= MockMvcBuilders.standaloneSetup(mainController).build();
  }
  @Test
  public void getQuizzes() throws Exception{
      mockMvc.perform(get("/api/quizzes")).andDo(print());
  }

  @Test
  public void getOxQuizzes() throws Exception{
    mockMvc.perform(get("/api/oxQuizzes")).andDo(print());
  }

  @Test
  public void getOptionQuizzes() throws Exception{
    mockMvc.perform(get("/api/optionQuizzes")).andDo(print());
  }

//  @Test
//  public void createOxQuizzes() throws Exception{
//    mockMvc.perform(post("/api/oxQuiz")
//     .contextPath("")
//    ).andExpect(status().isOk());
//  }

}
