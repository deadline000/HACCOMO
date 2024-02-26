import React, {useState} from 'react';

const Notice = () => {

    const [text, setText] = useState("공지사항입니다.");
    
  return (
    
        <div className='content_body'>
            <div>{text}</div>
        </div>

  );
};

export default Notice;