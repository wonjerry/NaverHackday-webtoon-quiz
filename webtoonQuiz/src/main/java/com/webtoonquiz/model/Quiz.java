package com.webtoonquiz.model;

import javax.persistence.*;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Entity
@Table(name = "Quiz")
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

	@Column(name = "title")
	protected String title;

	@Column(name = "description")
	protected String description;

	@Column(name = "type")
	protected String type;

	@Column(name = "roundId")
	protected int roundId;
	
	@Column(name = "num")
	protected int num;

	@Transient
	private MultipartFile file;
	
	@Column(name = "imageName")
	protected String imageName;
>>>>>>> master
}
