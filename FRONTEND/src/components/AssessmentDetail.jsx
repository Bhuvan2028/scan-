import React, { useEffect, useState } from "react";
import axios from "axios";

const API_GET = "http://localhost/project1/backend/api/get-questions.php";
const API_SAVE = "http://localhost/project1/backend/api/save-assessment.php";

export default function Assessment() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_GET)
      .then((res) => {
        if (res.data.success) {
          setQuestions(res.data.questions);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // When user selects an answer
  const handleAnswer = (qid, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: value,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      const res = await axios.post(API_SAVE, {
        answers: answers
      });

      if (res.data.success) {
        const id = res.data.assessment_id;
        window.location.href = `/assessment-detail/${id}`;
      } else {
        alert("Failed to save assessment.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting assessment.");
    }
  };

  return (
    <div style={{ padding: "30px", paddingBottom: "120px" }}>
      <h1 style={{ marginBottom: "20px" }}>Security Assessment</h1>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        questions.map((q) => (
          <div
            key={q.id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#6c47ff", marginBottom: "5px" }}>
              {q.category_title}
            </h3>
            <p style={{ fontWeight: "600", marginBottom: "12px" }}>
              {q.question_text}
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              {["Yes", "Mostly", "Sometimes", "No"].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(q.id, option)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "10px",
                    border:
                      answers[q.id] === option
                        ? "2px solid #6c47ff"
                        : "1px solid #ccc",
                    background:
                      answers[q.id] === option ? "#6c47ff" : "#f0f0f0",
                    color: answers[q.id] === option ? "#fff" : "#333",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))
      )}

      {/* ---- STICKY FOOTER ---- */}
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          background: "white",
          padding: "16px",
          boxShadow: "0 -4px 10px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          zIndex: 10,
        }}
      >
        <button
          onClick={handleSubmit}
          style={{
            padding: "14px 26px",
            background: "#6c47ff",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "17px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(108, 71, 255, 0.4)",
          }}
        >
          Submit Assessment
        </button>

        <button
          onClick={() => (window.location.href = "/assessment-history")}
          style={{
            padding: "14px 26px",
            background: "white",
            color: "#6c47ff",
            border: "2px solid #6c47ff",
            borderRadius: "10px",
            fontSize: "17px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          View Assessment History
        </button>
      </div>
    </div>
  );
}

