from langchain_google_genai import GoogleGenerativeAI
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from typing import Dict, List
import os
import sys
import logging

project_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.append(project_dir)
from config import Config

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class MentalHealthAnalyzer:
    def __init__(self, google_api_key: str, database_path: str = "mental_health_db"):
        """
        Initialize the Mental Health Analyzer with necessary components.
        
        Args:
            google_api_key (str): API key for Google Gemini
            database_path (str): Path to store/load the vector database
        """
        self.llm = GoogleGenerativeAI(
            model=Config.llm_model,
            google_api_key=Config.google_api_key,
            temperature=0.3
        )
        
        # Initialize embeddings model
        self.embeddings = HuggingFaceEmbeddings()
        
        # Initialize or load vector database
        self.vectordb = self._initialize_vectordb(database_path)
        
        # Define the prompt template
        self.prompt_template = PromptTemplate(
            input_variables=["context", "scores"],
            template="""
            Based on the following mental health assessment scores and clinical guidelines:
            
            Assessment Scores:
            {scores}
            
            Relevant Clinical Context:
            {context}
            
            Please provide:
            1. A detailed analysis of the mental health 
            2. Evidence-based recommendations for treatment
            3. Any potential warning signs or areas requiring immediate attention
            4. Suggested lifestyle modifications and coping strategies
            
            Format your response in a clear, professional manner in about 100 words. just return plain text, no astricks or newline charac.
            """
        )
        
        self.chain = LLMChain(
            llm=self.llm,
            prompt=self.prompt_template
        )

    def anxiety_level(self, score):
        score = self._convert_to_float(score)
        if score <= 7:
            return 'Normal'
        elif score <= 9:
            return 'Mild'
        elif score <= 14:
            return 'Moderate'
        elif score < 20:
            return 'Severe'
        else:
            return 'Extremely Severe'

    def stress_level(self, score):
        score = self._convert_to_float(score)
        if score <= 14:
            return 'Normal'
        elif score <= 18:
            return 'Mild'
        elif score <= 25:
            return 'Moderate'
        elif score < 33:
            return 'Severe'
        else:
            return 'Extremely Severe'

    def depression_level(self, score):
        score = self._convert_to_float(score)
        if score <= 9:
            return 'Normal'
        elif score <= 13:
            return 'Mild'
        elif score <= 17:
            return 'Moderate'
        elif score < 20:
            return 'Severe'
        else:
            return 'Extremely Severe'

    def _initialize_vectordb(self, path: str) -> Chroma:
        """
        Initialize or load the vector database with mental health guidelines.
        In a real implementation, you would populate this with actual clinical guidelines.
        """
        # Sample guidelines - in production, replace with real clinical data
        guidelines = [
                    
            "DASS-42 Depression scores above 20 indicate extremely severe depression requiring clinical intervention",
            "DASS-42 Anxiety scores above 20 suggest extremely severe anxiety warranting immediate attention",
            "DASS-42 Stress scores exceeding 33 indicate extremely severe stress levels requiring management strategies",
            "Combined elevated stress (>25) and anxiety (>14) scores on DASS-42 suggest need for CBT intervention",
            "Moderate depression scores (14-17) on DASS-42 indicate need for therapeutic support",
            "Severe anxiety scores (15-19) on DASS-42 warrant medication evaluation",
            "Persistent low mood with DASS-42 depression scores >17 suggests major depressive disorder",
            "DASS-42 stress scores above 25 with sleep issues indicate need for stress management therapy",
            "Severe anxiety scores (15-19) with physical symptoms suggest panic disorder assessment",
            "Combined scores in severe ranges (Depression >17, Anxiety >14, Stress >25) indicate need for comprehensive treatment",
            "Moderate anxiety scores (10-14) respond well to mindfulness-based interventions",
            "DASS-42 depression scores >20 with anhedonia warrant suicide risk assessment",
            "Stress scores above 25 with occupational issues suggest burnout risk",
            "Severe depression (17-19) with severe anxiety (15-19) indicate mixed anxiety-depressive disorder",
            "DASS-42 anxiety scores >14 with social withdrawal suggest social anxiety evaluation",
            "Extremely severe depression scores (>20) with sleep changes warrant bipolar disorder screening",
            "Extremely severe stress scores (>33) indicate need for immediate stress reduction intervention",
            "Moderate stress scores (19-25) benefit from relaxation and lifestyle modifications",
            "DASS-42 depression scores >17 with fatigue suggest need for medical evaluation",
            "Anxiety scores above 14 with concentration issues indicate generalized anxiety",
            "Combined moderate scores (Depression 14-17, Anxiety 10-14, Stress 19-25) suggest need for group therapy",
            "Fluctuating DASS-42 scores between moderate and severe ranges indicate mood instability",
            "Extremely severe scores across all scales (Depression >20, Anxiety >20, Stress >33) warrant intensive outpatient program",
            "DASS-42 depression scores >20 with cognitive symptoms suggest need for neuropsychological testing",
            "Stress scores above 25 with physical symptoms indicate psychosomatic manifestation",
            "Persistent scores in severe range across 3+ assessments suggest treatment-resistant conditions",
            "Severe anxiety scores (15-19) with avoidance behaviors suggest exposure therapy need",
            "DASS-42 depression scores >17 with irritability warrant mood regulation intervention",
            "Mixed anxiety-stress scores in severe ranges require combined therapeutic approach",
            "Extremely severe depression scores (>20) require immediate safety planning"


            ]
        
        # Create or load vector database
        return Chroma.from_texts(
            texts=guidelines,
            embedding=self.embeddings,
            persist_directory=path
        )

    def analyze_scores(self, scores: Dict[str, float]) -> str:
        """
        Analyze mental health scores and provide recommendations.
        
        Args:
            scores (Dict[str, float]): Dictionary of mental health scores
                Example: {
                    "depression": 12,
                    "anxiety": 8,
                    "stress": 15,
                }
        
        Returns:
            str: Detailed analysis and recommendations
        """
        # Convert scores to string format
        scores_str = "\n".join([f"{k}: {v}" for k, v in scores.items()])
        
        # Retrieve relevant context from vector database
        query = " ".join([f"{k} score: {v}" for k, v in scores.items()])
        similar_docs = self.vectordb.similarity_search(query, k=2)
        context = "\n".join([doc.page_content for doc in similar_docs])
        
        # Generate analysis and recommendations
        response = self.chain.run(
            context=context,
            scores=scores_str,
        )
        print("response", response)

        # response = self.beautify_response(response)
        print("response", response)
        
        return response

    # def beautify_response(self, text: str) -> str:
    #     """
    #     Beautify the response by removing extra spaces and newlines.
        
    #     Args:
    #         response (str): Raw response from the model
        
    #     Returns:
    #         str: Beautified response
    #     """
        
    #     # Remove asterisks
    #     text = text.replace('**', '')
        
    #     # Replace \n\n with actual newlines
    #     text = text.replace('\\n\\n', '\n')
        
    #     # Remove extra whitespace
    #     lines = [line.strip() for line in text.split('\n') if line.strip()]
        
    #     # Join with single newlines
    #     return '\n'.join(lines)

    def update_guidelines(self, new_guidelines: List[str]):
        """
        Update the vector database with new clinical guidelines.
        
        Args:
            new_guidelines (List[str]): List of new guidelines to add
        """
        self.vectordb.add_texts(new_guidelines)

    def check_vitals(self, hr: float, resp: float, spo2: float, temp: float) -> str:
        """
        Check the patient's vital signs and return status.
        
        Args:
            hr (float): Heart rate in beats per minute
            resp (float): Respiration rate in breaths per minute
            spo2 (float): Blood oxygen saturation in percentage
            temp (float): Body temperature in degrees Celsius
        
        Returns:
            str: Status of the patient's vital signs
        """
        print("checking vitals")
        hr = self._convert_to_float(hr)
        if hr < 60 or hr > 100:
            return "Abnormal"
        resp = self._convert_to_float(resp)
        if resp < 12 or resp > 20:
            return "Abnormal"
        spo2 = self._convert_to_float(spo2)
        if spo2 < 95:
            return "Abnormal"
        temp = self._convert_to_float(temp)
        if temp < 36.1 or temp > 37.2:
            return "Abnormal"
        return "True"

    def _convert_to_float(self, value):
        try:
            return float(value)
        except ValueError:
            return None