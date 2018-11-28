package com.webtoonquiz.service;

import com.webtoonquiz.model.Quiz;
import com.webtoonquiz.model.Round;
import com.webtoonquiz.repo.RoundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoundService {
    @Autowired
    RoundRepository roundRepository;

    public List<Round> getRounds() {
        return roundRepository.findAll();
    }
}
