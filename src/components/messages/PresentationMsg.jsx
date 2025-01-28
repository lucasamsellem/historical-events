import KeywordExamples from './KeywordExamples';

function PresentationMsg() {
  return (
    <div className="space-y-2 text-center">
      <p className="text-center font-medium">
        Enter a country, landmark, influential figure, or notable topic in the
        search bar to discover related historical events.
      </p>
      <KeywordExamples />
    </div>
  );
}

export default PresentationMsg;
