import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Assessment.css";

// Backend Endpoints
const API_GET = "http://localhost/project1/backend/api/get-questions.php";
const API_SAVE = "http://localhost/project1/backend/api/save-assessment.php";

// UI OPTIONS (Beautiful)
const OPTION_LABELS = [
  { ui: "Fully Implemented", value: "Yes" },
  { ui: "Partially Implemented", value: "Mostly" },
  { ui: "Planning to Implement", value: "Sometimes" },
  { ui: "Not Implemented", value: "No" }
];

export default function Assessment() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  // Load questions from backend
  useEffect(() => {
    axios
      .get(API_GET)
      .then((res) => {
        if (res.data.success) {
          setQuestions(res.data.questions);
        }
      })
      .catch((err) => console.error("Error loading questions:", err))
      .finally(() => setLoading(false));
  }, []);

  const allAnswered =
  questions.length > 0 &&
  questions.every(q => answers[q.id]);


  // Save answer
  const handleAnswer = (questionId, optionValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionValue, // SEND "Yes", "Mostly", "Sometimes", "No"
    }));
  };

  // Submit assessment
const handleSubmit = async () => {
  if (!allAnswered) {
    alert("Please answer all questions before submitting.");
    return;
  }

  try {
    const res = await axios.post(API_SAVE, { answers });

    if (res.data.success) {
      window.location.href = `/assessment-detail/${res.data.assessment_id}`;
    } else {
      alert("Submission failed.");
    }
  } catch (err) {
    console.error("Submission error:", err);
    alert("Error submitting assessment.");
  }
};


  // Progress bar %
  const progress = questions.length
    ? Math.round((Object.keys(answers).length / questions.length) * 100)
    : 0;

  return (
    <div className="assessment-container">
      {/* HEADER */}
      <div className="assessment-header">
        <h1>Security Assessment</h1>
        <p className="muted">Answer all questions to evaluate your security posture.</p>

        <div className="progress-box">
          <div className="progress-label">
            {Object.keys(answers).length} / {questions.length} answered
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* QUESTIONS */}
      <div className="question-list">
        {loading ? (
          <p>Loading questions...</p>
        ) : (
          questions.map((q) => (
            <div className="question-card" key={q.id}>
              <div className="q-category">{q.category_title}</div>
              <div className="q-text">{q.question_text}</div>

              <div className="option-group">
                {OPTION_LABELS.map((opt) => (
                  <button
                    key={opt.ui}
                    className={`option-btn ${
                      answers[q.id] === opt.value ? "selected" : ""
                    }`}
                    onClick={() => handleAnswer(q.id, opt.value)}
                  >
                    {opt.ui}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

{/* FINAL ACTION BUTTONS (END OF ASSESSMENT) */}


<div className="footer-bar">
<button
  className={`primary-btn ${!allAnswered ? "is-disabled" : ""}`}
  onClick={allAnswered ? handleSubmit : undefined}
>
  Submit Assessment
</button>


  <button
    className="outline-btn"
    onClick={() => (window.location.href = "/assessment-history")}
  >
    View Assessment History
  </button>
</div>

    </div>
  );
}
