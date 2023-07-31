package com.ssafy.crit.challenge.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


import lombok.*;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChallengeCategory {

    @Id
    @GeneratedValue
    @Column(name = "category_challenge_id")
    private Long id;

    private String species;
}
