interface LetterImageProps {
  words: string;
}

const LetterImage = ({ words }: LetterImageProps) => {
  return (
    <span className="letter-image">
      {words[0].toUpperCase()}
      {words[1].toUpperCase()}
    </span>
  );
};
export default LetterImage;
