import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReceivedMessage from './ReceivedMessage';
import SendMessage from './SendMessage';
import SentMessage from './SentMessage';
import { FiInbox, FiSend, FiMail } from 'react-icons/fi';
import { SMessageWrapper, SMessageBox, } from '../../styles/pages/SMessage';
import { ModalOverlay } from '../../styles/SCommon';

const MessageBox = ({massageView,setMassageView}) => {
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
      <div>
        <h3>메시지함</h3>
        <div>
          <FiInbox
            onClick={() => SetselectFunction(1)}
            style={{ cursor: 'pointer', marginRight: '10px' }}
          />
          <FiMail
            onClick={() => SetselectFunction(2)}
            style={{ cursor: 'pointer', marginRight: '10px' }}
          />
          <FiSend
            onClick={() => SetselectFunction(3)}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <SMessageBox>
          {renderComponent()}
        </SMessageBox>
      </div>
    </SMessageWrapper>
    </ModalOverlay>

  );
};

export default MessageBox;
