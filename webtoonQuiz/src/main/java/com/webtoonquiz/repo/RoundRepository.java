package com.webtoonquiz.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import com.webtoonquiz.model.Round;

import java.util.List;

public interface RoundRepository extends JpaRepository<Round, Long> {

  Round findById(int id);

  List<Round> findAllByOrderByIdDesc();
}
