package com.webtoonquiz.model;
import lombok.Data;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;
import javax.persistence.*;

@Data
@Entity
@Table(name = "Round")
public class Round {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="id")
  int id;

  @Column(name="startTime")
  Timestamp time;

}
