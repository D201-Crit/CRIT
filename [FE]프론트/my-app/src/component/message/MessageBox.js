import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReceivedMessage from './ReceivedMessage';
import SendMessage from './SendMessage';
import SentMessage from './SentMessage';
import { FiInbox, FiSend, FiMail } from 'react-icons/fi';
import { SMessageWrapper, SMessageBox, StyledInbox, StyledMail, StyledSent, IconContainer } from '../../styles/pages/SMessage';
import { ModalOverlay } from '../../styles/SCommon';



const MessageBox = ({ massageView, setMassageView }) => {
  const user = useSelector((state) => state.users);
  const [selectFunction, SetselectFunction] = useState(1);
  
  const renderComponent = () => {
    switch (selectFunction) {
      case 1:
        return <ReceivedMessage />;
      case 2:
        return <SentMessage />;
      case 3:
        return <SendMessage />;
      default:
        return null;
    }
  };
  const handleOutsideClick = (e) => {
    if (e.target.getAttribute('data-cy') === "modal-overlay") {
      setMassageView(false);
    }
  };

  return (
    <ModalOverlay onClick={handleOutsideClick} data-cy="modal-overlay">
      <SMessageWrapper>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <h2 style={{ position: 'absolute', margin: '30px 40px', color: '#1877f2' }}>메시지함</h2>
          <IconContainer>
            <StyledInbox onClick={() => SetselectFunction(1)} />
            <StyledMail onClick={() => SetselectFunction(2)} />
            <StyledSent onClick={() => SetselectFunction(3)} />
          </IconContainer>
        </div>
        <SMessageBox>{renderComponent()}</SMessageBox>
      </SMessageWrapper>
    </ModalOverlay>
  );
};

export default MessageBox;
