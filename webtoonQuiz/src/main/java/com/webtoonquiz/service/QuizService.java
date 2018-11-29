package com.webtoonquiz.service;

import java.util.ArrayList;
import java.util.List;

import com.webtoonquiz.model.OptionQuiz;
import com.webtoonquiz.model.OxQuiz;
import com.webtoonquiz.model.Round;
import com.webtoonquiz.repo.RoundRepository;
import com.webtoonquiz.vo.QuizVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.webtoonquiz.model.Quiz;
import com.webtoonquiz.repo.QuizRepository;

import javax.swing.text.html.ListView;
import javax.transaction.Transactional;

@Service
public class QuizService {

	@Autowired
	private QuizRepository quizRepository;

	@Autowired
    private RoundRepository roundRepository;

	public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
	}

<<<<<<< HEAD
    @Transactional
  public List<QuizVO> getLastRoundIdAllQuizzes() {
	  List<Round> round = roundRepository.findAllByOrderByIdDesc();

        List<QuizVO> quizVOList =new ArrayList<>();
        List<Quiz> quiz = quizRepository.findAllByRoundIdOrderById(round.get(0).getId());

        for(int i=0; i<quiz.size(); i++){
            QuizVO quizVO = new QuizVO();
            if(quiz.get(i).getType().equals("option")){
                quizVO.setQuiz(quiz.get(i));
                String[] temp = {((OptionQuiz)quiz.get(i)).getOptionOne(),
                        ((OptionQuiz)quiz.get(i)).getOptionTwo(),
                        ((OptionQuiz)quiz.get(i)).getOptionThree(),
                        ((OptionQuiz)quiz.get(i)).getOptionFour() };
                quizVO.setOption(temp);

            }
            else{
                quizVO.setQuiz(quiz.get(i));
            }
            quizVOList.add(quizVO);
        }
        return quizVOList;

  }


	public ResponseEntity<String> CreateOxQuiz(final OxQuiz oxQuiz){
    quizRepository.save(oxQuiz);
	  return ResponseEntity.ok("ox퀴즈 저장 완료");
  }


  public ResponseEntity<String> CreateOptionQuiz(final OptionQuiz optionQuiz){
    quizRepository.save(optionQuiz);
    return ResponseEntity.ok("객관식 퀴즈 저장 완료");
  }



=======
	public List<Quiz> getRoundIdAllQuizzes(int roundId) {
		return quizRepository.findAllByRoundIdOrderById(roundId);
	}

	@Transactional
	public ResponseEntity<String> CreateOxQuiz(final OxQuiz oxQuiz) {
		quizRepository.save(oxQuiz);
		return ResponseEntity.ok("ox퀴즈 저장 완료");
	}

	@Transactional
	public ResponseEntity<String> CreateOptionQuiz(final OptionQuiz optionQuiz) {
		quizRepository.save(optionQuiz);
		return ResponseEntity.ok("객관식 퀴즈 저장 완료");
	}
	
	public List<Quiz> getAllQuizs() {
		List<Quiz> list = new ArrayList<>();
		Iterable<Quiz> Quizs = quizRepository.findAll();

		Quizs.forEach(list::add);

		return list;
	}

	public synchronized boolean addQuiz(Quiz quiz) {
		List<Quiz> list = quizRepository.findByRoundIdAndNum(quiz.getRoundId(),quiz.getNum());
		if (list.size() > 0) {
			return false;
		} else {
			quizRepository.save(quiz);
			return true;
		}
	}
	
	public List<Quiz> findByRoundAndNumSQL(int round, int num) {
		return quizRepository.findByRoundIdAndNum(round, num);
	}
	
	public void updateQuiz(Quiz quiz) {
		quizRepository.save(quiz);
	}
	
	public void deleteQuiz(long quizId) {
		quizRepository.delete(quizId);
	}
>>>>>>> master
}
