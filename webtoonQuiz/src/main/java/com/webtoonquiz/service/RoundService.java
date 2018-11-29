package com.webtoonquiz.service;

import com.webtoonquiz.model.OptionQuiz;
import com.webtoonquiz.model.Quiz;
import com.webtoonquiz.model.Round;
import com.webtoonquiz.repo.RoundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;
import java.util.Timer;

@Service
public class RoundService {
    @Autowired
    RoundRepository roundRepository;

    public List<Round> getRounds() {
        return roundRepository.findAll();
    }

    @Transactional
    public ResponseEntity<Timestamp> LastRoundStart(){
        List<Round> round = roundRepository.findAllByOrderByIdDesc();
        return ResponseEntity.ok(round.get(0).getTime());
    }
}
