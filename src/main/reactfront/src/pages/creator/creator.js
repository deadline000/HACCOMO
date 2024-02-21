import React, {useState} from 'react';

const Creator = () => {

    const [text, setText] = useState("크리에이터 프로필 화면입니다.");
    
  return (
    
        <div className='content_body'>
            <div>{text}</div>
        </div>

  );
};

export default Creator;