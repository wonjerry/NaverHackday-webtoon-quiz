package com.webtoonquiz.vo;

import com.webtoonquiz.model.Quiz;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizVO {
    private String[] option;
    private Quiz quiz;
 }
