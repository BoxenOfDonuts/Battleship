import './MessageBoard.css';

const MessageBoard = ({ message }) => {
  return (
    <div className="messages">
      <p>{message}</p>
    </div>
  );
};

export default MessageBoard;
