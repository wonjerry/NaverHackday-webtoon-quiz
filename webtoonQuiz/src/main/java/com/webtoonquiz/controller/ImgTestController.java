package com.webtoonquiz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class ImgTestController {

  @RequestMapping(value={"/","img/index"})
  public String index(){
    return "img/index";
  }
}
