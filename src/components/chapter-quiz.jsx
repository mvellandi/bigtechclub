import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ChapterQuiz({ chapter }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const focusTarget = useRef(null);
  const questions = chapter.quiz;
  const complete = index === questions.length;
  const question = questions[index];
  const choices = question ? (index % 2 ? [question.distractor, question.correct] : [question.correct, question.distractor]) : [];

  useEffect(() => {
    if (index > 0) focusTarget.current?.focus();
  }, [index]);

  function checkAnswer(event) {
    event.preventDefault();
    const isCorrect = choices[Number(answer)] === question.correct;
    setCorrect(isCorrect);
    setChecked(true);
    if (isCorrect) setScore((value) => value + 1);
  }

  function nextQuestion() {
    setIndex((value) => value + 1);
    setAnswer(null);
    setChecked(false);
    setCorrect(false);
  }

  function reset() {
    setIndex(0);
    setAnswer(null);
    setChecked(false);
    setCorrect(false);
    setScore(0);
  }

  if (complete) {
    return (
      <div className="quiz">
        <p className="eyebrow">Knowledge check complete</p>
        <h3 ref={focusTarget} tabIndex={-1}>{score} of {questions.length} correct</h3>
        <p className="intro">Review the chapter whenever a question needs another look. Your score stays in this page view.</p>
        <div className="actions"><Button variant="outline" onClick={reset}><RotateCcw aria-hidden="true" />Try again</Button></div>
      </div>
    );
  }

  return (
    <form className="quiz" onSubmit={checkAnswer}>
      <p className="quiz-progress" ref={focusTarget} tabIndex={-1}>Question {index + 1} of {questions.length}</p>
      <fieldset disabled={checked}>
        <legend>{question.prompt}</legend>
        {choices.map((choice, choiceIndex) => (
          <label className="quiz-choice" key={choice}>
            <input type="radio" name={`question-${index}`} value={choiceIndex} required checked={answer === String(choiceIndex)} onChange={(event) => setAnswer(event.target.value)} />
            <span>{choice}</span>
          </label>
        ))}
      </fieldset>
      {checked && <p className="quiz-feedback" role="status"><strong>{correct ? 'Correct. ' : 'Review this one. '}</strong>{question.rationale}</p>}
      <div className="actions">
        {!checked ? <Button type="submit">Check answer</Button> : <Button type="button" onClick={nextQuestion} autoFocus>{index + 1 === questions.length ? 'See results' : 'Next question'}</Button>}
      </div>
    </form>
  );
}
