// src/services/assessmentService.js
const assessmentService = {
  saveAssessmentResults: async (results) => {
    try {
      const existingAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
      const newAssessment = {
        id: Date.now().toString(),
        ...results,
        completedAt: new Date().toISOString()
      };
      existingAssessments.push(newAssessment);
      localStorage.setItem('assessments', JSON.stringify(existingAssessments));
      return newAssessment;
    } catch (error) {
      console.error('Error saving assessment:', error);
      throw error;
    }
  },

  getAssessmentHistory: async () => {
    try {
      const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
      return assessments.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
    } catch (error) {
      console.error('Error fetching assessments:', error);
      throw error;
    }
  },

  getAssessmentById: async (id) => {
    try {
      const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
      return assessments.find(assessment => assessment.id === id);
    } catch (error) {
      console.error('Error fetching assessment:', error);
      throw error;
    }
  },

  deleteAssessment: async (id) => {
    try {
      const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
      const filteredAssessments = assessments.filter(assessment => assessment.id !== id);
      localStorage.setItem('assessments', JSON.stringify(filteredAssessments));
      return true;
    } catch (error) {
      console.error('Error deleting assessment:', error);
      throw error;
    }
  }
};

export default assessmentService;