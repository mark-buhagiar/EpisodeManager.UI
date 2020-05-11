import React from 'react';

const Message: React.FC = (): JSX.Element => {
    return (
        <div className="message">
            Hello! Welcome to Episode Manager 2.0. Everything here is very much still a work in progress, so if you run
            into any issues or have any feedback, please get in touch <a href="mailto:markbuh25@gmail.com">here</a>. To
            set up your shows, please visit your profile page. If you need help remembering what you were subscribed to,
            get in touch and I will forward you your list 😊.
        </div>
    );
};

export default Message;
