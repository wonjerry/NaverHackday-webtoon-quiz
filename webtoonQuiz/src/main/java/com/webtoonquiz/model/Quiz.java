package com.webtoonquiz.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Min;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Entity
@Table(name = "Quiz")
@NoArgsConstructor
public class Quiz {

	@Id
<<<<<<< HEAD
  @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	int id;

  @Column(name="title")
  String title;

  @Column(name="description")
   String description;

    @Column(name="imageName")
    String img;

    @Column(name="num")
    int num;

    @Column(name="type")
   String type;

  @Column(name="roundId")
  int roundId;

=======
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	protected int id;

	@NotEmpty(message="주제 빈 칸을 채워주세요.")
	@Column(name = "title")
	protected String title;

	@NotEmpty(message="문제 설명 빈 칸을 채워주세요.")
	@Column(name = "description")
	protected String description;

	@Column(name = "type")
	protected String type;

	@Column(name = "roundId")
	protected int roundId;
	
	@Min(value=0, message="The product price must not be less than zero")
	@Column(name = "num")
	protected int num;

	@Transient
	private MultipartFile file;
	
	@Column(name = "imageName")
	protected String imageName;
>>>>>>> master
}
