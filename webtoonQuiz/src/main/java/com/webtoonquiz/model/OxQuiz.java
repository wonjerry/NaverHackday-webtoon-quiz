package com.webtoonquiz.model;

import java.io.Serializable;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import lombok.*;


@Data
@EqualsAndHashCode(callSuper=true)
@Entity
@Table(name = "OxQuiz")
public class OxQuiz extends Quiz{

  @Builder
  public OxQuiz(String title , String description, byte[] img, String type , int roundId ,int solution ) {
    super.title =title;
    super.description =description;
    super.img = img;
    super.type = type ;
    super.roundId = roundId;
    this.solution =solution;
  }

	@Column(name="solution")
	 int solution;
}
