import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import BoardCard from "./BoardCard.js";
import {
  SHr,
  SEmpty,
  SBoardArticleCol,
  SBoardContainer,
} from "../../styles/pages/SCommunityPage";

const API_BASE_URL = "https://i9d201.p.ssafy.io/api/boards";

const CommunityBoard = () => {
  const user = useSelector((state) => state.users);
  const [boards, setBoards] = useState([]);
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/whole`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      const fetchedBoards = response.data.data.content;
      console.log(fetchedBoards);

      const fetchedTopics = Array.from(
        new Set(fetchedBoards.map((board) => board.classification)),
      );
      console.log(fetchedTopics);

      if (Array.isArray(fetchedBoards)) {
        setBoards(fetchedBoards);
        setTopic(fetchedTopics);
      } else {
        setBoards([]);
        setTopic(fetchedTopics);
      }
    } catch (error) {
      console.error(error);
      console.log("전체 게시글 조회 실패");
    }
  };

  return (
    <div>
      <SHr />
      <SEmpty />
      <SBoardContainer>
        {/* 각 classification에 해당하는 게시글을 분류하여 표시. */}
        {topic.map((classification, index) => (
          <SBoardArticleCol key={index}>
            <BoardCard
              key={classification}
              classification={classification}
              boards={boards}
            />
          </SBoardArticleCol>
        ))}
      </SBoardContainer>
    </div>
  );
};

export default CommunityBoard;
