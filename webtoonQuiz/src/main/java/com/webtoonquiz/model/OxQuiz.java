package com.webtoonquiz.model;

import java.io.Serializable;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Data
@EqualsAndHashCode(callSuper=true)
@Entity
@Table(name = "OxQuiz")
public class OxQuiz extends Quiz{

	@Column(name="solution")
	 int solution;
}
