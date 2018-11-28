package com.webtoonquiz.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import com.webtoonquiz.model.Round;

public interface RoundRepository extends JpaRepository<Round, Long> {

}
