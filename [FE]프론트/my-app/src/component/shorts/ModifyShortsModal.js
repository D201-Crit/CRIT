import React, { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api/api";
import { SModifyModal } from "../../styles/pages/SMainPage";
import { SMessageBox, SInput, SSubmitButton, SInputContext, SForm } from "../../styles/pages/SMessage";
const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/shorts';

const ModifyShortsModal = ({ setModifyModal, prevshotrs, shortId, getShort }) => {
  const user = useSelector((state) => state.users);
  const [shorts, setShots] = useState(prevshotrs);

  const modifyShorts = (e,setIsEditOpen) => {
    e.preventDefault();
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
    <SModifyModal>
    <div>
      <SForm onSubmit={modifyShorts}>
        <SInput
          name="title"
          type="text"
          value={shorts.title}
          onChange={handleShotsChange}
        ></SInput>
        <SInputContext
          name="content"
          type="textarea"
          value={shorts.content}
          onChange={handleShotsChange}
        ></SInputContext>
        <SSubmitButton type="submit" value={"작성완료"}></SSubmitButton>
      </SForm>
    </div>
    </SModifyModal>
  );
};
export default ModifyShortsModal;

