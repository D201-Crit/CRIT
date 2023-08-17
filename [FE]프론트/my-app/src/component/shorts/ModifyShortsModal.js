import React, { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api/api";
import { SDividerLine, SSubmitButton2, SDetailModal, SForm2, SInput2, SInputContext2} from "../../styles/pages/SMainPage";
import { SMessageBox, SInput, SSubmitButton, SInputContext, SForm } from "../../styles/pages/SMessage";
const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/shorts';

const ModifyShortsModal = ({ setModifyModal, prevshotrs, shortId, getShort }) => {
  const user = useSelector((state) => state.users);
  const [shorts, setShots] = useState(prevshotrs);

  const modifyShorts = (e,setIsEditOpen) => {
    e.preventDefault();
    if(shorts.content.trim() === "" || shorts.title.trim() === ""){
      alert("제목과 내용을 작성해주세요.");
      return
    }
      api.put(`${API_BASE_URL}/${shortId}`,
      {
        title: shorts.title,
        content: shorts.content,
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then(() => {
        setModifyModal(false);
        getShort();
      })
      .catch((err)=>{
        console.log(err)
      });
  };

  
  const handleShotsChange = (event) => {
    const { name, value } = event.target;
    setShots({
      ...shorts,
      [name]: value,
    });
  };

  return (
    <SDetailModal>
    <h1 style={{color: "white" , padding:"20px"}}>숏챌 수정</h1>
    <SDividerLine/>
    <div>
      <SForm2 onSubmit={modifyShorts}>
        <SInput2
          name="title"
          type="text"
          value={shorts.title}
          onChange={handleShotsChange}
        ></SInput2>
        <SInputContext2
          name="content"
          type="textarea"
          value={shorts.content}
          onChange={handleShotsChange}
        ></SInputContext2>
        <SSubmitButton2 type="submit" value={"작성완료"}></SSubmitButton2>
      </SForm2>
    </div>
    </SDetailModal>
  );
};
export default ModifyShortsModal;

