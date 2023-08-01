package com.ssafy.crit.boards.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.ssafy.crit.boards.entity.board.Board;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Entity
public class Classification {

    @Id
    @GeneratedValue
    private Long id;

    private String category;

    @OneToMany(mappedBy = "classification")
    private List<Board> board;

    @Builder
    Classification(Long id, String category, List<Board> board) {
        this.id = id;
        this.category = category;
        this.board = board;
    }

    public void setCategory(String classification) {
        this.category = classification;
    }
}
