package com.webtoonquiz.model;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Entity
@Table(name = "Quiz")
public class Quiz {

//  @Builder
//  public Quiz(int id ,String title , String description, byte[] img, String type , int roundId ) {
//    this.id =id;
//    this.title =title;
//    this.description =description;
//    this.img = img;
//    this.type = type ;
//    this.roundId = roundId;
//  }

	@Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	int id;

  @Column(name="title")
  String title;

  @Column(name="description")
   String description;

  @Basic(fetch = FetchType.LAZY)
  @Lob
  byte[] img;

  @Column(name="type")
   String type;

  @Column(name="roundId")
  int roundId;

}
