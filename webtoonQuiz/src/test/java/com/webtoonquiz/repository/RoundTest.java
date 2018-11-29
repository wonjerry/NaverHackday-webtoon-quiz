package com.webtoonquiz.repository;

import com.webtoonquiz.repo.RoundRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
public class RoundTest {
  @Autowired
  RoundRepository roundRepository;

  @Test
  public void getAllRoundTest(){
    System.out.println(roundRepository.findAll());
  }
  @Test
  public void countRoundTest(){
    System.out.println(roundRepository.count());
    System.out.println(roundRepository.findAll());

  }

}
